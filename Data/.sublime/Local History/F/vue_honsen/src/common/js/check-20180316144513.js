/**
 * 验证邮箱
 * @email {string}
 * 返回true或false
 */
export function checkEmail(email) {
    let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(email)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证身份证
 * @identity {string} identity
 * 返回true或false
 */
export function checkIdentity(identity) {
    var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;
    if (reg1.test(identity) || reg2.test(identity)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证手机号 11位数字，以1开头
 * @phone {number}
 * 返回true或false
 */
export function checkPhone(phone) {
    var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    if (phone && phone.length == 11 && reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证Url
 * @url {string}
 * @flag {bool} 为true时严格匹配http或https开头的 为false或不传时可匹配 www.aaa.com 形式
 * 返回true或false
 */
export function checkUrl(url, flag) {
    let reg;
    if( flag ){
        reg = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(:[0-9]{2,4})?(\/[\w\?\+\.#=@&%-]+)*(\/)?$/;
    }else{
        reg = /^https?:\/\/[\w-]+(\.[\w-]+)+(:[0-9]{2,4})?(\/[\w\?\+\.#=@&%-]+)*(\/)?$/;
    }
    if (reg.test(url)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证QQ
 * @qq {string} 5到11位数字
 * 返回true或false
 */
export function checkQQ(qq) {
    let reg = /^[1-9]([0-9]{4,10})$/;
    if (reg.test(qq)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证律师证号
 * @num 13101200011543894
 * 返回true或false
 */
export function checkLawyerNum(num) {
    let reg = /^(1\d{4}[1|2]\d{3}\d[0|1]\d{6})$/;
    if (num && num.length == 17 && reg.test(num)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证实习律师证号
 * @num 01011704110001
 * 返回true或false
 */
export function checkLawyerNum_sx(num) {
    let reg = /^(\d{4}[1|2]\d{3}[1|2]{2}\d{4})$/;
    if (num && num.length == 14 && reg.test(num)) {
        return true;
    } else {
        return false;
    }
}
