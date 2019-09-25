/**
 * 配置编译环境和线上环境之间的切换
 *
 * urlWebHttp: 域名地址
 * toastime: toast时间
 *
 */
const toastime = 3000;
const timeout = 60000;
let urlWebHttp = '';

let loginurl = '';
let pagename = {
    logoname:"资产方管理"
}
//http://172.25.45.68:8082/assets-manage
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
    case 'development':
        urlWebHttp = 'http://localhost:3001';
        break;
    case 'production':
        urlWebHttp = 'http://172.25.45.68:8082/assets-manage';
        break;
    default://默认开发
        urlWebHttp = 'http://localhost:3001';
}


export default{
    urlWebHttp,
	toastime,
    timeout,
    loginurl,
    pagename
}
