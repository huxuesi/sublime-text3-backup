<style lang="stylus">
.caseFlowFiles
    .fujianwrap
        width: 50%
        float: left
        border-right: 1px solid #e1e1e1
        &:last-child
            border-right: 0
        .tit
            height: 40px
            line-height: 40px
            color: #333
            padding-left: 60px
            border: 1px solid #e1e1e1
            border-left: 0
            border-right: 0
            background: #f0f6fe
        .con
            padding: 40px 0 20px 70px
            li
                height: 28px
                line-height: 28px
                .tuisong
                    color: #1890ff
                .yituisong
                    color: #bbb
                .tuisong, .down, .del
                    cursor: pointer
                .tuisong, .down, .del, .yituisong
                    display: inline-block
                    padding: 0 3px
                    text-align: center
                    img
                        vertical-align: text-top
</style>

<template>
    <div class="caseFlowFiles">
        <div class="head">
            <span class="tit">附件</span>
            <span class="edit">
                <Upload
                    v-if="oRole.canEditOwnCreated(curflow.creator)"
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
            <div class="fujianwrap">
                <div class="tit">
                    我的上传
                </div>
                <ul class="con">
                    <li v-for="(file, index) in curflow.filesjson">
                        <span class="filename">{{index+1 + '、' + file.name}}</span>
                        <!-- <span v-if="1" class="tuisong">推送</span>
                        <span v-else class="yituisong">已推送</span> -->
                        <span class="down toggleimgnav"><img class="def" src="/static/icon/bizv2_down_icon.png"><img class="hov" src="/static/icon/bizv2_down_icon_.png"></span>
                        <span class="del toggleimgnav"><img class="def" src="/static/icon/bizv2_delicon.png"><img class="hov" src="/static/icon/bizv2_del_icon_.png"></span>
                    </li>
                    <div v-if="!curflow.filesjson.length" class="nodatalistcry">
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
                    <li v-for="(file, index) in curflow.filesjson">
                        <span class="filename">{{index+1 + '、' + file.name}}</span>
                        <!-- <span v-if="1" class="tuisong">推送</span>
                        <span v-else class="yituisong">已推送</span> -->
                        <span class="down toggleimgnav"><img class="def" src="/static/icon/bizv2_down_icon.png"><img class="hov" src="/static/icon/bizv2_down_icon_.png"></span>
                        <span class="del toggleimgnav"><img class="def" src="/static/icon/bizv2_delicon.png"><img class="hov" src="/static/icon/bizv2_del_icon_.png"></span>
                    </li>
                    <div v-if="!curflow.filesjson.length" class="nodatalistcry">
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
        oRole: [Object],
    },
    data() {
        return {
            imgUrl,
        }
    },
    computed: {
        flowUpParam() {
            return {
                about_id: this.curflow.casefid,
                about_type: 'biz_case_node_flows'
            }
        },
    },
    beforeMount() {
        this.getFlowKeep();
    },
    methods: {
        getFlowKeep() {
            /*this.$ajax('get', this.$apiConfig.bizGroup.getCaseFlowKeep, {flowid: this.curflow.casefid}, (data) => {
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
            });*/
        },
        flowUpSuccess(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {

                this.$refs.up_load_ref.clearFiles();

                // 将上传的文件信息发给后端（追加式的）
                let newFileObj = {
                    hash: response.hash,
                    name: file.name
                };
                // let jsonString = JSON.stringify(this.flowContent.filesjson.concat(newFileObj));

                let jsonString = JSON.stringify([newFileObj]);

                this.$ajax('post', `/biz/flow/${this.caseInfo.caseid}/store/${this.curflow.casefid}`, {filesjson: jsonString}, data => {
                    this.curflow.filesjson.push(newFileObj);

                    this.$Message.success('文件上传成功！');
                });
            }
        },
        flowUpError() {
            this.$Message.error('文件上传失败，请重试！');
        },
    },
    watch: {

    },
    filters: {

    },
}
</script>
