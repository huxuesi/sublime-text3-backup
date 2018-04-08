<template>
    <div class="feedwrap">
        <transition name="toogle">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'feedwrap'
}
</script>

<style lang="stylus" scoped>
.feedwrap
    height: 100%
    overflow-y: auto
</style>
