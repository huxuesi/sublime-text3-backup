<template>
    <div class="topMargin appwrap">
        <keep-alive include="businessList">
            <router-view :key="key"></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'business',
    computed: {
        key() {
            if (this.$route.name == 'businessList') {
                return this.$route.query.randomNum;
            } else {
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route.fullPath + +new Date();
            }
        }
    }
}
</script>
