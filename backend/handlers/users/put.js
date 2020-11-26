const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let payload = null;
  const data = JSON.parse(event.body);

  if(data.user){
    payload = { TableName: process.env.DYNAMODB_USER_TABLE };
    payload.Item = data.user;
  }

  if(payload){
    try {
      await dynamo.put(payload).promise();
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
      body: JSON.stringify({}),
    };
  }else{
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({})
    }
  }
};
