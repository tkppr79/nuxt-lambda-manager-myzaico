const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if(!data.name || !data.password)
    return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" } };

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      'USERNAME': data.name,
      'PASSWORD': data.password,
    },
  };

  const initiateAuthResult = await cognito.initiateAuth(params).promise().catch(error => {
    throw error;
  });

  const accessToken = initiateAuthResult.AuthenticationResult.AccessToken;

  const getUserResult = await cognito.getUser({ AccessToken: accessToken }).promise().catch(error => {
    throw error;
  });

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
