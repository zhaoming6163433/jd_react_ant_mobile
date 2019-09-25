import asyncComponent from './AsyncComponent';
const home = asyncComponent(() => import('@/page/home'));
const myuser = asyncComponent(() => import('@/page/myuser'));
const routes = [
  {
    exact: true,
    path: '/',
    component: home,
    children: [{//嵌套路由
        path: '/myuser',
        component: myuser
    }]
  }
];

export default routes;
