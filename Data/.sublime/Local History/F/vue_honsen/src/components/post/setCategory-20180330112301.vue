<style lang="stylus">
.setCategory_modal .ivu-modal-body
    .create
        margin 15px 0 0 20px
        width 70px
        font-size 14px
        color #3dc1ff
        cursor pointer
        .ivu-input
            border-radius 16px
    .category
        margin-top 5px
        width: 100%
        .item
            float: left
            margin: 10px 18px
            width 85px
            height 30px
            line-height 30px
            text-align center
            background-color: #fff
            cursor: pointer
            &.is_selected
                background-color: #3dc1ff
                color: #fff
                border: 1px solid transparent
        .item_input
            .ivu-input
                border-radius: 17px
        .item_pop
            border-radius: 17px
            border: 1px solid #ccc
</style>

<template>
    <div class="setCategory">
        <Modal
            v-model="setCategoryModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="setCategory_modal"> 
            <div class="modal_tit">修改分类</div>
            <Input v-if="createInput" class="create" ref="inputEl" v-model.trim="createModel" @on-blur="create" @on-keyup.enter="create"></Input>
            <div v-else class="create"  @click.stop="toCreate">创建分类+</div>
            <transition-group name="grouplist" tag="div" class="category clearfix">
                <div v-for="(category,index) in categorys"
                        class="list"
                        :key="index"
                        @click.stop="selectCid(category)">
                    <Input 
                        v-if="category.is_editing" 
                        class="item item_input" 
                        :ref="'item_input_'+category.cid" 
                        type="text" 
                        v-model="category.editname" 
                        @on-blur="editCategory(category)">
                    </Input>

                    <div 
                        v-else
                        :title="category.cid == 0? '':'右键编辑'"
                        class="item item_pop single_ellipsis"
                        :class="{is_selected: category.is_selected}"
                        @contextmenu.prevent="toHandleCategory($event,category)">
                        {{category.name}}
                    </div>

                </div>
            </transition-group>
            <div slot="footer">
                <Button type="primary" style="margin-right: 15px" @click="submitCategory">确 定</Button>
                <Button class="gray_btn" type="primary" @click="close">取 消</Button>
            </div>
        </Modal>

        <contextMenu ref="contextmenu">
            <div class="contextMenu_item" @click.stop="toEditCategory">编辑</div>
            <div class="contextMenu_item" @click.stop="delCategory">删除</div>
        </contextMenu>
    </div>
</template>

<script>
import contextMenu from '@/components/common/contextMenu';
export default {
    name: 'setCategory',
    components: {contextMenu},
    data() {
        return {
            setCategoryModal: true,
            initCategorys: [],
            categorys: [],
            createInput: false,
            createModel: '',
            curCategory: null
        }
    },
    props: {
        /* 传入知识已在的分类 格式：[cid1,cid2...]  */
        selectedCategorys: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    mounted() {
        this.getCategorys();
    },
    methods: {
        toHandleCategory(e, category) {
            if (category.cid == 0) {
                return;
            }
            this.curCategory = category;
            this.$refs.contextmenu.show(e);
        },
        toEditCategory() {
            this.$refs.contextmenu.hide();
            this.curCategory.is_editing = true;
            this.$nextTick(() => {
                this.$refs[`item_input_${this.curCategory.cid}`][0].focus();
            });
        },
        editCategory() {
            this.curCategory.is_editing = false;
            if( this.curCategory.editname == this.curCategory.name ){
                return false;
            }

            this.$ajax('post', '/postcategory/update', {cid: this.curCategory.cid, name: this.curCategory.editname}, (data) => {
                this.curCategory.name = this.curCategory.editname;
                this.$Message.success('编辑分类成功！');
            });
        },
        delCategory() {
            this.$refs.contextmenu.hide();
            this.$nextTick(() => {
                this.$Modal.confirm({
                    title: '确认对话框',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.$ajax('post', '/postcategory/del', {cid: this.curCategory.cid}, (data) => {
                            this.categorys = this.categorys.filter(val => val.cid != this.curCategory.cid);
                            this.$Message.success('删除分类成功！');
                        });
                    }
                });
            });
        },
        toCreate() {
            this.createInput = true; 
            this.$nextTick(() => {
                this.$refs.inputEl.focus();
            });
        },
        create() {
            if (!this.createModel) {
                this.createInput = false;
                this.$Message.warning('分类名称不能为空！');
                return;
            }

            this.$ajax('post', '/postcategory/add', {name: this.createModel}, (data) => {
                let obj = {
                    cid: data.cid,
                    name: this.createModel,
                    is_editing: false,
                    is_selected: false,
                    editname: this.createModel,
                    num: 0
                };
                this.categorys.splice(this.categorys.length-1, 0, obj);

                this.createModel = '';
                this.createInput = false;
                this.$Message.success('创建分类成功！');
            });
        },
        selectCid(category) {
            // 未分类
            if (category.cid == 0 && !category.is_selected && this.categorys.filter(val => val.is_selected).length) {
                this.$Message.warning( '已经分类的知识不能再移入 未分类' );
                return;
            }
            // 其他分类
            if (category.cid != 0 && this.categorys[this.categorys.length - 1].is_selected) {
                this.categorys[this.categorys.length - 1].is_selected = false;
            }

            category.is_selected = !category.is_selected;
        },
        submitCategory() {
            let cids = this.categorys.concat().filter(val => val.is_selected).map(val => val.cid);
            let categorysHaveChange = !!(this.initCategorys.length != this.categorys.length);

            this.$emit('selected-category', cids);
            this.$emit('categorysHaveChange', categorysHaveChange);
        },
        close() {
            this.$emit('close','setCategoryok or setCategoryerror');

            let categorysHaveChange = !!(this.initCategorys.length != this.categorys.length);
            this.$emit('categorysHaveChange', categorysHaveChange);
        },
        getCategorys() {
            this.$ajax('get', '/postcategory/list', {type: 'menu'}, (data) => {
                // 排除未分类项
                // data.data.pop();

                this.categorys = data.data.map(val => {
                    val.is_editing = false;
                    val.editname = val.name;
                    
                    // 初始化已有分类
                    val.is_selected = this.selectedCategorys.includes(val.cid);
                    if (!this.selectedCategorys.length && val.cid == 0) {
                        val.is_selected = true;
                    }

                    return val;
                });

                this.initCategorys = [...this.categorys];
            });
        },
    }
}
</script>