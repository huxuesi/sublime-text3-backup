<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.select_lawyer
    margin-top 20px
    .common_area
        padding 15px 60px 30px
        .tit
            position relative
            height: 42px
            line-height: 40px
            border-bottom: 1px solid #ebebeb
            .tit_text
                width 62px
                color #3dc1ff
                font-size 14px
                border-bottom: 2px solid #3dc1ff
                text-align center
            .edit_btn
                position absolute
                top 4px
                right 0px
        .comment_tit
            margin-top 30px
            position relative
            .comment_icon
                position absolute
                top 0px
                right 0px
                bgImg(60px,30px,'/static/icon/0036.png')
                line-height 30px
                text-align right
                cursor pointer
                color #818181
                font-size 12px
            .comment_wrap
                margin-top 30px
    .content_area
        .selected_lawyer_content
            padding 0 30px
            .content_tit
                margin-top 25px
                font-size 16px
                color #333
            .text
                margin-top 10px
                max-height 235px
                overflow-y auto
                line-height 1.75
                font-size 14px
                color #818181
            .up_file_wrap
                margin-top 30px
                padding 12px 0 10px
                border-top 1px solid #e9e9e9
                font-size 12px
                .up_btn
                    float left
                .upload_wrap_keep
                    float left
                    margin-top 4px
                    margin-right 10px
                    position relative
                    .ivu-icon
                        font-size 24px
                .file_wrap
                    float left
                    margin-left 15px
                    width 940px
                    .file_wrap_icon
                        float left
                        cursor pointer
                        bgImg(18px,30px,'/static/icon/0037.png')
                        &.active
                            background-image url('/static/icon/0038.png')
                    .file_item
                        float left
                        position relative
                        padding 0 10px
                        height 30px
                        line-height 30px
                        .line
                            position absolute
                            top 0px
                            right 0px
                    .filesjson_panel_pop
                        margin-left 18px
                        margin-top 3px
                        position relative
                        .more
                            display block
                            font-weight bold
                            font-size 14px
                            cursor pointer
                        .ivu-poptip-popper
                            left -293px !important
                            top 25px !important
                            .file_item
                                width 100%
                                height 40px
                                line-height 40px
                                &:hover
                                    background-color #f1f5f6
            .lawyer_list_wrap
                padding-top 20px
                border-top 1px solid #e9e9e9
                border-bottom: 1px solid #ebebeb
                .lawyer_list_tit
                    color #333
                .lawyer_list
                    padding 10px 0
                    .lawyer_item
                        float left
                        margin 10px
                        width 80px
                        text-align center
                        .lawyer_avatar
                            border-radius 50%
                            border 1px solid #fefefe
                            box-shadow 0 1px 5px rgba(0,0,0,0.2)
                        .name
                            margin-top 5px
                            font-size 12px
                            color #818181
.edit_biz_modal
    align-items: baseline !important
    .btn_wrap
        margin-top -23px
        text-align center
        .btn_submit
            margin-right 10px
</style>

<template>
    <div class="select_lawyer">
        <Card class="content_area common_area" :bordered="false" dis-hover :padding="0">
            <div class="tit">
                <div class="tit_text">委托内容</div>
                <Button class="edit_btn" type="info" @click="customer_edit_biz = true">编辑</Button>
            </div>

            <div class="selected_lawyer_content">
                <div class="content_tit">{{sendbizeditinfo.name}}</div>
                <div class="text">{{sendbizeditinfo.content}}</div>

                <div v-if="sendbizeditinfo.filesjson && sendbizeditinfo.filesjson.length" class="up_file_wrap clearfix">
                    <div class="file_wrap clearfix">
                        <div class="file_wrap_icon" :class="{active: !show_files}" @click="show_files = !show_files"></div>
                        <div
                            v-if="index < 4"
                            v-show="show_files"
                            class="file_item"
                            v-for="(file,index) in sendbizeditinfo.filesjson"
                            :key="index">
                            <fileRead :file="file" :needDel="false"></fileRead>
                            <div class="line">|</div>
                        </div>
                        <Poptip
                            v-if="sendbizeditinfo.filesjson.length > 4"
                            v-show="show_files"
                            class="filesjson_panel_pop"
                            placement="bottom-end"
                            width="325"
                            trigger="hover"
                            :transfer="false">
                            <span class="more">. . .</span>
                            <div slot="content">
                                <div class="file_item" v-if="index > 3" v-for="(file,index) in sendbizeditinfo.filesjson" :key="index">
                                    <fileRead :file="file" :needDel="false"></fileRead>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                </div>

                <div class="lawyer_list_wrap">
                    <div class="lawyer_list_tit">接收者</div>
                    <div class="lawyer_list clearfix">
                        <div class="lawyer_item" v-for="(lawyer,index) in sendLawyers" :key="lawyer.id">
                            <img class="lawyer_avatar" :src="$avatarHash(lawyer.id)" width="60" height="60">
                            <div class="name single_ellipsis">{{lawyer.name}}</div>
                            <div class="name">
                                <Button @click="slectedLawyer(lawyer,index)" :loading="showLoading[index]" size="small" type="info" :disabled="cannotSelected(lawyer.id)">选 定</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="comment_tit tit">
                <div class="tit_text">律师回复</div>
                <!-- <div class="comment_icon" @click="show_comment = !show_comment">{{sendbizeditinfo.commentTotal}}</div> -->
            </div>
            <div v-show="show_comment" class="comment_wrap">
                <comment v-if="fid" :id="fid" :haveBigBtn="false" @bigUsers="getbigUser" type="flow"></comment>
            </div>
        </Card>

        <!-- 编辑 -->
        <Modal
            v-model="customer_edit_biz"
            :closable="false"
            :mask-closable="false"
            width="1200"
            :styles="{top: '130px'}"
            class-name="edit_biz_modal">
            <div v-if="customer_edit_biz" class="main">
                <z_sendBiz ref="sendBiz" :id="id" @sendOK="sendBizOK"></z_sendBiz>
            </div>

            <div slot="footer">
                <div class="btn_wrap">
                    <Button class="btn_submit" type="info" @click="sendBiz">提 交</Button>
                    <Button type="info" class="gray_btn" @click="customer_edit_biz = false">取 消</Button>
                </div>
            </div>
        </Modal>
</div>
</template>

<script>
import comment from '@/components/common/z-comment';
import z_sendBiz from '@/components/common/z-sendBiz';
import fileRead from '@/components/common/fileRead';
export default {
    name: 'selectLawyer',
    components: {comment,z_sendBiz,fileRead},
    data() {
        return {
            sendbizeditinfo: {},
            /* 编辑 */
            customer_edit_biz: false,
            id: null,  // 案件id
            show_files: true,
            show_comment: true,
            T1Comentor_ids: [],
            userlawyerlist: [],
            showLoading: [],
            fid: null,
        }
    },
    computed: {
        sendLawyers() {
            let arr = [];
            if (this.sendbizeditinfo.lawyers &&　this.userlawyerlist.length) {
                arr = this.userlawyerlist.filter(val => this.sendbizeditinfo.lawyers.includes(val.id));
            }
            return arr;
        },
    },
    created() {
        this.id = Number(this.$route.params.id);
    },
    mounted() {
        this.getCaseInfo();
        this.getUserFollowLawyers();
    },
    methods: {
        getbigUser(usersIds) {
            this.T1Comentor_ids = usersIds;
        },
        cannotSelected(id) {
            return this.T1Comentor_ids.includes(id)? false: true;
        },
        slectedLawyer(lawyer,index) {
            this.showLoading.splice(index,1,true);
            this.$http.get(`biz/case/issuecase/designatelawyer/${this.id}/${lawyer.id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$router.push({name: 'personalCenter', params: {id: this.$store.state.mineInfo.id}});
                    this.$Message.success('选定律师成功！');
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.showLoading.splice(index,1,false);
            }).catch(err => {
                this.showLoading.splice(index,1,false);
            });
        },
        getUserFollowLawyers() {
            this.$http.get('biz/case/getuserfollowlawyers').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userlawyerlist = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        getCaseInfo() {
            this.$http.get(`/biz/keep/${this.id}/listall`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( !response.data.data[0] ){
                        this.$Message.error('此业务已经选定律师');
                        this.$router.go(-1);
                        return false;
                    }
                    let v = response.data.data[0];
                    this.fid = v.casefid;
                    this.sendbizeditinfo = {
                        name: v.casename,
                        content: v.content,
                        lawyers: v.lawyers,
                        filesjson: JSON.parse(v.filesjson),
                        ctmid: -1,
                        personal: true,
                        casefid: v.casefid,
                        commentTotal: v.commentTotal
                    };
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        sendBizOK(sendObj) {
            this.customer_edit_biz = false;
            this.sendbizeditinfo = sendObj;
        },
        sendBiz() {
            this.$refs.sendBiz.sendBiz();
        }
    }
}
</script>