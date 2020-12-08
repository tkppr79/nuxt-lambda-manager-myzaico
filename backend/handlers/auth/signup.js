const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.name || !data.password || !data.email)
    return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" } };

  const fetchedData = await dynamo.scan({ TableName: process.env.DYNAMODB_USER_TABLE }).promise().catch(error => {
    throw error;
  });

  const users = fetchedData.Items;
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

  await dynamo.put(payload).promise().catch(error => {
    throw error;
  });

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: data.name,
    Password: data.password,
    UserAttributes: [
      { Name: 'email', Value: data.email },
      { Name: 'custom:uid', Value: String(lastID + 1) }
    ],
  };

  const result = await cognito.signUp(params).promise().catch(error => {
    dynamo.delete({
      TableName: process.env.DYNAMODB_USER_TABLE,
      Key: { id: (lastID + 1) }
    });

    throw error;
  });

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(result),
  };
};

function sortItemsById(items) {
  items.sort((a,b) => {
    if (a.id > b.id)
      return 1;
    if (a.id < b.id)
      return -1;
    return 0;
  });

  return items;
}
