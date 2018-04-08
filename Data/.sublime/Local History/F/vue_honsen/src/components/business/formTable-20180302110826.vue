<style lang="stylus" scoped>
.form_table
    box-sizing border-box
    padding 5px
    width 100%
    background #fff
    .numbeript
        width: 56px
        margin: -3px 8px 0 0
    table
        margin-top 10px
        width 100%
        border-collapse collapse
        &.drag_cursor
            cursor col-resize
    tr
        border-collapse collapse
    td
        box-sizing border-box
        padding 5px
        min-width 100px
        height 40px
        border 1px solid #ccc
        text-align center
        word-break: break-word
    .th
        height 38px
        background #edf1f3
        font-weight bold
    .save_btn
        margin-top: 15px
        text-align center
</style>

<template>
    <div class="form_table">
        <div class="set_table" v-if="editable">
            <InputNumber v-model="curRowsLen" :max="20" :min="2" class="numbeript"></InputNumber>行　
            <InputNumber v-model="curColsLen" :max="10" :min="1" class="numbeript"></InputNumber>列　
            <Button @click="setFormRowCol" title="确定设置为选择的行列" type="info" class="gray_btn" style="vertical-align: initial;">确定</Button>
        </div>
        <div v-scrollUnique style="max-height: 600px; overflow: auto; padding-right: 10px">
            <table
                v-if="datas.length"
                ref="table"
                :class="{drag_cursor: dragLine}"
                @paste.prevent="paste($event)"
                @contextmenu.prevent="fnMenu($event)"
                @mousemove="fnMove($event)"
                @mousedown="fnDown($event)"
                @mouseup="fnUp($event)">
                <tr :data-y="index" v-for="(tr,index) in datas" :key="index">
                    <td
                        contenteditable="true"
                        v-for="(td, i) in tr"
                        :key="index + i"
                        :class="{th: index == 0}"
                        :style="{width: td.width || 'auto'}"
                        :data-n="i"
                        v-html="td.title"
                        @blur="blur($event)">
                    </td>
                </tr>

                <tr v-if="datas.length <= 1">
                    <td id="noData" :colspan="datas[0].length">暂无数据</td>
                </tr>
            </table>
        </div>

        <contextMenu ref="td_contextmenu">
            <div class="contextMenu_item" v-if="!isTh" @click="addRow(true)">前加一行</div>
            <div class="contextMenu_item" @click="addRow(false)">后加一行</div>
            <div class="contextMenu_item" @click="addCol(true)">前加一列</div>
            <div class="contextMenu_item" @click="addCol(false)">后加一列</div>
            <div class="contextMenu_item" v-if="!isTh" @click="delRow">删除该行</div>
            <div class="contextMenu_item" @click="delCol">删除该列</div>
        </contextMenu>

        <div class="save_btn" v-if="editable">
            <Button type="info" @click="saveData">保存</Button>
        </div>
    </div>
</template>

<script>
import contextMenu from '@/components/common/contextMenu';
/*
    "[
        [{"title":"asd"},{"title":"asd"},{"title":"asdasd"}], // th
        [{"title":"asd"},{"title":"asd"},{"title":"sdasd"}] // td
    ]"

*/
export default {
    name: 'formTable',
    components: {contextMenu},
    props: {
        data: {
            type: [String, Array]
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            curRowsLen: 2,
            curColsLen: 3,
            datas: [],
            dragLine: null, // 要拖动的线(0和最后一根不能拖动)
            tds: null,
            isDown: false,
            startX: 0,
            startW1: 0,
            startW2: 0,
            isTh: false,
            col: 0, // td位置
            row: 0, // tr位置
        }
    },
    created() {
        let arr;
        if (Array.isArray(this.data)) {
            arr = JSON.parse(JSON.stringify(this.data));
        } else {
            try {
                arr = JSON.parse(this.data)
            } catch (error) {
                arr = [];
            }
        }

        // 默认2行3列
        let initArr = [];
        for (let i = 0; i < this.curRowsLen; i++) {
            initArr.push([]);
            for (let j = 0; j < this.curColsLen; j++) {
                initArr[i].push({'title': ''});
            }
        }

        this.datas = arr.length? arr: initArr;

        this.curRowsLen = this.datas.length;
        this.curColsLen = this.datas[0].length;
    },
    mounted() {
        this.getTds();
    },
    methods: {
        setFormRowCol() {
            // row
            if (this.datas.length >= this.curRowsLen) {
                this.datas.splice(this.curRowsLen, this.datas.length - this.curRowsLen);
            } else {
                while (this.datas.length < this.curRowsLen) {
                    let arr = [];
                    this.datas[0].forEach(col => {
                        arr.push({'title': ''});
                    });

                    this.datas.push(arr);
                }
            }
            // col
            this.datas.forEach(row => {
                if (row.length >= this.curColsLen) {
                    row.splice(this.curColsLen, row.length - this.curColsLen);
                } else {
                    while (row.length < this.curColsLen) {
                        row.push({'title': ''});
                    }
                }
            });
        },
        getTds() {
            this.tds = Array.from(this.$refs.table.children[0].children);
        },

        fnMove(e){
            this.getTds();

            if (this.isDown) { // 按下鼠标拖动
                if (this.dragLine) { // 在拖动区

                    let diffx = e.clientX - this.startX;
                    let min = 100;

                    if (this.startW1 + diffx > min && this.startW2 - diffx > min) {
                        this.tds[this.dragLine - 1].style.width = this.startW1 + diffx + 'px';
                        this.tds[this.dragLine].style.width = this.startW2 - diffx + 'px';
                    }

                } else {
                    // console.log('不在拖动区');
                }

            } else { // 没按鼠标识别可拖动区

                // td线的左右5px为可拖动区
                let num = 5;
                let eX = e.offsetX;
                let tdW = e.target.offsetWidth;
                let data_n = parseInt(e.target.getAttribute('data-n'));

                if (eX < num) {
                    this.dragLine = data_n;
                } else if(eX > tdW - 5) {
                    this.dragLine = data_n + 1;
                }else {
                    this.dragLine = null;
                }

                if (this.dragLine == 0 || this.dragLine == this.tds.length) {
                    this.dragLine = null;
                }

            }

        },
        fnDown(e){
            this.getTds();

            this.isDown = true;

            if (this.dragLine) {
                this.startW1 = this.tds[this.dragLine - 1].offsetWidth;
                this.startW2 = this.tds[this.dragLine].offsetWidth;
            }

            this.startX = e.clientX;
        },
        fnUp() {
            this.isDown = false;
        },
        fnMenu(e) {
            this.$refs.td_contextmenu.hide();
            this.$nextTick(() => {
                // 识别th
                let td_class = e.target.getAttribute('class');
                if (td_class && td_class.indexOf('th') != -1) {
                    this.isTh = true;
                } else {
                    this.isTh = false;
                }

                this.col = parseInt(e.target.getAttribute('data-n'));
                this.row = parseInt(e.target.parentNode.getAttribute('data-y'));

                this.$refs.td_contextmenu.show(e);
            });
        },
        delRow() {
            this.datas.splice(this.row, 1);
            this.curRowsLen += -1;
            this.$refs.td_contextmenu.hide();
        },
        delCol() {
            this.datas.forEach(r => {
                r.splice(this.col, 1);
            });
            this.curColsLen += -1;
            this.$refs.td_contextmenu.hide();
        },
        addRow(isBefor) {
            if (this.curRowsLen == 20) {
                return;
            }

            let _row = [];
            for (let i = 0; i < this.datas[0].length; i++) {
                _row.push({'title': ''});
            }

            isBefor? this.datas.splice(this.row, 0, _row): this.datas.splice(this.row + 1, 0, _row);

            this.curRowsLen += 1;

            this.$refs.td_contextmenu.hide();
        },
        addCol(isBefor){
            if (this.curColsLen == 10) {
                return;
            }

            this.datas.forEach(row => {
                isBefor? row.splice(this.col, 0 , {'title': ''}): row.splice(this.col + 1, 0 , {'title': ''});

            });

            this.curColsLen += 1;

            this.$refs.td_contextmenu.hide();

        },
        paste(e) {
            // 去标签
            e.preventDefault();

            let text = null;
            let textRange = null;

            if(window.clipboardData && clipboardData.setData) {
                // IE在window对象上
                text = window.clipboardData.getData('text');
            } else {
                text = e.clipboardData.getData('text/plain') || prompt('在这里输入文本');
            }
            if (document.body.createTextRange) {
                // ie
                if (document.selection) { // ie8以下
                    textRange = document.selection.createRange();
                } else if (window.getSelection) { // ie9+
                    sel = window.getSelection();  // 表示用户选择的文本范围或光标的当前位置
                    var range = sel.getRangeAt(0);

                    // 创建临时元素，使得TextRange可以移动到正确的位置
                    var tempEl = document.createElement("span");
                    tempEl.innerHTML = "&#FEFF;";
                    range.deleteContents();
                    range.insertNode(tempEl);
                    textRange = document.body.createTextRange();
                    textRange.moveToElementText(tempEl);
                    tempEl.parentNode.removeChild(tempEl);
                }
                textRange.text = text;
                textRange.collapse(false);
                textRange.select();
            } else {
                // Chrome之类浏览器
                document.execCommand("insertText", false, text);
            }

            // e.target.innerHTML += e.clipboardData.getData('text');  // 太粗暴了
        },
        blur(e) {

            let text = e.target.innerHTML.toString();
            let _row = parseInt(e.target.parentNode.getAttribute('data-y'));
            let _col = parseInt(e.target.getAttribute('data-n'));

            this.datas[_row][_col].title = text;

        },
        // 储存宽度
        setWidth() {
            this.getTds();
            // 默认平均宽
            let ave = 1/this.tds.length * 100 + '%';
            let trW = this.$refs.table.children[0].offsetWidth;

            // 只需设置th的宽
            Array.from(this.$refs.table.children[0].children).forEach((td, td_i) => {
                let val;
                if (td.offsetWidth) {
                    val = td.offsetWidth / trW * 100 + '%';
                } else {
                    val = ave;
                }

                if (td.id != 'noData') {
                    this.$set(this.datas[0][td_i], 'width', val);
                }
            });


        },
        saveData() {
            this.setWidth();
            this.$emit('data', JSON.stringify(this.datas));
        },
        exportData() {
            return JSON.stringify(this.datas);
        },
        // 导出为模板
        exportTemp() {
            this.setWidth();

            let _arr = [];
            this.datas[0].forEach(() => {
                _arr.push({'title': ''});
            });

            let arr = [];
            arr.push(this.datas[0]);
            arr.push(_arr);

            return JSON.stringify(arr);
        }
    },
}
</script>