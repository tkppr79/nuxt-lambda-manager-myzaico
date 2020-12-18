exports.sortItemsById = function(items){
  items.sort((a,b) => {
    if (a.id > b.id)
      return 1;
    if (a.id < b.id)
      return -1;
    return 0;
  });

  return items;
}

exports.lambdaErrorResponse = function(error){
  const response = {
    statusCode: error.statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  switch(error.code) {
    case 'NotAuthorizedException':
      response.body = JSON.stringify({ errorMessage: "ユーザー名かパスワードが間違っています。" });
      break;
    case 'UserNotConfirmedException':
      response.body = JSON.stringify({ errorMessage: "そのユーザーは確認が取れていません。" });
      break;
    case 'UsernameExistsException':
      response.body = JSON.stringify({ errorMessage: "そのユーザー名は既に使われています。" });
      break;
    default:
      response.body = JSON.stringify({ errorMessage: "サーバー側でエラーが発生しました。" });
      break;
  }

  return response;
}
