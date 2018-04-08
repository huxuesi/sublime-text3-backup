<style lang="stylus" scoped>
.side_records
    .keeprecords
        .keeprecordsnavul
            margin: 10px 0 0
            li
                text-align: center
                height: 50px
                line-height: 50px
                cursor: pointer
                img
                    vertical-align: middle
                .clk
                    display: none
                &.active
                    .def
                        display: none
                    .clk
                        display: inline-block
</style>
<template>
    <div class="side_records">
        <sideBase :haveSideNav="true" ref="sideBase">
            <div slot="sideNav">
                <div class="keeprecords">
                    <ul class="keeprecordsnavul">
                        <li><img v-if="1" class="def" src="/static/icon/keeprecordsnav1_icon.png"><img v-else class="clk" src="/static/icon/keeprecordsnav1_icon_a.png"></li>
                        <li><img v-if="1" class="def" src="/static/icon/keeprecordsnav2_icon.png"><img v-else class="clk" src="/static/icon/keeprecordsnav2_icon_a.png"></li>
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