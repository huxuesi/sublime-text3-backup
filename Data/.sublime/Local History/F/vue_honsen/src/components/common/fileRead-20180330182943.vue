<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.file_read
    position relative
    padding-right 50px
    font-size 12px
    line-height: 30px
    &:hover
        .down_icon,.del_icon
            display block
    .fileItem_a
        display inline-block
        max-width 125px
        color: #7d7d7d
        &:hover
            color: #76b9e6
    .down_icon
        display block
        position absolute
        top 8px
        right 30px
        bgImg(12px,13px,'/static/icon/0027.png')
        cursor pointer
    .del_icon
        display block
        position absolute
        top 7px
        right 10px
        bgImg(15px,15px,'/static/icon/0020_.png')
        cursor pointer
</style>

<template>
    <div class="file_read" v-if="fileObj">
        <a class="fileItem_a single_ellipsis" target="_blank" :href="previewFref" :title="fileObj.name">{{fileObj.name}}</a>
        <a v-if="needDown" class="down_icon" target="_blank" :href="downFref"></a>
        <div v-if="needDel" class="del_icon" @click="del_flie"></div>
    </div>
</template>

<script>
export default {
    name: 'fileRead',
    props: {
        file: {
            type: Object,
            default() {
                return null;
            }
        },
        needDown: {
            type: Boolean,
            default: true
        },
        needDel: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            fileObj: null,
        }
    },
    computed: {
        previewFref() {
            if(this.file.hash){
                let type = ['doc','ppt','xls','docx','pptx','xlsx'];
                if(this.fileObj && type.indexOf(this.fileObj.extension) != -1){
                    return `${imgUrl}/file/preview/${this.file.hash}`;
                }else {
                    return `${imgUrl}/file/download/${this.file.hash}`;
                }
            }else {
                return this.fileObj && ('//office.honsenflag.com/op/view.aspx?src='+this.fileObj.url);
            }
        },
        downFref() {
            if(this.file.hash){
                return `${imgUrl}/file/download/${this.file.hash}`;
            }else {
                return this.fileObj && this.fileObj.url;
            }
        }
    },
    watch: {
        /* 业务切换节点时组件没有重新渲染 */
        file: function (newval,old) {
            if(newval.hash){
                this.getFileInfo();
            }else{
                this.fileObj = Object.assign({name: newval.fileName},newval);
            }
        }
    },
    mounted() {
        if(this.file.hash){
            this.getFileInfo();
        }else{
            this.fileObj = Object.assign({name: this.file.fileName},this.file);
        }
    },
    methods: {
        getFileInfo() {
            let URL = `/file/info/${this.file.hash}`;
            this.$http.get(URL).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.fileObj = data.data;
                }else {
                    console.log(data.errmsg);
                }
            },() => {
                // 请求失败回调
                console.log('文件信息数据请求失败！');
            })
        },
        del_flie() {
            this.$emit('del-file');
        }
    },
}
</script>