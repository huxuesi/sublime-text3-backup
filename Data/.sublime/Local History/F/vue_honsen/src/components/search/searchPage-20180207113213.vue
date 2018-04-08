<template>
    <div class="appwrap">
        <router-view :key="key"></router-view>
    </div>
</template>

<script>
export default {
    name: 'searchPage',
    computed: {
        key() {
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route.fullPath + +new Date();
        }
    },
}
</script>
