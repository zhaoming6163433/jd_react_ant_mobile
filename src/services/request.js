import appConfigs from '../configs';
import $ from 'n-zepto';
import $axios from 'axios';
export default async (apiurl = '', params = {}, type = 'GET', method = '', outapi = false) => {
    type = type.toUpperCase();
    function handleres(res,resolve,reject) {
        console.log(res)
        if (res.data&&res.data.code === 1000) {
            resolve(res.data.result);
        } else if((res.data&&res.data.code) === 6001||(res.data&&res.data.code) === 6002)
        {
            // window.location.href = appConfigs.urlWebHttp+"/?pageName=login/#/login";
        }else{
            //util.errortip(res.data.msg);
            reject(res)
        }
    }
    if (method === 'ajax') {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiurl,
                data: params,
                type: "POST",
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.code === 0) {
                        resolve(res)
                    } else
                    if (res.code === "2") { //未登录直接跳转
                        reject(res);
                        //window.location.href = res.result+"?ReturnUrl="+appConfigs.urlWebHttp+"/mdsexternal";
                    } else {
                        //util.errortip(res.message);
                        reject(res)
                    }
                },
                error: function (res) {
                    console.log(res)
                    reject(res);
                },
                timeout: appConfigs.timeout
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            if (type === "GET") {
                if(outapi){
                    $axios.get(apiurl+params).then((res)=>{
                        resolve(res.data);
                    }).catch((err)=>{
                        //util.errortip('网络请求失败');
                        reject(err);
                    })
                }else{
                    $axios.get(apiurl+params).then((res)=>{
                        handleres(res,resolve,reject);
                    }).catch((err)=>{
                        console.log(err)
                        //util.errortip('网络请求失败');
                        reject(err);
                    })
                }
            }
            if (type === "POST") {
                $axios.post(apiurl, params)
                    .then(function (res) {
                        handleres(res,resolve,reject);
                    })
                    .catch(function (err) {
                        //util.errortip('网络请求失败');
                        reject(err);
                    });
            }
        });
    }
}
