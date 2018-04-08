<style lang="stylus" scoped>
.calendar_tip
    .fullCalendarTips-enter-active, .fullCalendarTips-leave-active
        transition 0.5s all
    .fullCalendarTips-enter, .fullCalendarTips-leave-to
        // transform translateX(350px)
        transform translateX(410px)
    .fullCalendarTips
        position fixed
        right 70px
        bottom 10px
        width 340px
        height 130px
        border-radius 2px
        background-color #fff
        color #6f6f6f
        .tit
            padding: 0 35px 0 12px
            height 45px
            line-height 45px
            border-bottom 1px solid #f5f5f5
            font-size 14px
            position relative
            .icon-dacha
                position absolute
                top 0
                right 10px
                color #3dc1ff
                font-size 21px
                cursor pointer
            .icon-xiaoxi
                color #3dc1ff
                font-size 21px
            .notip
                margin-left 15px
            .toread
                float right
                font-size 14px
                color #3dc1ff
        .main
            padding: 0 35px
            .headline_wrapper
                height 42px
                line-height 42px
                border-bottom 1px solid #f5f5f5
                .headline
                    font-size 14px
                    font-weight bold
                    display inline-block
                    width 150px
                .head_create
                    display inline-block
                    width 110px
                    vertical-align: top
                    font-size 12px
            .tipsText
                height 45px
                line-height 45px
                .time
                    color #3dc1ff
</style>

<template>
    <div class="calendar_tip">
        <transition-group name="fullCalendarTips">
            <div class="fullCalendarTips" v-for="(notiSchedure,index) in notiSchedureArr" :key="index">
                <div class="tit">
                    <span class="icon-dacha" @click="closeNotiSchedure(notiSchedure,index)">
                        <Icon type="android-close"></Icon>
                    </span>
                    <Icon class="icon-xiaoxi" type="ios-bell-outline"></Icon>
                    <span class="tit_text">日程提醒</span>
                    <Checkbox class="notip" v-model="isNotip">不再提醒</Checkbox>
                    <a class="toread" href="javascript:;" @click="$store.commit('showSchPanel')">查看</a>
                </div>
                <div class="main">
                    <div class="headline_wrapper">
                        <span class="headline single_ellipsis" :title="notiSchedure.title">{{notiSchedure.title}}</span>
                        <span class="head_create single_ellipsis">创建者： {{notiSchedure.name}}</span>
                    </div>
                    <div v-show="notiSchedure.tipTime > 0" class="tipsText">您的日程还有<span class="time">{{notiSchedure.tipTime | showTime}}</span>就要开始了！</div>
                    <div v-show="notiSchedure.tipTime <= 0" class="tipsText">您的日程正在进行中...</div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'calendarTip',
    data() {
        return {
            notiSchedureArr: [],
            isNotip: false,
        }
    },
    computed: {
        notiSchedureId() {
            return this.$store.state.schedureId;
        }
    },
    watch: {
        notiSchedureId(newval,oldval) {
            if(newval){
                this.getSchedureFromId(newval);
            }
        },
    },
    mounted() {
        /* 日程提醒计时间 */
        setInterval(() => {
            this.notiSchedureArr.forEach((val) => {
                if(val.tipTime > 0){
                    val.tipTime--
                }
            })
        }, 1000)
    },
    methods: {
        closeNotiSchedure(notiSchedure,index) {
            if (this.isNotip) {
                window.socket.emit('schedure_off', notiSchedure.id);
            }
            this.notiSchedureArr.splice(index,1);
        },
        getSchedureFromId(sid) {
            let URL = `/schedure/get/${sid}`;
            this.$http.get(URL).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.notiSchedureArr.push({
                        "id": sid,
                        "title": data.data.title,
                        "name": data.data.name,
                        "tipTime": moment(data.data.start).unix() - moment().unix()
                    });
                    /* 重置state.schedureId */
                    this.$store.commit('addSchedure', null);
                }
            }).catch(err => {});
        },
    },
    filters: {
        showTime(second){
            let h = Math.floor(second/3600);
            let m = Math.floor(second%3600/60);
            let s = second%3600%60;
            return `${h}时${m}分${s}秒`;
        },
    }
}
</script>