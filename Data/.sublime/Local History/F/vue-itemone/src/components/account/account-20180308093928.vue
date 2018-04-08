<template>
    <div class="account">
        <transition name="toogle">
            <router-view :key="key"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'account',
    computed: {
        key() {
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
        }
    }
}
</script>

<style lang="stylus" scoped>
.account
    height: 100%
    overflow-y: auto
</style>
