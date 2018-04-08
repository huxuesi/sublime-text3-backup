<style lang="stylus" scoped>
.editor_wrap_biz
    position relative
    width: 100%
    .upload_wrap
        width: 23px
        position absolute
        top -11px
        left 626px
        &.full_screen
            position fixed
            z-index 1100
        .ivu-upload-list
            position relative
            z-index 1001
            .ivu-upload-list-file
                span
                    display none
        .up_icon_wrap
            background-color: transparent
            border: 1px solid transparent
            position absolute
            z-index 1000
            width 23px
            height 26px
            .up_icon
                height 20px
                width 20px
                background-image url('/static/uedit/themes/default/images/icons.png')
                background-repeat no-repeat
                background-position -380px 0
            &:hover
                background-color: #fff5d4
                border-color: #dcac6c
</style>
<template>
    <div class="editor_wrap_biz">
        <div :id="ue_id" type="text/plain" style="width: 100%; height: 190px"></div>
        <Upload
            class="upload_wrap"
            :class="{full_screen: isFullScreen}"
            :action="imgUrl + '/file/upload'"
            :with-credentials="true"
            :data="up_param"
            :show-upload-list="true"
            :on-success="up_img_success"
            :on-error="up_img_error"
            :format="['jpg','jpeg','png']"
            ref="up_img"
            name="upload">
            <div class="up_icon_wrap"><div class="up_icon" title="上传图片"></div></div>
        </Upload>
    </div>
</template>
<script>
import '../../../static/uedit/ueditor.config';
import '../../../static/uedit/ueditor.all.min.js';
import '../../../static/uedit/lang/zh-cn/zh-cn';
export default {
    name: '',
    data() {
        return {
            imgUrl, /* 上传基础地址 */
            ue: '', /* 编辑器实例 */
            isFullScreen: false,
        }
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        /* 文件上传about_id */
        aboutId: {
            type: Number,
            default: -1
        },
        /* 文件上传about_type */
        aboutType: {
            type: String,
            default: ''
        },
        flag: {
            type: String,
            default: ''
        }
    },
    computed: {
        /* 文件上传额外参数 */
        up_param() {
            return {
                about_id: this.aboutId,
                about_type: this.aboutType
            }
        },
        ue_id() {
            return 'editor' + this.flag;
        },
    },
    mounted() {
        let _this = this;

        /* 创建编辑器实例 */
        UE.delEditor(this.ue_id);
        this.ue = UE.getEditor(this.ue_id, {
            imgUrl: '',
            UEDITOR_HOME_URL: '/static/uedit/',
            // initialHeight: 190,  // 初始化编辑器高度
            initialFrameWidth: '100%',
            enableAutoSave: false,
            saveInterval: 0,
            toolbars : [[
                'undo', 'redo', 'bold', 'italic', 'underline', 'strikethrough', 'removeformat', 'formatmatch', 'forecolor', 'backcolor','lineheight','paragraph', 'fontfamily','fontsize','link', 'unlink','horizontal','inserttable', 'fullscreen'
            ]]
        });

        /* 写入内容 */
        this.ue.addListener( 'ready', function( editor ) {
            _this.ue.setContent(_this.content);
            _this.ue.focus(true); // 焦点在尾部
        });

        this.ue.addListener('fullscreenchanged',(event,isFullScreen) => {
            this.isFullScreen = isFullScreen;
        });

        this.ue.addListener('contentChange',() => {
            this.$emit('contentChange');
        });
    },
    beforeDestroy() {
        /* 摧毁编辑器实例 */
        UE.getEditor(this.ue_id).destroy();
    },
    methods: {
        get_content() {
            return this.ue.getContent();
        },
        up_img_success(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {
                this.$Message.success('图片上传成功！');
                this.$refs.up_img.clearFiles();
                /* 在编辑器中插入元素（img预览） */
                let src = imgUrl + '/file/preview/' + response.hash + '/img';
                let el = '<img src="'+ src +'" class="ueditor_img" style="max-width: 840px;" />';
                this.ue.execCommand('inserthtml',el);
            }
        },
        up_img_error() {
            this.$Message.error('图片上传失败，请重试！');
            this.$refs.up_img.clearFiles();
        },
    }
}
</script>