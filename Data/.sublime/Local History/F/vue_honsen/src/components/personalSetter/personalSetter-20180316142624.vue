<style lang="stylus" scoped>
$active = #3dc1ff
.personalSetter
    background-color #65778b
    .sidewrap
        .nav_item
            height 135px
            line-height 180px
            text-align center
            font-size 16px
            color #fff
            cursor pointer
            background-position center 40px
            background-repeat no-repeat
            background-color #65778b
            &:nth-child(1)
                background-image url('/static/icon/_0001.png')
                &.active
                    background-image url('/static/icon/0001.png')
            &:nth-child(2)
                background-image url('/static/icon/_0005.png')
                &.active
                    background-image url('/static/icon/0005.png')
            &:nth-child(3)
                background-image url('/static/icon/_0006.png')
                &.active
                    background-image url('/static/icon/0006.png')
            &.active
                background-color #fff
                color $active
    .mainwrap
        background-color #fff
        min-height 835px
        .main
            padding: 0 60px
</style>
<template>
    <Card class="personalSetter appwrap topMargin" :bordered="false" dis-hover :padding="0">
        <Row>
            <Col span="3" class="sidewrap">
                <div class="nav_item" :class="{ active: currentNavItem === 'accountSet'}" @click="toggleNav('accountSet')">账号设置</div>
                <div class="nav_item" :class="{ active: currentNavItem === 'identitySet'}" @click="toggleNav('identitySet')">律师认证</div>
                <div v-if="$store.state.mineInfo.is_pay" class="nav_item" :class="{ active: currentNavItem === 'orderManagement'}" @click="toggleNav('orderManagement')">订单管理</div>
            </Col>
            <Col span="21" class="mainwrap">
            <keep-alive>
                <router-view class="main"></router-view>
            </keep-alive>
            </Col>
        </Row>
    </Card>
</template>

<script>

export default {
    name: 'personalSetter',
    computed: {
        currentNavItem() {
            return this.$route.name
        }
    },
    methods: {
        toggleNav(type) {
            this.$router.push({name: type});
        },
    }
}
</script>
