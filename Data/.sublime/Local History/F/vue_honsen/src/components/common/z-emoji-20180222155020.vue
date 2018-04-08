<style lang="stylus">
@import '../../../static/emoji/css/emoji-sprite.css'

.z-emoji {
    width: 380px;
    height: 186px;
    background: #fff;
    z-index: 10;
    padding: 10px;
    position: absolute
    left: 50%
    top: 75%
    .emojiclose {
        position: absolute;
        right: 4px
        top: 0px
        font-size: 22px
        cursor: pointer
    }
    .emoji-controller {
        height: 36px;
        overflow: hidden;
        margin-bottom: 0;
        li {
            float: left;
            width: 76px;
            font-size: 12px;
            line-height: 36px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active{
        color: #0689dd;
      }
      &.active::after{
        content: '';
        width: 100%;
        height: 2px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }
  .emoji-container {
    height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      padding: 5px;
      a {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out .2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<template>
    <div class="z-emoji floatpanel">
        <ul class="emoji-controller">
        <li
            v-for="(pannel,index) in pannels"
            @click.stop="activeIndex = index"
            :class="{'active': index === activeIndex}">{{ pannel }}</li>
        </ul>
        <Icon @click.native.stop="toggleshowEmoji" class="emojiclose" type="android-close"></Icon>
        <ul class="emoji-container">
          <li
            v-for="(emojiGroup, index) in emojis"
            style="padding: 0"
            :key="index"
            v-if="index === activeIndex">
            <a
              href="javascript:;"
              v-for="(emoji, index) in emojiGroup"
              :key="index" @click.stop="changecurrentSay(emoji)">
               <span
                  class="emoji-item"
                  :title="getPureName(emoji)"
                  :class="'sprite-' + getPureName(emoji)"></span>
            </a>
          </li>
        </ul>
    </div>
</template>

<script>
import emojidata from '../../../static/emoji/js/emoji-data.js'

export default {
    name: 'z-emoji',
    data () {
        return {
            emojiData: emojidata,
            emojiList: {},
            activeIndex: 0
        }
    },
    props: {
        currentSay: {
            type: null
        }
    },
    computed: {
        pannels () {
            return Object.keys(this.emojiData)
        },
        emojis () {
            return this.pannels.map(item => {
                return Object.keys(this.emojiData[item])
            })
        }
    },
    beforeMount() {
        //所有表情键值对应
        Object.values(this.emojiData).forEach(item => {
            this.emojiList = { ...this.emojiList, ...item }
        })
    },
    mounted() {

    },
    methods: {
        toggleshowEmoji () {
            this.$emit('toggleshowEmoji')
        },
        changecurrentSay(emoji){
            this.toggleshowEmoji()
            let v = this.currentSay
            v += emoji
            this.$emit('changecurrentSay', v)
        },
        getPureName (name) {
            return name.replace(/:/g, '')
        },
        //替换icon
        emojiicon (value) {
            let _this = this
            Object.keys(_this.emojiList).forEach(item => {
                value = value.replace(new RegExp(item, 'g'), function(e){
                    let v = _this.emojiList[e]
                    let path = '/static/emoji/img/'
                    return `<img src=${path}${v} style="width: 22px; height: 22px; position: relative; top: 2px; margin: 0 1px;">`
                })
            })
            return value
        }
    },
    filters: {

    },
    components: {

    }
}
</script>
