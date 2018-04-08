<style lang="stylus" scoped>
.side_records
    .keeprecordsnav
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
                <div class="keeprecordsnav">
                    <ul class="keeprecordsnavul">
                        <li @click="curLeftNav = 'keeprecords'" :class="{ active: curLeftNav == 'keeprecords'}"><img class="def" src="/static/icon/keeprecordsnav1_icon.png"><img class="clk" src="/static/icon/keeprecordsnav1_icon_a.png"></li>
                        <li @click="curLeftNav = 'keeptasks'" :class="{ active: curLeftNav == 'keeptasks'}"><img class="def" src="/static/icon/keeprecordsnav2_icon.png"><img class="clk" src="/static/icon/keeprecordsnav2_icon_a.png"></li>
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
    data() {
        return {
            curLeftNav: 'keeprecords',
        }
    },
    components: {sideBase},
    methods: {

    },
}
</script>