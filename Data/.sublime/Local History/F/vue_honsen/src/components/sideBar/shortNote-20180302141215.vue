<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.short_note
    position relative
    color #404040
    .add_note
        position absolute
        top 10px
        left 185px
    .note_list
        height 467px
        overflow auto
        .note_item
            padding 20px
            height 105px
            cursor pointer
            border-bottom 1px solid #e3e3e3
            &:hover,&.active
                background-color #fff
            .note_item_tit
                width 100%
                font-size 16px
            .note_item_shortinfo
                margin-top 4px
                width 100%
                color #777
            .note_item_time
                margin-top 1px
                font-size 12px
                color #9d9d9d
    .note_content_read   
        padding 23px 55px
        .note_content_read_tit
            position relative
            .tit_text
                width 320px
                font-size 16px
            .tit_time
                margin-top 1px
                font-size 12px
                color #9d9d9d
            .close_icon
                position absolute
                top -12px
                right 0px
                font-size 26px
                color #b4c6d1
                cursor pointer
            .edit_icon
                position absolute
                top 0px
                right 30px
                bgImg(17px,18px,'/static/icon/0023.png')
                cursor pointer
        .note_content_read_main
            margin-top 15px
            height 340px
            overflow auto
            line-height 1.75
            color #777
            white-space pre-wrap
            word-break: break-word
        .ivu-form-item
            margin-bottom 16px
        .btn_wrap
            text-align center
</style>

<template>
    <div class="short_note">
        <sideBase ref="sideBase">
            <div slot="side">
                <Button class="add_note" type="info" @click="toCreateNote" :disabled="isCreate">创 建+</Button>
                <div v-if="notes.length" class="note_list">
                    <div 
                        class="note_item" 
                        :class="{active: currentNote && note.id == currentNote.id}" 
                        @click="clickNoteItem(note)"
                        v-for="(note, index) in notes"
                        :key="index">
                        <div class="note_item_tit single_ellipsis">{{note.title}}</div>
                        <div class="note_item_shortinfo single_ellipsis">{{note.content}}</div>
                        <div class="note_item_time">{{note.updated_at}}</div>
                    </div>
                </div>
                <div v-else style="margin-top: 10px;text-align: center">还没有创建的便签！</div>
            </div>
            <div v-if="currentNote" slot="main">
                <!-- 读 -->
                <div v-show="!isCreate && !isEditing" class="note_content_read">
                    <div class="note_content_read_tit">
                        <div class="tit_text single_ellipsis">{{currentNote.title}}</div>
                        <div class="tit_time">{{currentNote.updated_at}}</div>
                        <div class="close_icon" @click="del_note"><Icon type="trash-a"></Icon></div>
                        <div class="edit_icon" @click="toEditingNote"></div>
                    </div>
                    <div class="note_content_read_main">{{currentNote.content}}</div>
                </div>

                <!-- 写 -->
                <Form v-if="isCreate || isEditing" class="note_content_read" ref="note_form" :model="currentNote" :rules="formRules">
                    <FormItem prop="title">
                        <Input type="text" v-model="currentNote.title"></Input>
                    </FormItem>
                    <FormItem>
                        <Input type="textarea" :rows="13" v-model="currentNote.content"></Input>
                    </FormItem>
                    <FormItem class="btn_wrap">
                        <Button type="info" style="margin-right: 10px" @click="submit('note_form')">提 交</Button>
                        <Button v-if="!isCreate" type="info" class="gray_btn" @click="cancel">取 消</Button>
                    </FormItem>
                </Form>
            </div>
            <div v-else slot="main" style="margin-top: 100px;text-align: center">还没有创建的便签！</div>
        </sideBase>
    </div>
</template>

<script>
import sideBase from './sideBase';
import moment from 'moment';
export default {
    name: 'shortNote',
    components: {sideBase},
    data() {
        return {
            notes: [],
            isCreate: false,
            isEditing: false,
            currentNote: null,
            recordCurrentNote: null,
            formRules: {
                title: [{required: true, message: '请填写标题', trigger: 'change'}]
            }
        }
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        del_note() {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    let url = `shortnote/delete/${this.currentNote.id}`;
                    this.$http.post(url).then(response => {
                        let data = response.data;
                        if( data.retcode == RETCODE_OK ){
                            this.notes.forEach((val,index,arr) => {
                                if (val.id == this.currentNote.id) {
                                    /* 设置下一项或上一项为当前项 */
                                    let obj = null;
                                    if (arr.length == 1) {
                                        obj = null;
                                    } else if(index == arr.length - 1) {
                                        obj = Object.assign({}, arr[index - 1]);
                                    } else {
                                        obj = Object.assign({}, arr[index + 1]);
                                    }
                                    this.currentNote = obj;
                                    this.recordCurrentNote = obj;

                                    arr.splice(index,1);
                                    this.$Message.success('便签删除成功！');
                                }
                            });
                        }else{
                            this.$Message.error(response.data.errmsg);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
           
        },
        clickNoteItem(note) {
            this.isCreate = false;
            this.isEditing = false;
            this.currentNote = Object.assign({}, note);
            this.recordCurrentNote = Object.assign({}, note);
        },
        toCreateNote() {
            this.isCreate = true;
            this.currentNote = {
                title: "",
                content: "",
                updated_at: ""
            };
        },
        cancel() {
            this.isEditing = false;
            this.currentNote.title = this.recordCurrentNote.title;
            this.currentNote.content = this.recordCurrentNote.content;
        },
        toEditingNote() {
            this.isEditing = true;
        },
        getNotes() {
            this.$refs.sideBase.setSpin(true);
            let url = 'shortnote';
            this.$http.get(url).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.notes = data.data;
                    if (this.notes.length) {
                        this.currentNote = Object.assign({}, data.data[0]);
                        this.recordCurrentNote = Object.assign({}, data.data[0]);
                    }
                }else{
                    this.$Message.error(response.data.errmsg);
                }
                this.$refs.sideBase.setSpin(false);
            }).catch(err => {
                this.$refs.sideBase.setSpin(false);
                console.log(err);
            });
        },
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let url = this.isCreate?'shortnote' :`shortnote/${this.currentNote.id}`;
                    let param = {
                        title: this.currentNote.title,
                        contents: this.currentNote.content,
                    }
                    this.$http.post(url,param).then(response => {
                        let data = response.data;
                        if( data.retcode == RETCODE_OK ){
                            if (this.isCreate) {
                                this.$set(this.currentNote,'id',data.id);
                                this.$set(this.currentNote,'updated_at', moment().format('YYYY-MM-DD HH:mm:ss'));
                                this.recordCurrentNote = Object.assign({}, this.currentNote);
                                this.notes.unshift(Object.assign({}, this.currentNote));
                                this.isCreate = false;
                                this.$Message.success('创建便签成功！');
                            } else {
                                this.currentNote.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
                                this.recordCurrentNote = Object.assign({}, this.currentNote);
                                this.notes.forEach((val) => {
                                     if (val.id == this.currentNote.id) {
                                         val.title = this.currentNote.title;
                                         val.content = this.currentNote.content;
                                         val.updated_at = this.currentNote.updated_at;
                                     }
                                });
                                this.isEditing = false;
                                this.$Message.success('修改便签成功！');
                            }
                        }else{
                            this.$Message.error(response.data.errmsg);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
        }
    }
}
</script>