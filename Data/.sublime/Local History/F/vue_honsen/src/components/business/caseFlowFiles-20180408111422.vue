<style lang="stylus">
.caseFlowFiles
    //
</style>

<template>
    <div class="caseFlowFiles">
        <div class="head">
            <span class="tit">附件</span>
            <span class="edit">
                <Upload
                    v-if="canEditOwnCreated(curflowobj.creator) && !isEntrust"
                    class="upload_wrap_flow"
                    :action="imgUrl + '/file/upload'"
                    :with-credentials="true"
                    :data="flowUpParam"
                    :show-upload-list="false"
                    :on-success="flowUpSuccess"
                    :on-error="flowUpError"
                    ref="up_load_ref"
                    name="upload">
                    <Button type="ghost" size="large">上 传</Button>
                </Upload>
            </span>
        </div>
        <div class="conwrap clearfix" v-scrollUnique>
            <div v-if="!isEntrust" class="fujianwrap">
                <div class="tit">
                    我的上传
                </div>
                <ul class="con">
                    <li v-for="(file, index) in curflowobj.filesjson">
                        <span class="filename">{{index+1 + '、' + file.name}}</span>
                        <!-- <span v-if="1" class="tuisong">推送</span>
                        <span v-else class="yituisong">已推送</span> -->
                        <span class="down toggleimgnav"><img class="def" src="/static/icon/bizv2_down_icon.png"><img class="hov" src="/static/icon/bizv2_down_icon_.png"></span>
                        <span v-if="canEditOwnCreated(curflowobj.creator) && !isEntrust" class="del toggleimgnav"><img class="def" src="/static/icon/bizv2_delicon.png"><img class="hov" src="/static/icon/bizv2_del_icon_.png"></span>
                    </li>
                    <div v-if="!curflowobj.filesjson.length" class="nodatalistcry">
                        <img src="/static/icon/nodata_cry_icon.png">
                        <p>还未上传过文件！</p>
                    </div>
                </ul>
            </div>
            <div class="fujianwrap">
                <div class="tit">
                    客户上传
                </div>
                <ul class="con">
                    <li v-for="(file, index) in curflowobj.filesjson">
                        <span class="filename">{{index+1 + '、' + file.name}}</span>
                        <!-- <span v-if="1" class="tuisong">推送</span>
                        <span v-else class="yituisong">已推送</span> -->
                        <span class="down toggleimgnav"><img class="def" src="/static/icon/bizv2_down_icon.png"><img class="hov" src="/static/icon/bizv2_down_icon_.png"></span>
                        <span v-if="canEditOwnCreated(curflowobj.creator) && !isEntrust" class="del toggleimgnav"><img class="def" src="/static/icon/bizv2_delicon.png"><img class="hov" src="/static/icon/bizv2_del_icon_.png"></span>
                    </li>
                    <div v-if="!curflowobj.filesjson.length" class="nodatalistcry">
                        <img src="/static/icon/nodata_cry_icon.png">
                        <p>还未上传过文件！</p>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'caseFlowFiles',
    components: { },
    props: {
        caseInfo: [Object],
        curflow: [Object],
    },
    data() {
        return {

        }
    },
    computed: {

    },
    beforeMount() {
        this.getFlowKeep();
    },
    methods: {
        getFlowKeep() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseFlowKeep, {flowid: this.curflow.casefid}, (data) => {
                data.data.forEach(e => {
                    e.recordid = e.id;
                    e.start = e.start_at;
                    e.end = e.end_at;
                    if( e.start && e.end ){
                        e.startend = [e.start, e.end];
                    }else{
                        e.startend = [];
                    }
                });
                this.casekeeplist = data.data;
            });
        },
    },
    watch: {

    },
    filters: {

    },
}
</script>
