<style lang="stylus">
.z-fileUpload
    display: inline-block
    width: 100%
    height: 100%
    position: relative
    .fileupload
        .ivu-upload
            .ivu-btn
                padding: 5px 12px
                height: 32px
            .ivu-btn[disabled]
                color: #fff
                background-color: #3dc1ff
                border-color: #3dc1ff
            .ivu-btn-loading
                pointer-events: auto
    .uoloadcoverbg
        position: absolute
        top: 0
        width: 100%
        height: 100%
</style>

<template>
    <div class="z-fileUpload">
        <Upload
            :action="`${imgUrl}/file/upload`"
            :with-credentials="true"
            :data="params"
            :show-upload-list="false"
            :before-upload="fileUpBefore"
            :on-success="fileUpSuccess"
            :on-error="fileUpError"
            ref="sendbizfile"
            name="upload"
            class="fileupload">
            <slot name="icon"></slot>
        </Upload>
        <div v-if="fileUploading" class="uoloadcoverbg">
            <Spin fix>
                <Icon type="load-a" size="18" class="spin-icon-load"></Icon>
            </Spin>
        </div>
    </div>
</template>

<script>
export default {
    name: 'z-fileUpload',
    data () {
        return {
            imgUrl,
            sendoutparams: {},
            fileUploading: false,
            imgwidth: 'auto',
            imgheight: 'auto'
        }
    },
    props: {
        filelist: {
            type: Array,
            default: function () {
                return []
            }
        },
        params: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    methods: {
        fileUpBefore(file) {
            this.sendoutparams = this.params;
            this.fileUploading = true;

            //读取图片数据
            let _this = this
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = e.target.result;
                //加载图片获取图片真实宽度和高度
                let image = new Image();
                image.onload = function(){
                     _this.imgwidth = image.width;
                     _this.imgheight = image.height;
                }
                image.src = data;
            };
            reader.readAsDataURL(file);
        },
        fileUpSuccess(response, file, fileList) {
            this.fileUploading = false;
            let newfile = {
                name: file.name,
                hash: response.hash
            };
            this.filelist.push(newfile);
            this.sendoutparams.imgwidth = this.imgwidth;
            this.sendoutparams.imgheight = this.imgheight;
            this.$emit('fileUpSuccess', response, file, fileList, this.sendoutparams);
        },
        fileUpError(error, file, fileList) {
            this.fileUploading = false;
            this.$emit('fileUpError', error, file, fileList, this.sendoutparams);
        }
    },
}
</script>
