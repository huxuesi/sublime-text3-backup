<style lang="stylus">
.personalsetNav
    background: #f0eff5
    height: 100%
</style>

<template>
    <div class="personalsetNav">
        <div class="v2personalnav">
            <div class="v2personalnavgroup">
                <div @click="$router.push({ name: 'headimgUp'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit">头像上传</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div @click="$router.push({ name: 'personalSetInfo'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit">个人信息</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div @click="$router.push({ name: 'V2bindAccount'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit">账号绑定</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div @click="$router.push({ name: 'jobauth'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit">律师认证</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
            </div>
            <div v-if="$store.state.userInfo.is_pay" @click="$router.push({ name: 'personalorderNav'})" class="v2personalnavitem">
                <div class="v2personalnavitemcontent">
                    <span class="v2personalnavitemtit">订单管理</span>
                    <span class="iconright"><i></i></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'personalsetNav',
    data () {
        return {

        }
    },
    computed: {

    },
    beforeMount() {

    },
    methods: {

    },
    filters: {

    },
    components: {

    }
}
</script>
