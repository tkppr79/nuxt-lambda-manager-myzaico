export default (nextPath: string, user: { name: string }) => {
  const routes = [
    { path: '/items/edit', roles: ['user'], redirectPath: '/login' },
    { path: '/items/create', roles: ['user'], redirectPath: '/login' },
    { path: '/items', roles: ['user'], redirectPath: '/login' },
    { path: '/setting', roles: ['user'], redirectPath: '/login' },
    { path: '/login', roles: ['visitor'], redirectPath: '/' },
    { path: '/signup', roles: ['visitor',], redirectPath: '/' },
    { path: '/', roles: ['user'], redirectPath: '/login' },
  ];

  let auth = true;
  let redirectPath = '';

  for (let i = 0; i < routes.length; i++) {
    if(nextPath.indexOf(routes[i].path) === 0){
      const role = user.name ? 'user' : 'visitor';
      auth = routes[i].roles.includes(role);
      redirectPath = routes[i].redirectPath;
      break;
    }
  }

  return { auth, redirectPath };
};
