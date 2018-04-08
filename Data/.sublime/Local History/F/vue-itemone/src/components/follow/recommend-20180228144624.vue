<style lang="stylus" scoped>
.recommendwrap
    padding: 0
    .recommendtopbg
        background: #efeff4
        height: 0.9rem
        line-height: 0.9rem
        color: #535353
        position: relative
        & > p
            text-align: center
        .addressicon
            width: 0.27rem
            margin-right: 0.27rem
            vertical-align: text-bottom
        .downicon
            width: 0.14rem
            margin-left: 0.24rem
            transform: rotate(-90deg)
        .selectlocalpanel
            position: absolute
            top: 100%
            left: 50%
            margin-left: -3.45rem
            line-height: initial
            padding: 0.29rem 0.1rem 0.45rem
            .tit
                color: #333
                font-size: 0.3rem
                padding: 0 0 0.1rem 0.2rem
            .selectul
                margin: 0 0 0.25rem
                li
                    font-size: 0.28rem
                    color: #838383
                    float: left
                    width: 20%
                    text-align: center
                    line-height: 0.7rem
                    &.active
                        color: #3dc1ff !important
                    &:first-child
                        color: #000
    .classifywrap
        padding: 0.3rem 0.1rem 0
        .tagitem
            display: inline-block
            width: 25%
            text-align: center
            height: 0.7rem
            line-height: 0.7rem
            position: relative
            font-size: 0.28rem
            padding: 0 0.06rem
            color: #535353
            box-sizing: border-box
            &:after
                content: ''
                display: inline-block
                position: absolute
                right: 0
                top: 50%
                margin-top: -0.12rem
                height: 0.24rem
                width: 1px
                background: #888
            &:nth-child(4n):after
                background: transparent
            &.active
                color: #26baff
            .name
                display: block
                height: 100%
                margin: 0
                white-space: nowrap
                overflow: hidden
            .classifychild
                position: absolute
                top: 0.73rem
                left: 0
                padding: 0.05rem 0.1rem
                width: 100%
                margin: 0
                font-size: 0.24rem
                background: #7bbcfc
                border-radius: 11px
                color: #fff
                z-index: 1
                box-sizing: border-box
                &:before
                    content: ''
                    position: absolute
                    top: -0.12rem
                    left: 50%
                    margin-left: -0.11rem
                    border-bottom: 0.12rem solid #7bbcfc
                    border-left: 0.11rem solid transparent
                    border-right: 0.11rem solid transparent
                li
                    height: 0.6rem
                    line-height: 0.6rem
                    border-bottom: 1px solid #fff
                    white-space: nowrap
                    overflow: hidden
                    &:last-child
                        border-bottom: none

    .tagshowall
        margin-top: 0.15rem
        color: #3dc1ff
        font-size: 0.26rem
        text-align: center
        img
            width: 0.21rem
            vertical-align: middle
            position: relative
            top: -1px
    .taghiddenall
        img
            transform: rotateX(180deg)
    .tagusertitle
        width: 6.05rem
        margin: 0.33rem auto 0
        background: #a5a5a5
        height: 0.54rem
        text-align: center
        line-height: 0.54rem
        color: #fff
        font-size: 0.24rem
    .clickafter
        border-top: 1px solid #e5e5e5
        margin-top: 0.4rem
        padding: 0.3rem 0.26rem 0
    .selectlocalselectwrap
        width: 87%
        position: relative
        margin: 0.26rem auto 0 auto
        .selectlocalipt
            width: 80%
            height: 0.7rem
            border: 1px solid #b4c6d1
            padding-left: 0.34rem
            box-sizing: border-box
        .icon
            width: 20%
            display: inline-block
            line-height: 0.7rem
            text-align: center
            background: #3dc1ff
            color: #fff
            float: right
            img
                width: 0.14rem
                transform: rotate(-90deg)
                vertical-align: middle
</style>

<template>
    <div class="recommendwrap">
        <div class="recommendtopbg">
            <p @click="locationpanel1 = !locationpanel1"><img class="addressicon" src="/static/icon/follow_address_icon.png"><span class="singleellipsis" style="display: inline-block; max-width: 5rem; vertical-align: top;">{{selectlocation.join(' ')}}</span><img class="downicon" src="/static/icon/followlist_icon.png"></p>
            <div v-if="locationpanel1" class="selectlocalpanel appmiddlewrap floatpanel">
                <p class="tit">热门城市</p>
                <ul class="selectul clearboth">
                    <li v-for="list in hotcity" @click="changelocation(list)" :class="{ active: selectlocation[selectlocation.length - 1] === list[list.length - 1] }">{{list[list.length - 1]}}</li>
                </ul>
                <p class="tit">精确选择</p>
                <div class="selectlocalselectwrap">
                    <input :value="selectlocal.join('/')" readonly="readonly" @click="locationpanel = true" type="text" class="selectlocalipt" placeholder="省/市">
                    <span @click="changelocation(false)" class="icon">查找</span>
                </div>
            </div>
        </div>
        <div style="height: 0.1rem"></div>
        <z_searchBox type="user"></z_searchBox>
        <div>
            <!-- 分类 -->
            <div class="classifywrap">
                <div v-for="(n, index) in taglist" v-if="!(index >= 12 && !tagshowall)" @click="changeid(n.tid, index)" :class="{active: n.tid == curid}" class="tagitem">
                    <span class="name">{{n.name}}</span>
                    <ul v-if="n.child.length && n.tid == curid && n.showchildlist" class="classifychild">
                        <li v-for="li in n.child" @click.stop="changechildid(li.tid, index)">{{li.name}}</li>
                    </ul>
                </div>
            </div>
            <div></div>
            <div v-if="taglist.length > 12">
                <p v-if="!tagshowall" @click="tagshowall = true" class="tagshowall">查看更多 <img src="/static/icon/followlist_icon_.png"></p>
                <p v-else @click="tagshowall = false" class="tagshowall taghiddenall">收 起 <img src="/static/icon/followlist_icon_.png"></p>
            </div>
            <!-- 点击分类展示 -->
            <div
                v-if="userlistshow"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="userlistisend"
                infinite-scroll-distance="30"
                infinite-scroll-immediate-check="false"
                class="clickafter appsmallwrap">
                <lawyerList :list="userlist" :needdes="false" :needrole="true" :needsend="!$authCodeT($store.state.userInfo.auth_code).isLawyer"></lawyerList>
            </div>
            <div class="nodatalist">
                <mt-spinner v-if="userlistloading" class="lodingdataicon"></mt-spinner>
                <span v-if="userlistisend && !userlistloading">没有更多推荐的律师了！</span>
            </div>
        </div>
        <mt-popup
            v-model="locationpanel"
            position="bottom"
            class='v2bottomselectwrap'>
            <div class="localtoolbar clearboth">
                <span @click="locationpanel = false" class="quxiao">取消</span>
                <span @click="changeselelocal" class="queding">确定</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import lawyerList from "@/components/common/z-lawyerList"
import z_searchBox from '@/components/common/z-searchBox'
import siteJson from '../../../static/json/siteJson2.json'

export default {
    name: 'recommendwrap',
    data () {
        return {
            siteJson,
            taglist: [],
            tagshowall: false,
            curid: null,
            userlist: [],
            userlistshow: false,
            userlistperpage: 6,
            userlistloading: false,
            userlistisend: false,
            locationpanel: false,
            locationpanel1: false,
            timeoutflag: false,
            selectlocation: ['定位中...'], //定位的地址
            selectlocal: [],    //选择框
            selectlocal1: [],    //选择框
            isselect: 0,
            hotcity: [
                ['全国'],
                ['北京市'],
                ['上海市'],
                ['广东省', '广州市'],
                ['广东省', '深圳市'],
                ['四川省', '成都市']
            ],
            slots: [
                {
                  flex: 1,
                  values: siteJson.map(e => e.value),
                  className: 'slot1',
                  textAlign: 'center'
                },
                {
                  divider: true,
                  content: '-',
                  className: 'slot2'
                },
                {
                  flex: 1,
                  values: [],
                  className: 'slot3',
                  textAlign: 'center'
                }/*,
                {
                  divider: true,
                  content: '-',
                  className: 'slot4'
                },
                {
                  flex: 1,
                  values: [],
                  className: 'slot5',
                  textAlign: 'center'
                }*/
            ]
        }
    },
    beforeMount() {
        this.gettag()
        let _this = this
        if( navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger" ){
            this.getuserip()
            return false
        }
        setTimeout(() => {
            if( !this.timeoutflag ){
                this.getuserip()
            }
        }, 3000)
        this.$http.get('/wechatjssdk').then(response => {
            if( response.data.retcode == RETCODE_OK ){
                let wxconfig = JSON.parse(response.data.js);
                wx.config({
                    debug: false,               // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wxconfig.appId,      // 必填，公众号的唯一标识
                    timestamp:  wxconfig.timestamp,     // 必填，生成签名的时间戳
                    nonceStr:  wxconfig.nonceStr,       // 必填，生成签名的随机串
                    signature:  wxconfig.signature,     // 必填，签名
                    jsApiList: [                // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        'getLocation'
                    ]
                });
                wx.ready(function(){
                    wx.getLocation({
                        type: 'wgs84',          // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            let latitude = res.latitude;    // 纬度，浮点数，范围为90 ~ -90
                            let longitude = res.longitude;  // 经度，浮点数，范围为180 ~ -180。
                            let speed = res.speed;          // 速度，以米/每秒计
                            let accuracy = res.accuracy;    // 位置精度

                            let latlon = latitude + ',' + longitude;

                            //baidu地图
                            let url = `http://api.map.baidu.com/geocoder/v2/?ak=E0knAqf0XvDEDhjTrzljDTWifYLwYi6h&callback=renderReverse&location=${latlon}&output=json&pois=0`;
                            _this.$jsonp(url, null, function (err, data) {
                                if( _this.timeoutflag == true ){
                                    return false;
                                }
                                if( data.status == 0 ){
                                    // 成功获取
                                    let obj = data.result.addressComponent
                                    let provice = obj.province
                                    let city = obj.city
                                    // 不要区
                                    // let district = obj.district
                                    let district = ''
                                    let defaddress = ['广东省', '深圳市']
                                    if( provice != '' && city != '' && district != '' ){
                                        defaddress = [provice, city, district]
                                    }
                                    if( provice != '' && city != '' && district == '' ){
                                        defaddress = [provice, city]
                                    }
                                    if( provice != '' && city == '' && district == '' ){
                                        defaddress = [provice]
                                    }
                                    _this.selectlocation = defaddress
                                    _this.gettaguser()
                                }else{
                                    _this.getuserip()
                                    console.log('从百度地图获取位置失败')
                                    console.error(err.message)
                                }
                            });
                        },
                        cancel: function() {
                            _this.getuserip()
                            console.log('用户取消获取地理位置授权！')
                        },
                        fail: function() {
                            _this.getuserip()
                            console.log('获取地理位置授权失败！')
                        }
                    });
                });
                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    _this.getuserip()
                    console.log(res)
                });
            }else{
                this.getuserip()
                console.log( response.data.errmsg )
            }
        }).catch(err => {
            this.getuserip()
        })
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.slots[0].defaultIndex = 1;
            }, 100);
        });
    },
    methods: {
        gettag(id, child){
            let url
            if( id ){
                url = `/posttag/get/${id}`
            }else{
                url = `/posttag/get`
            }
            this.$http.get(url).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    if( id ){
                        this.$set(this.taglist[child], 'child', v)
                        this.$set(this.taglist[child], 'showchildlist', true)
                    }else{
                        v.unshift({ name: "全部", tid: null})
                        v.forEach(val => {
                            val.child = []
                        })
                        this.taglist = response.data.data
                    }
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {
                console.log(err)
            })
        },
        gettaguser(id, ismore){
            this.timeoutflag = true
            let url;
            if( id ){
                url = `/posttag/getuser/${id}`;
            }else{
                url = '/posttag/getuser';
            }
            if( ismore ){
                if( this.userlistisend ){
                    return false
                }
            }else{
                this.userlist = []
                this.userlistisend = false
            }
            this.userlistloading = true
            let text = this.selectlocation[0].indexOf('市') == -1 ? '' : this.selectlocation[0] + '-';
            this.$http.get(url, { params: { page: this.userlist.length / this.userlistperpage + 1, perpage: this.userlistperpage, position: text + this.selectlocation.join('-'), isselect: this.isselect}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data.data
                    v.forEach(val => {
                        val.fid = val.id
                        if( val.speciality.length ){
                            let arr = []
                            val.speciality.forEach(val => {
                                arr.push(val.name)
                            })
                            val.speciality = arr.join("，")
                        }else{
                            val.speciality = ''
                        }
                    })
                    if( ismore ){
                        this.userlist = this.userlist.concat(v)
                    }else{
                        this.userlist = v
                    }
                    if( v.length < this.userlistperpage ){
                        this.userlistisend = true
                    }
                    this.userlistshow = true
                }else{
                    console.log( response.data.errmsg )
                }
                this.userlistloading = false
            }).catch(err => {
                this.userlistloading = false
            })
        },
        changeid(id, index){
            if( this.curid != id ){
                if( this.taglist[index]['child'].length <= 0 ){
                    this.gettag(id, index)
                }else{
                    this.$set(this.taglist[index], 'showchildlist', true)
                }
            }else{
                if( this.taglist[index]['showchildlist'] ){
                    this.$set(this.taglist[index], 'showchildlist', false)
                }else{
                    this.$set(this.taglist[index], 'showchildlist', true)
                }
            }
            this.curid = id
            this.gettaguser(id)
        },
        changechildid(id, index){
            this.gettaguser(id)
            this.$set(this.taglist[index], 'showchildlist', false)
        },
        getuserip() {
            this.timeoutflag = true
            let defaultlocation = ['广东省', '深圳市'];
            this.$http.get('/getip').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data
                    v.ip_province = v.ip_province || ''
                    v.ip_city = v.ip_city || ''
                    if( v.ip_province != '' && v.ip_city != '' ){
                        defaultlocation = [v.ip_province, v.ip_city];
                    }
                    if( v.ip_province != '' && v.ip_city == '' ){
                        defaultlocation = [v.ip_province];
                    }
                }
                this.selectlocation = defaultlocation;
                this.gettaguser();
            }).catch(err => {
                this.selectlocation = defaultlocation;
                this.gettaguser();
            });
        },
        loadMore() {
            if( !this.userlistloading ){
                this.userlistloading = true
                this.gettaguser(this.curid, true)
            }
        },
        onValuesChange(picker, values) {
            if( values[0] ){
                let sheng = this.siteJson.map(e => e.value)
                let shi = this.siteJson.find(e => e.value == values[0]).children.map(e => e.value)
                // 增加选择全部地区
                if( shi.length && shi[0] == '全部地区' ){

                }else{
                    shi.unshift('全部地区')
                }
                picker.setSlotValues(1, shi)
                /*let xian = []
                if( values[1] && shi.includes(values[1]) ){
                    xian = this.siteJson.find(e => e.value == values[0]).children.find(e => e.value == values[1]).children.map(e => e.value)
                }
                picker.setSlotValues(2, xian);*/
                // 如果选择全部地区就去掉
                if( values[1] == '全部地区' ){
                    values.pop()
                }
                this.selectlocal1 = values
            }
        },
        changeselelocal() {
            this.selectlocal = JSON.parse(JSON.stringify(this.selectlocal1))
            this.locationpanel = false
        },
        changelocation(list) {
            if( list ){
                this.selectlocation = list;
            }else{
                this.selectlocation = this.selectlocal.length ? this.selectlocal : this.selectlocation;
            }
            this.curid = null;
            this.userlistisend = false;
            this.isselect = 1;
            this.gettaguser();
            this.locationpanel1 = false;
        }
    },
    watch: {

    },
    components: {
        lawyerList,
        z_searchBox
    }
}
</script>
