const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let payload = null;

  if(event.pathParameters.id){
    payload = { TableName: process.env.DYNAMODB_ITEM_TABLE };
    payload.Key = { id: parseInt(event.pathParameters.id, 10) };
  }

  if(payload){
    let data;

    try {
      data = await dynamo.get(payload).promise();
    } catch (err) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(err)
      }
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  }else{
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({})
    }
  }
};
