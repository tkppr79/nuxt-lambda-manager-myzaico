const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamo = new AWS.DynamoDB.DocumentClient();
const { sortItemsById, lambdaErrorResponse } = require('../../utils');

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.name || !data.password || !data.email) return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ errorMessage: "全ての項目を入力してください。" }) };

  let result;

  result = await dynamo.scan({ TableName: process.env.DYNAMODB_USER_TABLE }).promise().catch(error => {
    return error;
  });

  if(result.statusCode && result.statusCode !== 200) return lambdaErrorResponse(result);

  const users = result.Items;
  let lastID;
  if(users.length){
    const sortedItems = sortItemsById(users);
    lastID = sortedItems[sortedItems.length - 1].id;
  }else{
    lastID = 0;
  }

  const payload = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: { id: (lastID + 1), filterSets: [] }
  };

  result = await dynamo.put(payload).promise().catch(error => {
    return error;
  });

  if(result.statusCode && result.statusCode !== 200) return lambdaErrorResponse(result);

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: data.name,
    Password: data.password,
    UserAttributes: [
      { Name: 'email', Value: data.email },
      { Name: 'custom:uid', Value: String(lastID + 1) }
    ],
  };

  result = await cognito.signUp(params).promise().catch(error => {
    dynamo.delete({
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: { id: (lastID + 1) }
    });

    return error;
  });

  if(result.statusCode && result.statusCode !== 200) return lambdaErrorResponse(result);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(result),
  };
};
