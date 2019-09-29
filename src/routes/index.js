import asyncComponent from './AsyncComponent';
const home = asyncComponent(() => import('@/page/home'));
const myuser = asyncComponent(() => import('@/page/myuser'));
const koubei = asyncComponent(() => import('@/page/koubei'));

const routes = [{
        exact: true,
        path: '/',
        component: home
    },
    {
        exact: true,
        path: '/home',
        component: home,
    },
    {
        exact: true,
        path: '/myuser',
        component: myuser
    },
    {
        exact: true,
        path: '/koubei',
        component: koubei
    }
];

export default routes;