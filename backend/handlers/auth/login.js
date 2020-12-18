const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const { lambdaErrorResponse } = require('../../utils');

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.name || !data.password) return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ errorMessage: "ユーザー名とパスワードは必須項目です。" }) };

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      'USERNAME': data.name,
      'PASSWORD': data.password,
    },
  };

  const initiateAuthResult = await cognito.initiateAuth(params).promise().catch(error => {
    return error;
  });

  if(initiateAuthResult.statusCode && initiateAuthResult.statusCode !== 200) return lambdaErrorResponse(initiateAuthResult);

  const accessToken = initiateAuthResult.AuthenticationResult.AccessToken;

  const getUserResult = await cognito.getUser({ AccessToken: accessToken }).promise().catch(error => {
    return error;
  });

  if(getUserResult.statusCode && getUserResult.statusCode !== 200) return lambdaErrorResponse(getUserResult);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      name: getUserResult.Username,
      idToken: initiateAuthResult.AuthenticationResult.IdToken,
      accessToken,
      userAttributes: getUserResult.UserAttributes
    }),
  };
};
