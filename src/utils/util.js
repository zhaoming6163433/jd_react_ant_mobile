// import Vue from 'vue';
import $ from 'n-zepto'
import appConfigs from '../configs.js'
import export_json_to_excel from 'assets/js/Export2Excel.js'
import moment from 'moment';
import { message } from 'antd';
// 最大显示数, 超过限制时，最早的消息会被自动关闭
message.config({
    maxCount: 1
});

// let getevent = () => {
//     var Event = new Vue();
//     return Event;
// }
/**
 * 检查银行卡号是否符合规则
 * @param bankno 银行卡号
 * @returns
 */

let cardobj = function() {};
cardobj.prototype.checkBankNo = (bankno) => {
    var bankno = bankno.replace(/\s/g, '');
    if (bankno == "") {
        utils.toastinfo("请填写银行卡号");
        return false;
    }
    if (bankno.length < 16 || bankno.length > 19) {
        utils.toastinfo("银行卡号长度必须在16到19之间");
        return false;
    }
    var num = /^\d*$/; // 全数字
    if (!num.exec(bankno)) {
        utils.toastinfo("银行卡号必须全为数字");
        return false;
    }
    // 开头两位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        utils.toastinfo("银行卡号开头两位不符合规范");
        return false;
    }
    // luhn校验
    if (!_luhnCheck(bankno)) {
        return false;
    }
    return true;
}

/**
 * 银行卡号luhn校验算法
 * luhn校验规则：16位银行卡号（19位通用）:
 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 * 3.将加法和加上校验位能被 10 整除。
 * @param bankno 银行卡号
 * @returns
 */
let _luhnCheck = function(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); // 取出最后一位（与luhn进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1); // 前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); // 奇数位*2的积 <9
    var arrJiShu2 = new Array(); // 奇数位*2的积 >9
    var arrOuShu = new Array(); // 偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { // 奇数位
            if (parseInt(newArr[j]) * 2 < 9) {
                arrJiShu.push(parseInt(newArr[j]) * 2);
            } else {
                arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
        } else {
            arrOuShu.push(newArr[j]); // 偶数位
        }
    }

    var jishu_child1 = new Array(); // 奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); // 奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }
    var sumJiShu = 0; // 奇数位*2 < 9 的数组之和
    var sumOuShu = 0; // 偶数位数组之和
    var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    // 计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) +
        parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    // 计算luhn值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhn = 10 - k;
    if (lastNum == luhn) {
        console.log("验证通过");
        return true;
    } else {
        // Vue.$toast({
        //     message: "银行卡号不正确",
        //     position: 'middle',
        //     duration: appConfigs.toastime
        // });
        return false;
    }
}
// const vueEvent = getevent();

const utils = {
    vuethis: {}, //vue的this
    // vueEvent: vueEvent,
    //打电话
    realcall(e) {
        window.location.href = "tel:" + e.name;
    },
    //处理空
    handlenull(item) {
        $.each(item, function (key, val) {
            if (val == null) {
                item[key] = '';
            }
        });
    },
    // getGeolocation(callback) {
    //     let lnglat = this.handleCookieGet('lnglat');
    //     if (lnglat) {
    //         callback(lnglat, true);
    //     } else {
    //         var _this = this;
    //         var currentposition = {};
    //         //获取当前位置
    //         var geolocation = new BMap.Geolocation();
    //         geolocation.getCurrentPosition(function (r) {
    //             if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //                 currentposition.lng = r.point.lng;
    //                 currentposition.lat = r.point.lat;
    //                 callback(currentposition, r.accuracy);
    //             } else {
    //                 callback(false);
    //             }
    //         }, {
    //             enableHighAccuracy: true
    //         });
    //     }
    // },
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return r[2];
        return null; //返回参数值
    },
    //获取七天日期
    getSevenDate(date, lasttime) {
        var lastarr = lasttime.split(':');
        var lasth = parseInt(lastarr[0]);
        var lastm = parseInt(lastarr[1]);
        var thirtyagoh = '';
        var thirtyagom = '';
        var _arr = [];
        //提前半小时就从明天开始
        if (lastm >= 30) {
            thirtyagoh = lasth;
            thirtyagom = lastm - 30;
        } else {
            thirtyagoh = lasth - 1;
            thirtyagom = lastm + 30;
        }
        if (parseInt(moment(date).format('hh')) > thirtyagoh) {
            moment(date).setDate(moment(date).getDate() + 1);
        }
        if (parseInt(moment(date).format('hh')) == thirtyagoh) {
            if (parseInt(moment(date).format('mm')) > thirtyagom) {
                moment(date).setDate(moment(date).getDate() + 1);
            }
        }

        for (var i = 0; i < 7; i++) {
            var date2 = new Date(date);
            date2.setDate(date.getDate() + i);
            var time2 = (date2.getMonth() + 1) + "月" + date2.getDate() + "日";
            _arr.push(time2);
        }
        return _arr;
    },
    //缓存到cookie
    handleCookieGet(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                var result = unescape(document.cookie.substring(c_start, c_end));
                if (result) {
                    return JSON.parse(result);
                } else {
                    return {};
                }
            }
        }
        return "";
    },
    handleCookieSet(c_name, value, expiredays) {
        var value = JSON.stringify(value);
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
    },
    //缓存到本地
    setlocal(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj));
    },
    //获取本地
    getlocal(name) {
        let data = localStorage.getItem(name);
        if (data != null && data != '') {
            try {
                let obj = eval('(' + data + ')');
                return obj;
            } catch (e) {
                return '';
            }
        } else {
            return '';
        }
    },
    //禁止默认滚动条滚动，用于弹出窗
    forbidscroll() {
        document.body.style.overflow = 'hidden';
        document.getElementById("physical").style.overflow = "hidden";
    },
    allscroll() {
        document.body.style.overflow = '';
        document.getElementById("physical").style.overflow = "";
    },
    //提示中间toast
    toastinfo(msg) {
        // Vue.$toast({
        //     message: msg,
        //     position: 'middle',
        //     duration: appConfigs.toastime
        // });
    },
    loadingopen(){
        // Vue.$indicator.open();
    },
    loadingclose(){
        // Vue.$indicator.close();
    },
    //校验银行卡
    bankcardreg() {
        let _cardobj = new cardobj();
        return _cardobj;
    },
    //zepto扩展
    scrollTo() {
        $.fn.scrollTo = function (options) {
            var defaults = {
                toT: 0, //滚动目标位置
                durTime: 500, //过渡动画时间
                delay: 30, //定时器时间
                callback: null //回调函数
            };
            var opts = $.extend(defaults, options),
                timer = null,
                _this = this,
                curTop = _this.scrollTop(), //滚动条当前的位置
                subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
                index = 0,
                dur = Math.round(opts.durTime / opts.delay),
                smoothScroll = function (t) {
                    index++;
                    var per = Math.round(subTop / dur);
                    if (index >= dur) {
                        _this.scrollTop(t);
                        window.clearInterval(timer);
                        if (opts.callback && typeof opts.callback == 'function') {
                            opts.callback();
                        }
                        return;
                    } else {
                        _this.scrollTop(curTop + index * per);
                    }
                };
            timer = window.setInterval(function () {
                smoothScroll(opts.toT);
            }, opts.delay);
            return _this;
        };
    },
    //弹出提示框
    alertip(val) {
        // vueEvent.$alert(val, '提示', {
        //     confirmButtonText: '确定',
        //     callback: action => {

        //     }
        // });
    },
    //带取消的两个按钮
    confirmtip(title, info, btntext1, btntext2, suc, cancel) {
        // vueEvent.$confirm(info, title || '提示', {
        //     confirmButtonText: btntext1 || '确定',
        //     cancelButtonText: btntext2 || '取消',
        //     type: 'warning'
        // }).then(() => {
        //     suc && suc();
        // }).catch(() => {
        //     cancel && cancel();
        // });
    },
    //html片段
    alerthtmltip(title, htmlstr, btntext1, btntext2, suc, cancel, style,params) {
        if (style == "red") {
            setTimeout(() => {
                $(".el-message-box__wrapper").addClass("wrapper_redstyle");
            }, 10);
        } else {
            $(".el-message-box__wrapper").removeClass("wrapper_redstyle");
        }
        // vueEvent.$confirm(htmlstr, title || '提示', {
        //     dangerouslyUseHTMLString: true,
        //     confirmButtonText: btntext1 || '确定',
        //     cancelButtonText: btntext2 || '取消'
        // }).then(() => {
        //     suc && suc(params);
        // }).catch(() => {
        //     cancel && cancel(params);
        // });
    },
    //登录错误提示
    errortip(info) {
        message.error(info);
    },
    //成功提示
    successtip(info) {
        message.success(info);
    },
    //警告提示
    warningtip(info) {
        message.warning(info);
    },
    //身份证截取出生日期
    getBirthdayFromIdCard(idCard) {
        idCard = idCard.toString();
        var birthday = "";
        if (idCard != null && idCard != "") {
            if (idCard.length == 15) {
                birthday = "19" + idCard.substr(6, 6);
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }

        return birthday;
    },
    //base64转换成二进制
    convertImgDataToBlob(base64Data) {
        var format = "image/jpeg";
        var base64 = base64Data;
        var code = window.atob(base64.split(",")[1]);
        var aBuffer = new window.ArrayBuffer(code.length);
        var uBuffer = new window.Uint8Array(aBuffer);
        for (var i = 0; i < code.length; i++) {
            uBuffer[i] = code.charCodeAt(i) & 0xff;
        }
        // console.info([aBuffer]);
        // console.info(uBuffer);
        // console.info(uBuffer.buffer);
        // console.info(uBuffer.buffer == aBuffer); //true

        var blob = null;
        try {
            blob = new Blob([uBuffer], {
                type: format
            });
        } catch (e) {
            window.BlobBuilder =
                window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name == "TypeError" && window.BlobBuilder) {
                var bb = new window.BlobBuilder();
                bb.append(uBuffer.buffer);
                blob = bb.getBlob("image/jpeg");
            } else if (e.name == "InvalidStateError") {
                blob = new Blob([aBuffer], {
                    type: format
                });
            } else {}
        }
        return blob;
    },
    //下载excel表格 tHeader头部中文名 filterVal头部英文名 datalist json数据
    exportToExcel(tablename="列表excel", tHeader=[], filterVal=[], datalist=[]) {
        //excel数据导出
        import('assets/js/Export2Excel.js').then(mod => {
            const list = datalist;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, tablename);
        })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //日期转行格式
    changeFormate(val){
        if(val){
            return new Date(val).Format("yyyy-MM-dd");
        }else{
            return "";
        }
    },
    // 验证身份证是否正确
    validateIdCard (id, backInfo) {
        let info = {
            y: '1900',
            m: '01',
            d: '01',
            sex: 'male',
            valid: false,
            length: 0
        };
        if (typeof id !== 'string') return this.back(info, backInfo);
        // 18
        if (/^\d{17}[0-9x]$/i.test(id)) {
            if (!this.initDate(18, info, id)) return this.back(info, backInfo);
            id = id.toLowerCase().split('');
            let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let y = '10x98765432'.split('');
            let sum = 0;
            for (let i = 0; i < 17; i++) sum += wi[i] * id[i];
            if (y[sum % 11] === id.pop().toLowerCase()) info.valid = true;
            return this.back(info, backInfo);
        } else if (/^\d{15}$/.test(id)) { // 15
            if (this.initDate(15, info, id)) info.valid = true;
            return this.back(info, backInfo);
        } else {
            return this.back(info, backInfo);
        }
    },
    back (info, backInfo) {
        return backInfo ? info : info.valid;
    },
    initDate (length, info, id) {
        info.length = length;
        let a;
        a = (length === 15) ? 0 : 2;// 15:18
        let temp;
        info.y = (a ? '' : '19') + id.substring(6, 8 + a);
        info.m = id.substring(8 + a, 10 + a);
        info.d = id.substring(10 + a, 12 + a);
        info.sex = id.substring(14, 15 + a) % 2 === 0 ? 'female' : 'male';
        temp = new Date(info.y, info.m - 1, info.d);
        return (temp.getFullYear() === info.y * 1) &&
            (temp.getMonth() + 1 === info.m * 1) &&
            (temp.getDate() === info.d * 1);
    },
    // 验证手机号码
    isPoneAvailable (str) {
        let myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    // 获取一年前月份时间
    getMonths() {
        var s1 ="";
        var date = new Date();
        var year = date.getFullYear();
        date.setMonth(date.getMonth() + 1, date.getDate()); //获取到当前月份,设置月份
        for (var i = 0; i <= 12; i++) {
            date.setMonth(date.getMonth() - 1); //获取一年前月份
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            if (i>=12) {
                s1 = date.getFullYear() + "-" + m + "-" + (date.getDate())
            }
        }
        return s1;
    },
}
export default utils
