<style lang="stylus">

</style>

<template>
    <div class="appwrap">
        <router-view :key="key"></router-view>
    </div>
</template>

<script>
export default {
    name: 'personalPage',
    computed: {
        key() {
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route.fullPath + +new Date();
        }
    },
}
</script>
