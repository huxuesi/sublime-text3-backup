<style lang="stylus">
// .orderInfo
</style>

<template>
    <div class="orderInfo">
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text">{{$store.state.curOrderInfo.header}}</span></p>
            <p class="tit graytit">发票抬头</p>
        </div>
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text">{{$store.state.curOrderInfo.invoiceNature}}</span></p>
            <p class="tit graytit">发票性质</p>
        </div>
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text">{{$store.state.curOrderInfo.created_at}}</span></p>
            <p class="tit graytit">开票时间</p>
        </div>
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text red">￥{{$store.state.curOrderInfo.price}}</span></p>
            <p class="tit graytit">发票金额</p>
        </div>
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text">{{$store.state.curOrderInfo.access}}</span></p>
            <p class="tit graytit">收取方式</p>
        </div>
        <div class="paymentManagelist appsmallwrap">
            <p class="rinfo"><span class="text green">{{$store.state.curOrderInfo.state}}</span></p>
            <p class="tit graytit">当前状态</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderInfo',
    data () {
        return {

        }
    },
    computed: {

    },
    beforeMount() {
        if( !this.$store.state.curOrderInfo.header ){
            this.$router.push({ name: 'invoiceList'})
        }
    },
    mounted() {

    },
    methods: {

    },
    filters: {

    },
    components: {

    }
}
</script>
