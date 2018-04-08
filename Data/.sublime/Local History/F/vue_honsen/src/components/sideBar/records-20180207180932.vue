<style lang="stylus" scoped>

</style>
<template>
    <div class="side_records">
        <sideBase :haveSideNav="true" ref="sideBase">
            <div slot="sideNav">
                <div>
                    <ul>
                        <li><img v-if="1" class="def" src="/static/icon/0016_.png"><img v-else class="clk" src="/static/icon/0016.png"></li>
                        <li><img v-if="1" class="def" src="/static/icon/chat_icon_personal.png"><img v-else class="clk" src="/static/icon/chat_icon_personal_.png"></li>
                    </ul>
                </div>
            </div>

            <div slot="side">

            </div>

            <div slot="mainTit">

            </div>

            <div slot="main">
                正在开发中...
            </div>
        </sideBase>
    </div>
</template>
<script>
import sideBase from './sideBase';
export default {
    name: 'records',
    components: {sideBase},
    methods: {

    },
}
</script>