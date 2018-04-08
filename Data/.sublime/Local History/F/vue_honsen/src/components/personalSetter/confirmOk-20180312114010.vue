<style lang="stylus" scoped>
.confirmOk
    text-align center
    color #7c7c7c
    .img
        margin-top 110px
    .ok_text
        margin-top 15px
        font-size 16px
        color: #80c26a
        font-weight: bold
    .decs
        margin-top 34px
    .wrap_btn
        margin-top 30px
</style>

<template>
    <div class="confirmOk">
        <div class="img"><img src="/static/icon/0007.png" width="79" height="79"></div>
        <div class="ok_text">提交成功！</div>
        <!-- <div class="decs">您将有60天可以免费试用“业务”功能区，到期需付费激活才能继续使用该功能！祝您使用愉快！</div> -->
        <Row class="wrap_btn">
            <!-- <Col span="5" offset="6">
                <Button style="background-color: #7dd5ff" type="info" long @click="$router.push({name: 'feed'})">免费试用</Button>
            </Col> -->
            <Col span="4" offset="10">
                <Button type="info" long @click="show_pay_modal = true">立即付费</Button>
            </Col>
        </Row>
        <pay v-if="show_pay_modal" @close="close"></pay>
    </div>
</template>

<script>
import pay from './pay';
export default {
    name: 'confirmOk',
    components:{pay},
    data() {
        return {
            show_pay_modal: false,
        }
    },
    computed: {
        /*functionText() {
            return this.$store.getters.auth_code_2 > 10? '业务功能区': '知识功能区';
        }*/
    },
    methods: {
        close(oOrder) {
            this.show_pay_modal = false;
            if (oOrder) {
                this.$nextTick(() => {
                    this.$router.push({name: 'orderManagement'});
                });
            }
        }
    }
}
</script>