<style lang="stylus">
.editor_post
    // position relative
    #editor
        width: 100%
    .upload_wrap
        width: 25px
        position absolute
        top 75px
        z-index 1000
        &.upload_wrap_file
            left 50%
            margin-left 200px
        &.upload_wrap_img
            left 50%
            margin-left 175px
        .ivu-upload-list
            position relative
            z-index 1001
            .ivu-upload-list-file
                span
                    display none
        .up_icon_wrap
            background-color: transparent
            border: 1px solid transparent
            width 23px
            height 26px
            .up_icon
                height 20px
                width 20px
                background-image url('/static/uedit/themes/default/images/icons.png')
                background-repeat no-repeat
            &:hover
                background-color: #fff5d4
                border-color: #dcac6c
            .up_file_icon
                background-position -520px 0
            .up_img_icon
                background-position -380px 0
</style>
<template>
    <div class="editor_post">
        <div id="editor" type="text/plain"></div>
        <Upload
            class="upload_wrap upload_wrap_file"
            :action="imgUrl + '/file/upload'"
            :with-credentials="true"
            :data="up_param"
            :show-upload-list="true"
            :on-success="up_file_success"
            :on-error="up_file_error"
            ref="up_file"
            name="upload">
            <div class="up_icon_wrap"><div class="up_icon up_file_icon" title="上传文件"></div></div>
        </Upload>
        <Upload
            class="upload_wrap upload_wrap_img"
            :action="imgUrl + '/file/upload'"
            :with-credentials="true"
            :data="up_param"
            :show-upload-list="true"
            :on-success="up_img_success"
            :on-error="up_img_error"
            :format="['jpg','jpeg','png']"
            ref="up_img"
            name="upload">
            <div class="up_icon_wrap"><div class="up_icon up_img_icon" title="上传图片"></div></div>
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
            imgUrl,
            clientHeight: 950/*document.documentElement.clientHeight || document.body.clientHeight*/,
            ue: null, // 编辑器实例
        }
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        needAutoSave: {
            /* 新建时和编辑草稿时不需要自动保存 */
            type: Boolean
        }
    },
    computed: {
        /* 文件上传额外参数 */
        up_param() {
            return {
                about_id: Number(window.localStorage.post_id) || -1,
                about_type: 'posts'
            }
        }
    },
    watch: {
        /*clientHeight(newVal) {
            if (this.ue) {
                this.ue.setHeight(newVal - 400 - 75);
            }
        }*/
    },
    mounted() {

        let _this = this;

        /* 创建编辑器实例 */
        UE.delEditor('editor');
        this.ue = UE.getEditor('editor', {
            BaseUrl: '',
            UEDITOR_HOME_URL: '/static/uedit/',
            initialFrameHeight: _this.clientHeight - 400,  // 初始化编辑器高度
            autoHeightEnabled: true,
            imageScaleEnabled:true,
        });

        /* 写入内容 */
        this.ue.addListener( 'ready', function( editor ) {

            _this.$nextTick(() => {
                let lc_data = _this.ue.execCommand('getlocaldata');
                if(_this.needAutoSave && lc_data && _this.content != lc_data){
                    _this.$Modal.confirm({
                        title: '确认对话框',
                        content: '之前有内容未提交，需要恢复吗？',
                        onOk: () => {
                            _this.ue.setContent(lc_data);
                        },
                        onCancel: () => {
                            _this.ue.setContent(_this.content);
                        }
                    });
                }else {
                    _this.ue.setContent(_this.content);
                }
                _this.ue.focus(true); // 焦点在尾部
            });

        } );


    },
    beforeDestroy() {
        /* 摧毁编辑器实例 */
        UE.getEditor('editor').destroy();
    },
    methods: {
        getlocaldata() {
            this.ue.execCommand('getlocaldata'); // 获取本地保存
        },
        clearlocaldata() {
            this.ue.execCommand('clearlocaldata'); // 清除localstorage
        },
        get_content() {
            return this.ue.getContent();
        },
        get_content_text() {
            return this.ue.getContentTxt();
        },
        up_file_success(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {
                this.$Message.success('文件上传成功！');
                this.$refs.up_file.clearFiles();
                /* 在编辑器中插入元素 */
                let el = '<a href="#" target="_blank" class="ueditor_file" style="text-decoration: none; color: #235895" data_hash="'+ response.hash +'" "data_name="'+ file.name +'>'+ file.name +'</a>';
                this.ue.execCommand('inserthtml',el);
                window.localStorage.post_hash = window.localStorage.post_hash? (window.localStorage.post_hash  + ',' + response.hash): (response.hash);
            }
        },
        up_file_error() {
            this.$Message.error('文件上传失败，请重试！');
            this.$refs.up_file.clearFiles();
        },
        up_img_success(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {
                this.$Message.success('图片上传成功！');
                this.$refs.up_img.clearFiles();
                /* 在编辑器中插入元素（img预览） */
                let src = imgUrl + '/file/preview/' + response.hash + '/img';
                let el = '<img src="'+ src +'" class="ueditor_img" style="max-width: 850px;" /><p></p>';
                this.ue.execCommand('inserthtml',el);
                window.localStorage.post_hash = window.localStorage.post_hash? (window.localStorage.post_hash + ',' + response.hash): (response.hash);
            }
        },
        up_img_error() {
            this.$Message.error('图片上传失败，请重试！');
            this.$refs.up_img.clearFiles();
        },
    }
}
</script>