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
 * 验证手机号 11位数字，以1开头
 * @phone {number}
 * 返回true或false
 */
export function checkPhone(phone) {
    var reg = /^1[0-9]{10}$/;
    if (phone.length == 11 && reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取cookie的一项值
 * @cookies {string} cookie字符串
 * @name {string} cookie中一项的名称
 * 返回名称对应的值,没有匹配到name则返回空字符串
 */
export function getCookie(cookies, name) {
    let arr = cookies.split(';');
    let currentItem = '';
    arr.forEach(function (vlaue, index, arr) {
        if (vlaue.indexOf(name) !== -1) {
            currentItem = vlaue;
        }
    });
    if (currentItem !== '') {
        return currentItem.split('=')[1];
    } else {
        console.log('没有设置cookie');
        return '';
    }
}

// localStorage 存
export function setStorage(key, value) {
    if( window.localStorage ){
        localStorage[key] = value
        return true
    }else{
        console.log('浏览器不支持localStorage')
        return ''
    }
}

// localStorage 取
export function getStorage(key) {
    if( window.localStorage ){
        return localStorage[key]
    }else{
        console.log('浏览器不支持localStorage')
        return ''
    }
}

// localStorage 删数组中的某个值
export function delStorage(key, value) {
    if( window.localStorage ){
        let arr = JSON.parse(localStorage[key])
        for( let v in arr ){
            if( arr[v] == value ){
                arr.splice(v,1)
            }
        }
        arr.length<=0 ? arr='' : arr=arr
        localStorage[key] = JSON.stringify(arr)
        return true
    }else{
        console.log('浏览器不支持localStorage')
        return ''
    }
}

/**
 * 滚动到指定id地点 不传id默认滚动到顶部 跳50次 6ms一跳
 * @offset {number} 差值  (正数表示滚动到距离元素上方多少  负数表示超出元素多少)
 */
export function toTop(id, offset) {
    let num = 50
    let eachtime = 6
    id = document.getElementById(id) || (document.body || document.documentElement)
    // 要滚动到的元素
    let t = id.offsetTop - (offset || 0)
    // 滚动条
    let b = document.body.scrollTop || document.documentElement.scrollTop
    // 步进值
    let step = (t-b) / num
    if (b < t) {
        scrollDown()
    } else {
        let newt = b - t
        step = newt / num
        scrollUp()
    }
    function scrollDown() {
        if (b < t) {
            b += step
            document.body.scrollTop = b
            document.documentElement.scrollTop = b
            setTimeout(scrollDown, eachtime)
        } else {
            document.body.scrollTop = t
            document.documentElement.scrollTop = t
        }
    }
    function scrollUp() {
        if (b > t) {
            b -= step
            document.body.scrollTop = b
            document.documentElement.scrollTop = b
            setTimeout(scrollUp, eachtime)
        } else {
            document.body.scrollTop = t
            document.documentElement.scrollTop = t
        }
    }
}

/*
    返回随机字符串（图片去缓存）
*/
export function createRandom() {
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res1 = "";
    let res2 = "";
    for(let i = 0; i < 10 ; i ++) {
        let id1 = Math.ceil(Math.random()*35);
        let id2 = Math.ceil(Math.random()*35);
        res1 += chars[id1];
        res2 += chars[id2];
    }
    return res1 + res2;
}

// import emojiData from '../../../static/emoji/js/emoji-data.js'
/**
 * 聊天信息转换  文件需要转码
 * @param {string} value 聊天数据
 * @param {boolean} type 类型
 * return 转码后的聊天数据
 */

export function messageConvert(value, type) {
    // 文件type必须传encode
    // 格式：{img,name=[20170605192946.png],src=(http://honsenflagstorage.oss-cn-hangzhou.aliyuncs.com/postfile/100011/ee0a1997688d49df779da4572d81d7540628c419.png)}
    let reg = /^\{(img|doc|xls|ppt|pdf|rar|mp3|avi|txt|noa),name=\[.+\],src=\(.+\)(,width=\<.+\>)?(,height=\&.+\&)?\}$/g;
    if( type == "encode" ){
        let Ext = value.ext
        let name = value.name
        let hash = value.hash
        let width = value.width
        let height = value.height
        let touid = value.touid
        let content
        // 各种格式
        if( Ext == 'jpg' || Ext == 'jpeg' || Ext == 'png' || Ext == 'gif' || Ext == 'webp' ){
            content = '{img,name=[' + name + '],src=(' + hash + '),width=<' + value.width + '>,height=&' + value.height + '&}'
        }else if( Ext == 'doc' || Ext == 'docx' ){
            content = '{doc,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'xls' || Ext == 'xlsx' ){
            content = '{xls,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'ppt' || Ext == 'pptx' ){
            content = '{ppt,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'pdf' ){
            content = '{pdf,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'rar' || Ext == 'zip' || Ext == '7z' || Ext == 'bz' ){
            content = '{rar,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'mp3' || Ext == 'cda' || Ext == 'wav' || Ext == 'mid' || Ext == 'ogg' || Ext == 'wma' ){
            content = '{mp3,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'avi' || Ext == 'mp4' || Ext == 'm4v' || Ext == 'flv' || Ext == 'mov' || Ext == '3gp' || Ext == 'flv' || Ext == 'wmv' || Ext == 'mpeg' || Ext == 'mkv' || Ext == 'f4v' ){
            content = '{avi,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'txt' ){
            content = '{txt,name=[' + name + '],src=(' + hash + ')}'
        }else if( Ext == 'html' || Ext == 'htm' ){
            content = '{htm,name=[' + name + '],src=(' + hash + ')}'
        }else{
            content = '{noa,name=[' + name + '],src=(' + hash + ')}'
        }
        value = {
            content: content,
            filename: name,
            filesrc: hash,
            filetype: content.substr(1,3),
            imgwidth: width,
            imgheight: height,
            touid: touid
        }
        return value
    }else if( type == "lastmsg" ){  //最后一条信息只传内容
        if( reg.test(value) ){
            return '[文件]'
        }else{
            // 替换表情
            /*let emojiList = {};
            Object.values(emojiData).forEach(item => {
                emojiList = { ...emojiList, ...item }
            })
            Object.keys(emojiList).forEach(item => {
                value = value.replace(new RegExp(item, 'g'), e => {
                    return '[表情]'
                })
            })*/
            return value
        }
    }else{
        // 用户获取信息后的解码
        // 如果是文件
        let v = value.content
        if( reg.test(v) ){
            // 获取中括号的文件名
            let name = (/name=\[(.+)\]/.exec(v))[1]
            // 获取小括号中的链接
            let src = (/src=\((.+)\)/.exec(v))[1]
            let info = v.substr(1,3)

            let rv = {
                filetype: info,
                filename: name,
                filesrc: src,
            }

            if( info == 'img' ){
                // 获取尖括号的图片宽
                let width = (/\<(.+)\>/.exec(v)) ? (/\<(.+)\>/.exec(v))[1] : 'auto'
                // 获取&中的图片高
                let height = (/\&(.+)\&/.exec(v)) ? (/\&(.+)\&/.exec(v))[1] : 'auto'
                rv.imgwidth = parseInt(width)
                rv.imgheight = parseInt(height)
            }
            Object.assign(value, rv)
            return value
        }else{
            // 替换网址
            value.content = v.replace(/https?:\/\/[\w-]+(\.[\w-]+)+(:[0-9]{2,4})?(\/[\w\?\+\.#=@&%-]+)*(\/)?/ig, function(item){
                let itema = item.replace(/(https?:(\/\/)?)/ig, '')
                return "<a style='color: #4685bf' href='//" + itema + "' target='_blank'>" + item + "</a>";
            });
            // 替换表情
            /*let emojiList = {};
            Object.values(emojiData).forEach(item => {
                emojiList = { ...emojiList, ...item }
            })
            Object.keys(emojiList).forEach(item => {
                value.content = value.content.replace(new RegExp(item, 'g'), e => {
                    let v = emojiList[e]
                    let path = '/static/emoji/img/'
                    return `<img src=${path}${v} style="width: 22px; height: 22px; position: relative; top: 2px; margin: 0 1px;">`
                })
            })*/
            return value
        }
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
