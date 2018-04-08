<style lang="stylus">
// .invoiceList
</style>

<template>
    <div class="invoiceList">
        <div v-for="list in invoiceList" @click="$store.commit('setCurOrderInfo', list),$router.push({ name: 'invoiceInfo'})" class="paymentManagelist appsmallwrap">
            <p class="rinfo"></p>
            <p class="tit">{{list.header}}</p>
            <p class="des">发票金额：<span class="red">￥{{list.price}}</span></p>
            <p class="des">开票时间：{{list.created_at}}</p>
        </div>
        <div class="nodatalist">暂无发票记录</div>
    </div>
</template>

<script>
export default {
    name: 'invoiceList',
    data () {
        return {
            invoiceList: []
        }
    },
    computed: {

    },
    beforeMount() {
        this.getInvoiceList()
    },
    mounted() {

    },
    methods: {
        getInvoiceList() {
            this.$http.get('/invoice/invoiceslist').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.invoiceList = response.data.data
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {})
        }
    },
    filters: {

    },
    components: {

    }
}
</script>
