import emojiData from '../../../static/emoji/js/emoji-data.js'
/**
 * 聊天信息转换  文件需要转码
 * @param {string} value 聊天数据
 * @param {boolean} type 类型
 * return 转码后的聊天数据
 */

export function messageConvert(value, type) {
    // 文件type必须传encode
    // 格式：{img,name=[20170605192946.png],src=(//honsenflagstorage.oss-cn-hangzhou.aliyuncs.com/postfile/100011/ee0a1997688d49df779da4572d81d7540628c419.png)}
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
            let emojiList = {};
            Object.values(emojiData).forEach(item => {
                emojiList = { ...emojiList, ...item }
            })
            Object.keys(emojiList).forEach(item => {
                value = value.replace(new RegExp(item, 'g'), e => {
                    return '[表情]'
                })
            })
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
            let emojiList = {};
            Object.values(emojiData).forEach(item => {
                emojiList = { ...emojiList, ...item }
            })
            Object.keys(emojiList).forEach(item => {
                value.content = value.content.replace(new RegExp(item, 'g'), e => {
                    let v = emojiList[e]
                    let path = '/static/emoji/img/'
                    return `<img src=${path}${v} style="width: 22px; height: 22px; position: relative; top: 2px; margin: 0 1px;">`
                })
            })
            return value
        }
    }
}
