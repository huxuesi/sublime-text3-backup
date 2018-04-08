<style lang="stylus" scoped>
.contactswrap
    .item
        padding: 0.58rem 0 0.25rem
        border-bottom: 1px solid #e5e5e5
        .centerwrap
            margin-left: 1.05rem
            padding: 0.2rem 0 0
        .tit
            .name
                display: inline-block
                font-size: 0.3rem
                color: #535353
                max-width: 3.5rem
                margin-bottom: 0.08rem
            .date
                float: right
                display: inline-block
                max-width: 1.7rem
                color: #a1a1a1
        .des
            color: #999
</style>

<template>
    <div class="contactswrap">
        <div @click="changecontactsid(list.uid), $router.push({name: 'chatInfo', params: {id: list.uid }})" v-for="list in contactslist" class="item clearboth appmiddlewrap">
            <z_headimg :id="list.uid" :vip="$authCodeT(list.vip).isV" :dot="!!list.unread_num"></z_headimg>
            <div class="centerwrap">
                <p class="tit"><span class="name singleellipsis">{{list.name}}</span><span class="date singleellipsis">{{list.time | time}}</span></p>
                <p class="des singleellipsis" v-html="messageConvert(list.recent_content, 'lastmsg')"></p>
            </div>
        </div>
        <div class="nodatalist">
            <span v-if="!contactslist.length">最近没有联系任何人！</span>
        </div>
    </div>
</template>

<script>
import { messageConvert } from '@/common/js/tools'
import moment from 'moment'
import z_headimg from '@/components/common/z-headimg'

export default {
    name: 'contactswrap',
    data () {
        return {
            messageConvert
        }
    },
    computed: {
        contactslist(){
            return this.$store.state.contactslist
        },
        singlechat(){
            return this.$store.state.singlechat
        }
    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {
        changecontactsid(id){
            this.$store.commit("changeCurcontactid", id)
            this.$store.commit("changeMessage", { id: id, item: "unread_num", list: 0})
        }
    },
    filters: {
        // 转换时间
        time(date) {
            if( moment().isSame(date, 'day') ){
                return moment(date).format('H:mm')
            }else{
                return moment(date).format('MM-DD')
            }
        }
    },
    components: {
        z_headimg
    }
}
</script>
