<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.knowdetails
    height: 100%
    .title
        color: #333
        font-size: 0.34rem
        text-align: center
        padding: 0.17rem 0.3rem
        border-bottom: 1px solid #e5e5e5
        word-break: break-all
    .info
        font-size: 0.24rem
        color: #a5a5a5
        margin: 0.26rem 0 0.22rem
        text-align: center
        .author
            margin-left: 0.46rem
            a
                color: #8a8ace
    .summary
        font-size: 0.28rem
        color: #666
        background: #f4fbff
        margin: 0.45rem 0 0
        padding: 0.26rem 0.15rem
        .summarytit
            font-size: 0.3rem
            color: #535353
            margin: 0 0 0.2rem
    .wechatcode
        text-align: center
        color: #000
        padding: 0 0 0.4rem
        img
            width: 3.5rem
    .noauth
        padding: 0.3rem 0 0
        p
            text-align: center
            border-bottom: 1px solid #c9c9c9
            padding: 0 0 0.3rem
    .commentwrap
        padding: 0.35rem 0 0
        border-top: 1px solid #c9c9c9
    .zanshoucang
        float: right
        height: 0.54rem
        line-height: 0.54rem
        span:first-child
            margin: 0 0.4rem 0 0
        img
            margin: 0 0.11rem 0 0
    .post_vieweye_icon
        width: 0.31rem
        margin: 0 0.11rem 0 0.25rem
    .v2headwrap
        margin: 0.36rem 0 0
</style>

<template>
    <div class="knowdetails">
        <div v-if="disable" class="noauth">
            <p>无权阅读该知识！</p>
        </div>
        <div v-else>
            <div class="title">{{post.title}}</div>
            <div class="appmiddlewrap">
                <!-- @click="$router.push({name: 'personal', params: { id: post.id }})" -->
                <div class="v2headwrap clearboth">
                    <z_headimg :id="post.id" :vip="$authCodeT(post.vip).isV"></z_headimg>
                    <div class="v2headinfo">
                        <p class="name">{{post.name}}</p>
                        <p class="time">{{post.time}} <img src="/static/icon/post_vieweye_icon.png" class="post_vieweye_icon">{{post.pv_num}}</p>
                    </div>
                </div>
                <div v-if="post.summary" class="summary"><p class="summarytit">摘要：</p><p class="summarydes">{{post.summary}}</p></div>
                <div id="text-content" class="articlecontent" v-html="post.content"></div>
                <div class="commentwrap">
                    <div class="appsmallwrap">
                        <button @click="commentshow = !commentshow" class="commenthidebtn"><img src="/static/icon/pencil_icon.png">评论</button>
                        <div class="zanshoucang">
                            <span @click="likefn(post)">
                                <img v-if="post.is_upvoted" src="/static/icon/feed_like_.png">
                                <img v-else src="/static/icon/feed_like.png">{{post.upvote_num}}
                            </span>
                            <span @click="collectfn(post)">
                                <img v-if="post.is_collected" src="/static/icon/feed_star_.png">
                                <img v-else src="/static/icon/feed_star.png">{{post.collect_num}}
                            </span>
                        </div>
                        <div style="height: 0.33rem"></div>
                        <comment v-if="commentshow" type="post" :id="id" :num.sync="commentnum"></comment>
                    </div>
                </div>
            </div>
        </div>
        <div class="wechatcode">
            <img src="/static/img/qrcode.jpg">
            <p>扫码关注弘商法律云平台</p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import z_headimg from '@/components/common/z-headimg'
import comment from "@/components/feed/comment"

export default {
    name: 'knowdetails',
    data () {
        return {
            id: '',
            post: {},
            commentnum: 0,
            disable: false,
            commentshow: true,
            likefnloading: false,
            collectfnloading: false
        }
    },
    beforeMount(){
        if( this.$route.params.id ){
            this.id = this.$route.params.id
            this.getdata()
        }
    },
    mounted() {

    },
    methods: {
        getdata() {
            this.$http.get(`/post/info/${this.id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    document.title = response.data.data.title
                    this.getjssdk()
                    this.post = response.data.data
                    this.$nextTick(() => {
                        this.prettyFileCss()
                    })
                    if( !response.data.data.viewable ){
                        this.disable = true
                        return false;
                    }
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            })
        },
        getjssdk() {
            let _this = this
            let host = window.location.origin
            this.$http.get('/wechatjssdk').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let wxconfig = JSON.parse(response.data.js);
                    let title = _this.post.title
                    let link = host + '/feed/knowDetails/' + _this.post.pid
                    let img = host + '/static/icon/honsen_logo_icon.jpg'
                    let des = _this.post.summary || _this.post.content.replace(/<\/?.+?>/g,"").replace(/&nbsp;/gi,'')
                    wx.config({
                        debug: false,    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: wxconfig.appId,      // 必填，公众号的唯一标识
                        timestamp:  wxconfig.timestamp,  // 必填，生成签名的时间戳
                        nonceStr:  wxconfig.nonceStr,   // 必填，生成签名的随机串
                        signature:  wxconfig.signature,  // 必填，签名
                        jsApiList: [    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                    wx.ready(function(){
                        wx.onMenuShareTimeline({
                            title: title,  // 分享标题
                            link: link,  // 分享链接
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: title,  // 分享标题
                            link: link,  // 分享链接
                            desc: des,   // 分享描述
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareQQ({
                            title: title,  // 分享标题
                            link: link,  // 分享链接
                            desc: des,   // 分享描述
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareWeibo({
                            title: title,  // 分享标题
                            link: link,  // 分享链接
                            desc: des,   // 分享描述
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareQZone({
                            title: title,  // 分享标题
                            link: link,  // 分享链接
                            desc: des,   // 分享描述
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            })
        },
        /*ckeditContent*/
        prettyFileCss(){
            let fTypes = ['avi','doc','jpg','mp3','pdf','ppt','rar','xls','docx','pptx','xlsx'];
            let canPreviwe = ['doc','ppt','xls'];
            let contentDom = document.querySelector('#text-content');

            if (!contentDom) {
                return false;
            }

            /* 原来的上传文件 */
            let elements1 = contentDom.querySelectorAll('.ck_file');
            if(elements1.length){
                Array.prototype.forEach.call(elements1,function(el) {
                    el.className = 'ck_file ck_file_read';
                    let fUrl = el.getAttribute('href');
                    let filereadURL = 'http://office.honsenflag.com/op/view.aspx?src=';
                    el.setAttribute('href',filereadURL+fUrl);
                    el.setAttribute('target','_blank');
                    let fType = el.getAttribute('data-type');
                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }
                    let oldText = el.innerText.trim();
                    if(fTypes.indexOf(fType) != -1){
                        el.innerHTML = `<img class="filetypeimg" src="/static/img/${fType}.png">${oldText}<a class="f_downLoad" href="${fUrl}"><i class="iconfont icon-xiazai"></i></a>`;
                    }else {
                        el.innerHTML = `${oldText}<a class="f_downLoad" href="${fUrl}"><i class="iconfont icon-xiazai"></i></a>`;
                    }
                });
            }
            /* 新上传的文件class="ck_file_2" */
            let elements = document.querySelector('#text-content').querySelectorAll('.ck_file_2');
            if(elements.length){
                Array.prototype.forEach.call(elements,function(el) {
                    el.className = 'ck_file_2 ck_file_read';
                    let hash = el.getAttribute('data-hash');
                    let oldText = el.innerText.trim();
                    let fType = oldText.split('.').pop();
                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }
                    if(fTypes.indexOf(fType) != -1){
                        if(canPreviwe.indexOf(fType) != -1){
                            el.setAttribute('href',`${apiurl}/file/download/${hash}`);
                        }else{
                            el.setAttribute('href',`${apiurl}/file/download/${hash}`);
                        }
                        el.innerHTML = `<img class="filetypeimg" src="/static/img/${fType}.png">${oldText}<a class="f_downLoad" href="/file/download/${hash}"><i class="iconfont icon-xiazai"></i></a>`;
                    }else {
                        el.setAttribute('href',`${apiurl}/file/download/${hash}`);
                        el.innerHTML = `${oldText}<a class="f_downLoad" href="/file/download/${hash}"><i class="iconfont icon-xiazai"></i></a>`;
                    }
                });
            }

            /* ueditor上传的 */
            let els_ue = contentDom.querySelectorAll('.ueditor_file');
            if(els_ue.length){
                Array.prototype.forEach.call(els_ue,function(el) {

                    // 如果里面有图片就拿出图片 否则会不显示
                    if( el.querySelector('.ueditor_img') ){
                        el.parentNode.replaceChild(el.querySelector('.ueditor_img'), el);
                        return false;
                    }

                    // 移除firefox下编辑器enter生成的空a标签
                    if (!el.innerText.replace(/\s/, '')) {
                        el.parentNode.removeChild(el);
                        return false;
                    }
                    let hash = el.getAttribute('data_hash') || el.getAttribute('data-hash');
                    let oldText = el.innerText.trim();
                    let fType = oldText.split('.').pop();
                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }
                    if(canPreviwe.includes(fType)) {
                        el.setAttribute('href',`${apiurl}/file/download/${hash}`);
                    } else {
                        el.setAttribute('href',`${apiurl}/file/download/${hash}`);
                    }

                    let icon_fType = fTypes.includes(fType)? fType: 'noa'; /* noa通用文件类型的图标 */
                    el.innerHTML = `<img class="filetypeimg" src="/static/img/${icon_fType}.png">${oldText}<a class="f_downLoad" href="${apiurl}/file/download/${hash}" target="_blank"><div class="icon_xiazai"></div></a>`;
                });
            }

            /* img图片没登录不显示的需要登录提示 */
            /*if( !this.$store.state.loginStatus ){
                let imgs = document.querySelector('#text-content').querySelectorAll('img');
                //console.log(imgs);
                Array.prototype.forEach.call(imgs, function(el){
                    // el.onerror = function(){
                        if( el.className !== 'filetypeimg' ){
                            el.style.display = 'none';
                            let tipDiv = document.createElement('p');
                            tipDiv.className = 'post_img_hidetip';
                            tipDiv.innerHTML = '此处图片被隐藏，登录后可见';
                            el.parentNode.insertBefore(tipDiv, el);
                        }
                    //     el.onerror = null;
                    // }
                });
            }*/
        },
        likefn(list) {
            if( this.likefnloading ){
                return false;
            }
            this.likefnloading = true;
            let type = list.is_upvoted ? 'downvote' : 'upvote';
            this.$http.post(`/post/upvote/${type}/${list.pid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( type == 'downvote' ){
                        list.is_upvoted = 0;
                        list.upvote_num --;
                        Toast( '取消了点赞！' );
                    }else{
                        list.is_upvoted = 1;
                        list.upvote_num ++;
                        Toast( '点赞成功！' );
                    }
                }else{
                    Toast( response.data.errmsg );
                }
                this.likefnloading = false;
            }).catch(err => {
                this.likefnloading = false;
                if( err.response.status == 401 ){
                    Toast('请先关注弘商公众号再进行操作！');
                }
            });
        },
        collectfn(list) {
            if( this.collectfnloading ){
                return false;
            }
            this.collectfnloading = true;
            let type = list.is_collected ? 'uncollect' : 'collect';
            this.$http.post(`/post/collect/${type}/${list.pid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( type == 'uncollect' ){
                        list.is_collected = 0;
                        list.collect_num --;
                        Toast( '取消了收藏！' );
                    }else{
                        list.is_collected = 1;
                        list.collect_num ++;
                        Toast( '收藏成功！' );
                    }
                }else{
                    Toast( response.data.errmsg );
                }
                this.collectfnloading = false;
            }).catch(err => {
                this.collectfnloading = false;
                if( err.response.status == 401 ){
                    Toast('请先关注弘商公众号再进行操作！');
                }
            });
        },
    },
    destroyed(){
        document.title = "弘商法律云平台"
    },
    components: {
        comment,
        z_headimg
    }
}
</script>
