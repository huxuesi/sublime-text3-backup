<style lang="stylus" scoped>
.vue-image-crop-upload
    .tips
        margin-bottom: 20px
        background-color: #f4fbff
        color #f00
        font-size 12px
        height: 34px
        line-height: 34px
        text-align: center

    .file_click
        .file_input
            position: relative
            box-sizing: border-box
            width: 150px
            height: 150px
            line-height: 150px
            text-align: center
            .input_img_up
                position: absolute
                top: 30px
                left: 30px
                width: 85px
                height: 80px
                opacity: 0
            .showedAvatar
                position: absolute
                top: 0px
                left: 0px
        .upAvatarBtn
            width 195px
            margin-top: 15px
            // text-align: center
            .select_btn
                margin-left 26px
            .desc
                margin-top 5px
                margin-left -18px
                width 180px
                font-size 12px
                color #bbb

    .vicp-preview
        height: 195px
        overflow: hidden
        .vicp-preview-item
            float: right
            position: relative
            margin-left 12px
            width: 100px
            height: 100px
            span
                position: absolute
                bottom: -25px
                width: 100%
                font-size: 12px
                color: #bbb
                display: block
                text-align: center
            img
                position: absolute
                display: block
                top: 0
                bottom: 0
                left: 0
                right: 0
                margin: auto
                background-color: #fff
                border: 1px solid rgba(0, 0, 0, 0.15)
                overflow: hidden
                -webkit-user-select: none
                -moz-user-select: none
                -ms-user-select: none
                user-select: none
                border-radius: 100%
        .vicp-preview-item-40
            margin-top: 10px
            height: 40px
        .vicp-preview-item-150
            float left
            width: 150px
            height: 150px
            img
                border-radius: 0

    .vicp-crop-left
        display: inline-block
        vertical-align: top
        .vicp-img-container
            position: relative
            display: block
            width: 200px
            height: 150px
            background-color: #e5e5e0
            overflow: hidden
            .vicp-img
                position: absolute
                display: block
                cursor: move
                -webkit-user-select: none
                -moz-user-select: none
                -ms-user-select: none
                user-select: none
            .vicp-img-shade
                position: absolute
                -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                background-color: rgba(241, 242, 243, 0.8)
                &.vicp-img-shade-1
                    top: 0
                    left: 0
                &.vicp-img-shade-2
                    top: 0
                    right: 0
        .vicp-range
            position: relative
            margin: 20px 0 0 10px
            width: 170px
            height: 18px
            .vicp-icon5,.vicp-icon6
                position: absolute
                top: -2px
                width: 18px
                height: 18px
                border-radius: 100%
                background-color: rgba(0, 0, 0, 0.08)
                &:hover
                    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    cursor: pointer
                    background-color: rgb(61, 193, 255)
            .vicp-icon5
                left: -10px
                &:before
                    position: absolute
                    content: ''
                    display: block
                    left: 3px
                    top: 8px
                    width: 12px
                    height: 2px
                    background-color: #fff
            .vicp-icon6
                right: -20px
                &:before
                    position: absolute
                    content: ''
                    display: block
                    left: 3px
                    top: 8px
                    width: 12px
                    height: 2px
                    background-color: #fff
                &:after
                    position: absolute
                    content: ''
                    display: block
                    top: 3px
                    left: 8px
                    width: 2px
                    height: 12px
                    background-color: #fff
            input[type=range]
                display: block
                padding-top: 5px
                margin: 0 0 0 10px
                width: 160px
                height: 8px
                vertical-align: top
                background: transparent
                -webkit-appearance: none
                -moz-appearance: none
                appearance: none
                cursor: pointer
                &:focus
                    outline: none
                &::-webkit-slider-thumb
                    -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                    -webkit-appearance: none
                    appearance: none
                    margin-top: -3px
                    width: 12px
                    height: 12px
                    background-color: #3dc1ff
                    border-radius: 100%
                    border: none
                    -webkit-transition: 0.2s
                    transition: 0.2s
                &::-moz-range-thumb
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                    -moz-appearance: none
                    appearance: none
                    width: 12px
                    height: 12px
                    background-color: #3dc1ff
                    border-radius: 100%
                    border: none
                    -webkit-transition: 0.2s
                    transition: 0.2s
                &::-ms-thumb
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18)
                    appearance: none
                    width: 12px
                    height: 12px
                    background-color: #3dc1ff
                    border: none
                    border-radius: 100%
                    -webkit-transition: 0.2s
                    transition: 0.2s
                &:active::-moz-range-thumb 
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23)
                    width: 14px
                    height: 14px 
                &:active::-ms-thumb 
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23)
                    width: 14px
                    height: 14px 
                &:active::-webkit-slider-thumb 
                    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23)
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23)
                    margin-top: -4px
                    width: 14px
                    height: 14px 
                &::-webkit-slider-runnable-track
                    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    width: 100%
                    height: 6px
                    cursor: pointer
                    border-radius: 2px
                    border: none
                    background-color: rgba(0,0,0,0.1) 
                &::-moz-range-track 
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    width: 100%
                    height: 6px
                    cursor: pointer
                    border-radius: 2px
                    border: none
                    background-color: rgba(0,0,0,0.1) 
                &::-ms-track 
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12)
                    width: 100%
                    cursor: pointer
                    background: transparent
                    border-color: transparent
                    color: transparent
                    height: 6px
                    border-radius: 2px
                    border: none 
                &::-ms-fill-lower 
                    background-color: rgba(0,0,0,0.1) 
                &::-ms-fill-upper 
                    background-color: rgba(0,0,0,0.15) 
                &:focus::-webkit-slider-runnable-track 
                    background-color: rgba(0,0,0,0.1) 
                &:focus::-moz-range-track 
                    background-color: rgba(0,0,0,0.1) 
                &:focus::-ms-fill-lower 
                    background-color: rgba(0,0,0,0.15) 
                &:focus::-ms-fill-upper 
                    background-color: rgba(0,0,0,0.15) 
</style>

<template>
<Row class="vue-image-crop-upload">
    <p class="tips" v-if="!isSupported">{{lang.noSupported}}</p>
    <p class="tips" v-show="hasError">{{errorMsg}}</p>
    <!-- <p class="tips" v-show="loading === 1">{{lang.loading}}</p> -->
    <!-- <p class="tips" v-show="loading === 2">{{lang.success}}</p> -->
    <Col span="6" class="file_click">
        <div 
            v-show="step == 1" 
            class="file_input"
            @dragleave="preventDefault" 
            @dragover="preventDefault" 
            @dragenter="preventDefault" 
            @click="handleClick" 
            @drop.prevent="handleChange">
            <input v-show="0" class="input_img_up" type="file" @change="handleChange" ref="fileinput">
            <img class="showedAvatar" :src="showAvatarUrl" width="150" height="150">
        </div>
        <!--图片剪切-->
        <template v-if="step == 2">
            <div class="vicp-crop-left" >
                <div class="vicp-img-container">
                    <img :src="sourceImgUrl" :style="sourceImgStyle" class="vicp-img" draggable="false"
                        @drag="preventDefault"
                        @dragstart="preventDefault"
                        @dragend="preventDefault"
                        @dragleave="preventDefault"
                        @dragover="preventDefault"
                        @dragenter="preventDefault"
                        @drop="preventDefault"
                        @touchstart="imgStartMove"
                        @touchmove="imgMove"
                        @touchend="createImg"
                        @touchcancel="createImg"
                        @mousedown="imgStartMove"
                        @mousemove="imgMove"
                        @mouseup="createImg"
                        @mouseout="createImg"
                        ref="img">
                    <div class="vicp-img-shade vicp-img-shade-1" :style="sourceImgShadeStyle"></div>
                    <div class="vicp-img-shade vicp-img-shade-2" :style="sourceImgShadeStyle"></div>
                </div>
                <div class="vicp-range">
                    <input type="range" :value="scale.range" step="1" min="0" max="100" @input="zoomChange">
                    <i @mousedown="startZoomSub" @mouseout="endZoomSub" @mouseup="endZoomSub" class="vicp-icon5"></i>
                    <i @mousedown="startZoomAdd" @mouseout="endZoomAdd" @mouseup="endZoomAdd" class="vicp-icon6"></i>
                </div>
            </div>
        </template>
        
        <div class="upAvatarBtn">
            <template v-if="showBtn">
                <Button class="select_btn" type="primary" @click.stop="handleClick">选择图片</Button>
                <p class="desc">只支持JPG、PNG,大小不超过5M</p>
            </template>
            <template v-if="showOkBtn">
                <Button size="small" type="primary" @click="upload" style="float: right">确定</Button>
                <Button size="small" type="primary" class="gray_btn" @click="cancel" style="float: right; margin-right: 10px">取消</Button>
                <Button size="small" @click.stop="handleClick" style="float: left">重新上传</Button>
            </template>
        </div>
    </Col>
    
    <!-- 预览 -->
    <Col span="16" offset="2" class="vicp-preview">
        <div class="vicp-preview-item vicp-preview-item-40" v-if="!noCircle">
            <img v-if="step ==1" :src="showAvatarUrl" width="40" height="40">
            <img v-else :src="createImgUrl" width="40" height="40">
            <span>{{ lang.preview.preview_40 }}</span>
        </div>
        <div class="vicp-preview-item">
            <img v-if="step ==1" :src="showAvatarUrl" width="100" height="100">
            <img v-else :src="createImgUrl" width="100" height="100">
            <span>{{ lang.preview.preview_100 }}</span>
        </div>
        <div class="vicp-preview-item vicp-preview-item-150">
            <img v-if="step ==1" :src="showAvatarUrl" width="150" height="150">
            <img v-else :src="createImgUrl" width="150" height="150">
            <span>{{ lang.preview.preview_150 }}</span>
        </div>
    </Col>

    <canvas v-show="false" :width="width" :height="height" ref="canvas"></canvas>
</Row>

</template>

<script>
'use strict';

const mimes = {
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'psd': 'image/photoshop'
    },
    // database64文件格式转换为2进制
    data2blob = function(data, mime) {
        // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
        data = data.split(',')[1];
        data = window.atob(data); // 解码一个已经被base64编码过的数据
        var ia = new Uint8Array(data.length);  // 8位无符号整型数组
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        };
        // canvas.toDataURL 返回的默认格式就是 image/png
        return new Blob([ia], {
            type: mime
        });
    };

export default {
    props: {
        showAvatarUrl: {
            type: String,
            'default': ''
        },
        // 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
        field: {
            type: String,
            'default': 'avatar'
        },
        // 原名key，类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
        ki: {
            'default': 0
        },
        // 显示该控件与否
        value: {
            'default': true
        },
        // 上传地址
        url: {
            type: String,
            'default': ''
        },
        // 其他要上传文件附带的数据，对象格式
        params: {
            type: Object,
            'default': null
        },
        //Add custom headers
        headers: {
            type: Object,
            'default': null
        },
        // 剪裁图片的宽
        width: {
            type: Number,
            default: 150
        },
        // 剪裁图片的高
        height: {
            type: Number,
            default: 150
        },
        // 不预览圆形图片
        noCircle: {
            type: Boolean,
            default: false
        },
        // 单文件大小限制
        maxSize: {
            type: Number,
            'default': 10240 / 2
        },
        // 语言类型
        langType: {
            type: String,
            'default': 'zh'
        },
        // 语言包
        langExt: {
            type: Object,
            'default': null
        },
        // 图片上传格式
        imgFormat: {
            type: String,
            'default': 'png'
        }
    },
    data() {
        let that = this,
            {
                imgFormat,
                langType,
                langExt,
                width,
                height
            } = that,
            isSupported = true,
            allowImgFormat = [
                'jpg',
                'png'
            ],
            langBag = {
                zh: {
                    hint: '点击，或拖动图片至此处',
                    loading: '正在上传……',
                    noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
                    success: '上传成功',
                    fail: '图片上传失败',
                    preview: {
                        preview_150: '150*150(px)',
                        preview_100: '100*100(px)',
                        preview_40: '40*40(px)'
                    },
                    btn: {
                        off: '取消',
                        close: '关闭',
                        back: '上一步',
                        save: '保存'
                    },
                    error: {
                        onlyImg: '仅限图片格式',
                        outOfSize: '单文件大小不能超过 ',
                        // lowestPx: '图片最低像素为（宽*高）：',
                        lowestPx: '图片像素（宽*高）过低可能会造成剪裁的效果不佳，建议图片像素不低于',
                    }
                },
                en: {
                    hint: 'Click, or drag the file here',
                    loading: 'Uploading……',
                    noSupported: 'Browser does not support, please use IE10+ or other browsers',
                    success: 'Upload success',
                    fail: 'Upload failed',
                    preview: 'Preview',
                    btn: {
                        off: 'Cancel',
                        close: 'Close',
                        back: 'Back',
                        save: 'Save'
                    },
                    error: {
                        onlyImg: 'Image only',
                        outOfSize: 'Image exceeds size limit: ',
                        lowestPx: 'The lowest pixel in the image: '
                    }
                }
            },
            tempImgFormat = allowImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat,
            lang = langBag[langType] ? langBag[langType] : lang['zh'],
            mime = mimes[tempImgFormat];
        // 规范图片格式
        that.imgFormat = tempImgFormat;

        if (langExt) {
            Object.assign(lang, langExt);
        }
        if (typeof FormData != 'function') {
            isSupported = false;
        }
        return {
            // 图片的mime
            mime,

            // 语言包
            lang,

            // 浏览器是否支持该控件
            isSupported,
            // 浏览器是否支持触屏事件
            isSupportTouch: document.hasOwnProperty("ontouchstart"),

            // 步骤
            step: 1, //1选择文件 2剪裁 3上传

            // 上传状态及进度
            loading: 0, //0未开始 1正在 2成功 3错误
            progress: 0,

            // 是否有错误及错误信息
            hasError: false,
            errorMsg: '',

            // 需求图宽高比
            ratio: width / height,

            // 原图地址、生成图片地址
            sourceImg: null,
            sourceImgUrl: '',
            createImgUrl: '',

            // 原图片拖动事件初始值
            sourceImgMouseDown: {
                on: false,
                mX: 0, //鼠标按下的坐标
                mY: 0,
                x: 0, //scale原图坐标
                y: 0
            },

            // 生成图片预览的容器大小
            previewContainer: {
                width: 100,
                height: 100
            },

            // 原图容器宽高
            sourceImgContainer: { // sic
                width: 200,
                height: 150
            },

            // 原图展示属性
            scale: {
                zoomAddOn: false, //按钮缩放事件开启
                zoomSubOn: false, //按钮缩放事件开启
                range: 1, //最大100
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                maxWidth: 0,
                maxHeight: 0,
                minWidth: 0, //最宽
                minHeight: 0,
                naturalWidth: 0, //原宽
                naturalHeight: 0
            },
            showOkBtn: false,
            showBtn: true,
            postParam: {
                sx: 0,
                sy: 0,
                wt: 150,
                ht: 150
            },
        }
    },
    computed: {
        // 原图样式
        sourceImgStyle() {
            let {
                    scale,
                    sourceImgMasking
                } = this,
                top = scale.y + sourceImgMasking.y + 'px',
                left = scale.x + sourceImgMasking.x + 'px';
            return {
                top,
                left,
                width: scale.width + 'px',
                height: scale.height + 'px'
            }
        },
        // 原图蒙版属性
        sourceImgMasking() {
            let {
                width,
                height,
                ratio,
                sourceImgContainer
            } = this,
            sic = sourceImgContainer,
                sicRatio = sic.width / sic.height, // 原图容器宽高比
                x = 0,
                y = 0,
                w = sic.width,
                h = sic.height,
                scale = 1;
            if (ratio < sicRatio) {
                scale = sic.height / height;
                w = sic.height * ratio;
                x = (sic.width - w) / 2;
            }
            if (ratio > sicRatio) {
                scale = sic.width / width;
                h = sic.width / ratio;
                y = (sic.height - h) / 2;
            }
            return {
                scale, // 蒙版相对需求宽高的缩放
                x,
                y,
                width: w,
                height: h
            };
        },
        // 原图遮罩样式
        sourceImgShadeStyle() {
            let {
                sourceImgMasking,
                sourceImgContainer
            } = this,
            sic = sourceImgContainer,
                sim = sourceImgMasking,
                w = sim.width == sic.width ? sim.width : (sic.width - sim.width) / 2,
                h = sim.height == sic.height ? sim.height : (sic.height - sim.height) / 2;
            return {
                width: w + 'px',
                height: h + 'px'
            };
        },
        previewStyle() {
            let {
                width,
                height,
                ratio,
                previewContainer
            } = this,
            pc = previewContainer,
                w = pc.width,
                h = pc.height,
                pcRatio = w / h;
            if (ratio < pcRatio) {
                w = pc.height * ratio;
            }
            if (ratio > pcRatio) {
                h = pc.width / ratio;
            }
            return {
                width: w + 'px',
                height: h + 'px'
            };
        }
    },
    watch: {
        value(newValue) {
            if (newValue) {
                this.reset();
            }
        }
    },
    methods: {
        cancel() {
            this.step = 1;
            this.showBtn = true; 
            this.showOkBtn = false;
        },
        // 关闭控件
        off() {
            let that = this;
            setTimeout(function() {
                that.$emit('input', false);
            }, 200);
        },
        // 设置步骤
        setStep(no) {
            let that = this;
            setTimeout(function() {
                that.step = no;
            }, 200);
        },

        /* 图片选择区域函数绑定
         ---------------------------------------------------------------*/
        preventDefault(e) {
            e.preventDefault();
            return false;
        },
        handleClick(e) {
            this.$refs.fileinput.value = null;
            if (this.loading !== 1) {
                if (e.target !== this.$refs.fileinput) {
                    e.preventDefault();
                    // document.activeElement返回文档中当前获得焦点的元素
                    if (document.activeElement !== this.$refs) {
                        this.$refs.fileinput.click();
                    }
                }
            }
        },
        handleChange(e) {
            // e.preventDefault();
            if (this.loading !== 1) {
                let files = e.target.files || e.dataTransfer.files;
                this.reset();
                if (this.checkFile(files[0])) {
                    this.setSourceImg(files[0]);
                }
            }
        },
        /* ---------------------------------------------------------------*/

        // 检测选择的文件是否合适
        checkFile(file) {
            let that = this,
                {
                    lang,
                    maxSize
                } = that;
            // 仅限图片
            if (file.type.indexOf('image') === -1) {
                that.hasError = true;
                that.errorMsg = lang.error.onlyImg;
                return false;
            }

            // 超出大小
            if (file.size / 1024 > maxSize) {
                that.hasError = true;
                that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
                return false;
            }
            return true;
        },
        // 重置控件
        reset() {
            let that = this;
            that.loading = 0;
            that.hasError = false;
            that.errorMsg = '';
            that.progress = 0;
        },
        // 设置图片源
        setSourceImg(file) {
            let that = this,
                fr = new FileReader();
            fr.onload = function(e) {
                that.sourceImgUrl = fr.result;
                that.startCrop();
            }
            fr.readAsDataURL(file);
        },
        // 剪裁前准备工作
        startCrop() {
            let that = this,
                {
                    width,
                    height,
                    ratio,
                    scale,
                    sourceImgUrl,
                    sourceImgMasking,
                    lang
                } = that,
                sim = sourceImgMasking,
                img = new Image();
            img.src = sourceImgUrl;
            img.onload = function() {
                let nWidth = img.naturalWidth,
                    nHeight = img.naturalHeight,
                    nRatio = nWidth / nHeight,
                    w = sim.width,
                    h = sim.height,
                    x = 0,
                    y = 0;
                // 图片像素不达标
                if (nWidth < width || nHeight < height) {
                    that.hasError = true;
                    that.errorMsg = lang.error.lowestPx + width + '*' + height;
                    // return false;
                }
                if (ratio > nRatio) {
                    h = w / nRatio;
                    y = (sim.height - h) / 2;
                }
                if (ratio < nRatio) {
                    w = h * nRatio;
                    x = (sim.width - w) / 2;
                }
                scale.range = 0;
                scale.x = x;
                scale.y = y;
                scale.width = w;
                scale.height = h;
                scale.minWidth = w;
                scale.minHeight = h;
                scale.maxWidth = nWidth * sim.scale;
                scale.maxHeight = nHeight * sim.scale;
                scale.naturalWidth = nWidth;
                scale.naturalHeight = nHeight;
                that.sourceImg = img;
                that.createImg();
                that.setStep(2);
            };
        },
        // 鼠标按下图片准备移动
        imgStartMove(e) {
            e.preventDefault();
            // 支持触摸事件，则鼠标事件无效
            if(this.isSupportTouch && !e.targetTouches){
                return false;
            }
            let et = e.targetTouches ? e.targetTouches[0] : e,
                {
                    sourceImgMouseDown,
                    scale
                } = this,
                simd = sourceImgMouseDown;
            simd.mX = et.screenX;
            simd.mY = et.screenY;
            simd.x = scale.x;
            simd.y = scale.y;
            simd.on = true;
        },
        // 鼠标按下状态下移动，图片移动
        imgMove(e) {
            e.preventDefault();
            // 支持触摸事件，则鼠标事件无效
            if(this.isSupportTouch && !e.targetTouches){
                return false;
            }
            let et = e.targetTouches ? e.targetTouches[0] : e,
                {
                    sourceImgMouseDown: {
                        on,
                        mX,
                        mY,
                        x,
                        y
                    },
                    scale,
                    sourceImgMasking
                } = this,
                sim = sourceImgMasking,
                nX = et.screenX,
                nY = et.screenY,
                dX = nX - mX,
                dY = nY - mY,
                rX = x + dX,
                rY = y + dY;
            if (!on) return;
            if (rX > 0) {
                rX = 0;
            }
            if (rY > 0) {
                rY = 0;
            }
            if (rX < sim.width - scale.width) {
                rX = sim.width - scale.width;
            }
            if (rY < sim.height - scale.height) {
                rY = sim.height - scale.height;
            }
            scale.x = rX;
            scale.y = rY;
        },
        // 按钮按下开始放大
        startZoomAdd(e) {
            let that = this,
                {
                    scale
                } = that;
            scale.zoomAddOn = true;

            function zoom() {
                if (scale.zoomAddOn) {
                    let range = scale.range >= 100 ? 100 : ++scale.range;
                    that.zoomImg(range);
                    setTimeout(function() {
                        zoom();
                    }, 60);
                }
            }
            zoom();
        },
        // 按钮松开或移开取消放大
        endZoomAdd(e) {
            this.scale.zoomAddOn = false;
        },
        // 按钮按下开始缩小
        startZoomSub(e) {
            let that = this,
                {
                    scale
                } = that;
            scale.zoomSubOn = true;

            function zoom() {
                if (scale.zoomSubOn) {
                    let range = scale.range <= 0 ? 0 : --scale.range;
                    that.zoomImg(range);
                    setTimeout(function() {
                        zoom();
                    }, 60);
                }
            }
            zoom();
        },
        // 按钮松开或移开取消缩小
        endZoomSub(e) {
            let {
                scale
            } = this;
            scale.zoomSubOn = false;
        },
        zoomChange(e) {
            this.zoomImg(e.target.value);
        },
        // 缩放原图
        zoomImg(newRange) {
            let that = this,
                {
                    sourceImgMasking,
                    sourceImgMouseDown,
                    scale
                } = this,
                {
                    maxWidth,
                    maxHeight,
                    minWidth,
                    minHeight,
                    width,
                    height,
                    x,
                    y,
                    range
                } = scale,
                sim = sourceImgMasking,
                // 蒙版宽高
                sWidth = sim.width,
                sHeight = sim.height,
                // 新宽高
                nWidth = maxWidth == minWidth?(minWidth + minWidth * newRange / 100) :(minWidth + (maxWidth - minWidth) * newRange / 100),
                nHeight = maxHeight == minHeight?(minHeight + minHeight * newRange / 100):(minHeight + (maxHeight - minHeight) * newRange / 100),
                // 新坐标（根据蒙版中心点缩放）
                nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x),
                nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y);
            // 判断新坐标是否超过蒙版限制
            if (nX > 0) {
                nX = 0;
            }
            if (nY > 0) {
                nY = 0;
            }
            if (nX < sWidth - nWidth) {
                nX = sWidth - nWidth;
            }
            if (nY < sHeight - nHeight) {
                nY = sHeight - nHeight;
            }

            // 赋值处理
            scale.x = nX;
            scale.y = nY;
            scale.width = nWidth;
            scale.height = nHeight;
            scale.range = newRange;
            setTimeout(function() {
                if (scale.range == newRange) {
                    that.createImg();
                }
            }, 300);
        },
        // 生成需求图片
        createImg(e) {
            let that = this,
                {
                    mime,
                    sourceImg,
                    scale: {
                        x,
                        y,
                        width,
                        height
                    },
                    sourceImgMasking: {
                        scale
                    }
                } = that,
                canvas = that.$refs.canvas,
                ctx = canvas.getContext('2d');
            if (e) {
                // 取消鼠标按下移动状态
                that.sourceImgMouseDown.on = false;
            }
            ctx.clearRect(0, 0, that.width, that.height);
            ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale);
            that.createImgUrl = canvas.toDataURL(mime);
            that.showBtn = false;
            that.showOkBtn = true;
        },
        // 上传图片
        upload() {
            let that = this,
                {
                    lang,
                    imgFormat,
                    mime,
                    url,
                    params,
                    headers,
                    field,
                    ki,
                    createImgUrl,
                    sourceImgUrl,
                    postParam
                } = this,
                fmData = new FormData(); // 实例化一个表单数据对象
            fmData.append(field, data2blob(createImgUrl, mime), field + '.' + imgFormat);

            // 添加其他参数
            if (typeof postParam == 'object' && postParam) {
                Object.keys(postParam).forEach((k) => {
                    fmData.append(k, postParam[k]);
                })
            }
            // 上传文件
            that.reset();
            that.loading = 1;

            const upload_tip = this.$Message.loading({
                content: '正在上传中...',
                duration: 0
            });
            that.setStep(3);
            this.$http.post(url,fmData).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    that.loading = 2;
                    this.$Message.success('头像上传成功！');
                    upload_tip();
                    // that.$emit('upload-success', createImgUrl);
                    that.$emit('upload-success', data);
                    that.showBtn = true;
                    that.showOkBtn = false;
                    that.setStep(1);
                    window.setTimeout(function(){
                        that.loading = 0;
                    },3000)
                }else {
                    that.loading = 3;
                    this.$Message.error('头像上传失败！');
                    upload_tip();
                    // that.hasError = true;
                    // that.errorMsg = lang.fail;
                    that.setStep(1);
                }
            }).catch(err => {
                that.loading = 3;
                this.$Message.error('请求服务器失败！');
                upload_tip();
                // that.hasError = true;
                // that.errorMsg = lang.fail;
                that.setStep(1);
                // 请求失败回调
                console.log('数据请求失败！');
            });
        }
    }
}
</script>

