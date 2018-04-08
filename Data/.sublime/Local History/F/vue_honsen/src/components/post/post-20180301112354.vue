<template>
    <div class="appwrap topMargin">
        <keep-alive include="postList">
            <router-view :key="key"></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'post',
    computed: {
        key() {
            if (this.$route.name == 'postList') {
                return this.$route.query.randomNum;
            } else {
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route.fullPath + +new Date();
            }
        }
    }
}
</script>