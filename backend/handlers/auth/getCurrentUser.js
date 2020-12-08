const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.accessToken)
    return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" } };

  const result = await cognito.getUser({ AccessToken: data.accessToken }).promise().catch(error => {
    throw error;
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      name: result.Username,
      userAttributes: result.UserAttributes
    }),
  };
};
