const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { lambdaErrorResponse } = require('../../utils');

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.accessToken) return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ errorMessage: "トークンがありません。" }) };

  const result = await cognito.globalSignOut({ AccessToken: data.accessToken }).promise().catch(error => {
    return error;
  });

  if(result.statusCode && result.statusCode !== 200) return lambdaErrorResponse(result);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(result),
  };
};
