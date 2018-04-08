<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.full_calendar
    .full_calendar_side
        height 467px
        overflow auto
        .ivu-collapse
            background-color: transparent
            border-radius: 0
            border: none
            .ivu-collapse-item
                border none
                .ivu-collapse-header
                    height 52px
                    line-height 52px
                    font-size 16px
                    color #404040
                    padding-left: 20px
                    border-bottom 1px solid #e3e3e3
                    overflow hidden
                    &:hover
                        background: #fafafa
                    .ivu-icon-arrow-right-b
                        float right
                        margin-top 20px
                        margin-right 20px
                        transform rotate(180deg)
                        color #626262
                        &::befor
                            content "\F107"
                .ivu-collapse-content
                    padding 0
                    .ivu-collapse-content-box
                        padding 0 0 10px
                        font-size 12px
                        color #404040
                        .calendar_item
                            margin-top 12px
                            padding 0 28px
                            .calendar_item_key
                                float left
                                width 66px
                                font-weight bold
                                &.calendar_item_member
                                    margin-top 2px
                            .calendar_item_val
                                margin-left 66px
                                width 170px
                                word-break: break-word
                                word-wrap: break-word
                                &.content
                                    white-space pre-wrap
                                .icon_item
                                    margin 0 0 4px 8px
                                    img
                                        border-radius 50%
                        .calendar_item_btn_wrap
                            margin-top 10px
                            height 40px
                            border-top 1px solid #e3e3e3
                            .edit_icon
                                float left
                                margin-left 90px
                                bgImg(17px,40px,'/static/icon/0023.png')
                                cursor pointer
                            .del_icon
                                float right
                                margin-right 90px
                                bgImg(15px,40px,'/static/icon/0020_.png')
                                cursor pointer
            .ivu-collapse-item-active
                background: #fafafa
                .ivu-collapse-header
                    background: #fafafa
                    .ivu-icon-arrow-right-b
                        transform rotate(90deg)
                .ivu-collapse-content,.ivu-collapse-content-box
                    background: #fafafa
    .calendar_main_tit
        height 100%
        line-height 53px
        position relative
        border-bottom 1px solid #dcdcdc
        .calendar_tit_text
            text-indent 40px
            font-size 18px
            color #5b5b5b
        .add_icon
            position absolute
            top 12px
            right 50px
            addIcon(#3dc1ff)
    .calendar_read_wrap
        margin: 0 35px
        .calendar_header
            height: 85px
            line-height: 85px
            text-align:center
            border-bottom:1px solid #e0e0e0
            .title
                margin: 0 10px
                cursor: pointer
                font-size 16px
            .iconfont
                cursor: pointer
                font-size 26px
                &:hover
                    color: #3dc1ff
                &.left
                    float left
                &.right
                    float right
        .monthView
            .weeks
                height: 40px
                line-height: 40px
                font-size: 14px
                color: #8a8a8a
                .week
                    display: inline-block
                    float: left
                    width: 60px
                    text-align: center
                    &.active
                        color: #fd7324
            .dates
                color: #868686
                .week-row
                    height: 49px
                    line-height: 49px
                    border-top:1px solid #e0e0e0
                    font-size: 14px
                    .day-cell
                        box-sizing: border-box
                        display: inline-block
                        float: left
                        width: 60px
                        height: 50px
                        text-align: center
                        cursor: pointer
                        &.not-cur-month
                            color: #d5d5d5
                            cursor not-allowed
                        .events_day
                            display: inline-block
                            margin: 0 auto
                            width: 25px
                            height: 25px
                            line-height: 24px
                            font-size: 14px
                            text-align: center
                            border-radius: 50%
                            &.today
                                border: 1px solid #fd7324
                            &.have_events
                                color: #fff
                                background-color: #b4c6d1
                            &.selected_date
                                color: #fff
                                background-color: #3dc1ff
    .calendar_edit_wrap
        margin: 25px 35px 0
        max-height: 443px
        overflow-y: auto
        .ivu-form-item
            margin-bottom 18px
        .timerange_item
            .ivu-form-item-error-tip
                right 16px
        .add_member
            .ivu-form-item-content
                margin-top 2px
            .member_item
                position relative
                display inline-block
                width 30px
                height 30px
                margin-right 5px
                vertical-align text-bottom
                &:hover
                    .remove_icon
                        display block
            .member_item_icon
                width 31px
                height 31px
                background-color #cacaca
                color #fff
                border-radius 50%
                text-align center
                cursor pointer
                &:hover
                    background-color #3dc1ff
            .remove_icon
                display none
                position absolute
                top -1px
                left -1px
                line-height 23px
                font-size 48px
            .calendar_edit_add_icon
                display inline-block
                line-height 26px
                font-size 34px
            .img
                border-radius 50%
            .icon
                font-size 33px
                cursor pointer
                background-color #fff
                &:hover
                    color #3dc1ff
        .btn_wrap
            text-align center
            .ivu-btn
                margin-right 15px
</style>

<template>
    <div class="full_calendar">
        <sideBase ref="sideBase">
            <div slot="side" class="full_calendar_side">
                <Collapse v-if="selectedDateEvents.length" accordion>
                    <Panel v-for="event in selectedDateEvents" :key="event.sid">
                        {{event.title}}
                        <div slot="content">
                            <div class="calendar_item clearfix">
                                <div class="calendar_item_key">内　　容：</div>
                                <div class="calendar_item_val content">{{event.remark}}</div>
                            </div>
                            <div class="calendar_item">
                                <div class="calendar_item_key">起止时间：</div>
                                <div class="calendar_item_val">
                                    <div>{{event.start}}（开始）</div>
                                    <div>{{event.end}}（结束）</div>
                                </div>
                            </div>
                            <div v-if="event.url" class="calendar_item clearfix">
                                <div class="calendar_item_key">链　　接：</div>
                                <div class="calendar_item_val">
                                    <a :href="event.url.indexOf('http') == -1? ('//'+event.url): event.url" target="_blank">
                                        {{event.url.indexOf('http') == -1? ('//'+event.url): event.url}}
                                    </a>
                                </div>
                            </div>
                            <div class="calendar_item clearfix">
                                <div class="calendar_item_key calendar_item_member">成　　员：</div>
                                <div class="calendar_item_val">

                                    <span v-for="member in event.members" :key="member.id" class="icon_item">
                                        <img width="26" height="26" :src="$avatarHash(member.id)" :title="member.name">
                                    </span>
                                </div>
                            </div>

                            <div v-if="event.owner" class="calendar_item_btn_wrap">
                                <div class="edit_icon" @click="toEdit('update', event, null)"></div>
                                <div class="del_icon" @click="delCalendar(event)"></div>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <div v-else style="margin-top: 20px; text-align: center">该天还没有创建日程！</div>
            </div>
            <div slot="mainTit" class="calendar_main_tit">
                <div class="calendar_tit_text">{{calendarTitText}}</div>
                <div class="add_icon" @click="toEdit('add', null, null)">+</div>
            </div>
            <div slot="main">
                <div v-show="!isEditing" class="calendar_read_wrap">
                    <div class="calendar_header">
                        <span class="iconfont left" @click.stop="changeMonth(false)">
                            <Icon type="ios-arrow-left"></Icon>
                        </span>
                        <span class="title" @click="toToday">{{title}}</span>
                        <span class="iconfont right" @click.stop="changeMonth(true)">
                            <Icon type="ios-arrow-right"></Icon>
                        </span>
                    </div>
                    <!-- 月视图 -->
                    <div class="monthView">
                        <!-- 周 -->
                        <div class="weeks">
                            <span
                                class="week"
                                v-for="dayIndex in 7"
                                :class="{active: todayIndex == dayIndex-1 && isCurrentMonth}">
                                {{ (dayIndex - 1) | localeWeekDay }}
                            </span>
                        </div>
                        <!-- 天 -->
                        <div class="dates" ref="dates">
                            <div class="week-row" v-for="week in currentDates">
                                <span
                                    class="day-cell"
                                    v-for="day in week"
                                    @click.stop="toEdit('add', null, day)"
                                    :class="{'not-cur-month' : !day.isCurMonth}">
                                    <span
                                        class="events_day"
                                        :class="{'today': day.isToday,'have_events': day.isCurMonth && day.events.length, 'selected_date': isSelect(day)}">
                                        {{ day.monthDay }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="isEditing" class="calendar_edit_wrap">
                     <Form :model="calendar_info" ref="calendar_info" :rules="calendar_info_rules" label-position="left" :label-width="88">
                        <FormItem label="标　　题：" prop="title">
                            <Input :maxlength="13" v-model.trim="calendar_info.title"></Input>
                        </FormItem>
                        <FormItem label="内　　容：">
                            <Input type="textarea" :rows="3" v-model.trim="calendar_info.remark"></Input>
                        </FormItem>
                        <FormItem label="添加成员：" class="add_member">
                            <span class="member_item"  v-for="(member,i) in calendar_info.members" :key="member.id">
                                <img class="img" :src="$avatarHash(member.id)" width="29" height="29">
                                <div class="remove_icon member_item_icon" @click.stop="removeMember(i)" :title="`移除 ${member.name}`">-</div>
                            </span>
                            <span class="calendar_edit_add_icon member_item_icon" @click.stop="show_addMember_modal = true" title="添加成员">+</span>
                        </FormItem>
                        <FormItem label="起止时间：" prop="timerange" class="timerange_item">
                            <DatePicker
                                v-model="calendar_info.timerange"
                                @on-change="changeTimeRange"
                                :options="daterangeOptions"
                                type="datetimerange"
                                format="yyyy/MM/dd HH:mm:ss"
                                placeholder="日程的起止时间"
                                style="width: 100%">
                            </DatePicker>
                        </FormItem>
                        <FormItem label="提醒时间：">
                            前　
                            <Select v-model="calendar_info.remind" style="width:100px">
                                <Option v-if="option.time" v-for="option in timeOptions" :value="option.time" :key="option.time">{{ option.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="添加链接：">
                            <Input v-model.trim="calendar_info.url"></Input>
                        </FormItem>
                        <FormItem class="btn_wrap">
                            <Button type="primary" @click="submitCalendaInfo('calendar_info')">提 交</Button>
                            <Button type="primary" @click="cancel" class="gray_btn">取 消</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </sideBase>
        <addMember
            v-if="show_addMember_modal"
            title="添加成员"
            :initSelectedUserIds="calendar_info.members"
            @close="show_addMember_modal = false"
            @selected-users="toSelectedMember">
        </addMember>
    </div>
</template>

<script>
import sideBase from './sideBase';
import addMember from '@/components/common/addMember';
import moment from 'moment';
export default {
    name: 'fullcalendar',
    components: {sideBase,addMember},
    data() {
        return {
            show_addMember_modal: false,
            calendarTitText: '日 程',
            currentMonth: moment().startOf('month'),
            monthEvents: [],
            selectedDate: moment().startOf('d'),
            isEditing: false,
            timeOptions: [{time:'',value:''},{time:5*60,value:'5分钟'},{time:10*60,value:'10分钟'},{time:15*60,value:'15分钟'},{time:30*60,value:'30分钟'},{time:60*60,value:'1小时'},{time:2*60*60,value:'两小时'},{time:24*60*60,value:'1天'},{time:2*24*60*60,value:'2天'}],
            /* 当前编辑的日程的信息 */
            calendar_info: {
                title: '',
                remark: '',
                start: '',
                end: '',
                url: '',
                remind: 0,
                members: [],
                timerange: [],
            },
            calendar_info_rules: {
                title: [
                    { validator : (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入标题'));
                            }else{
                                callback();
                            }
                        },
                        required: false,
                        trigger: 'change'
                    }
                ],
                timerange: [
                    {
                        validator : (rule, value, callback) => {
                            if (!value || !value.length) {
                                callback(new Error('请选择起止时间'));
                            }else{
                                callback();
                            }
                        },
                        required: false,
                        trigger: 'change'
                    },
                ],
            },
            daterangeOptions: {
                disabledDate(date) {
                    return moment(date).isBefore(moment().subtract(1, 'day'))? true: false;
                },
            }
        }
    },
    computed: {
        /* 当前月 */
        title () {
            return this.currentMonth.format('YYYY/MM');
        },
        /*今天星期几*/
        todayIndex() {
            return window.parseInt(moment().day());
        },
        isCurrentMonth() {
            return this.currentMonth.isSame(moment(),'month');
        },
        /*月视图数据*/
        currentDates () {
            let monthViewStartDate = this.getMonthViewStartDate(this.currentMonth);
            let calendar = [];
            for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {
                let week = [];
                for(let perDay = 0 ; perDay < 7 ; perDay++) {
                    week.push({
                        monthDay : monthViewStartDate.date(),
                        isToday : monthViewStartDate.isSame(moment(), 'day'),
                        isCurMonth : monthViewStartDate.isSame(this.currentMonth, 'month'),
                        weekDay : perDay,
                        date : moment(monthViewStartDate),
                        events : this.getDateEvents(monthViewStartDate), /* 这一天的日程 */
                    });
                    monthViewStartDate.add(1, 'day');
                }
                calendar.push(week);
            }
            return calendar
        },
        /* 侧边显示的日程 */
        selectedDateEvents() {
            return this.getDateEvents(this.selectedDate);
        }
    },
    mounted() {
        this.getSchedureList();
    },
    methods: {
        toToday() {
            this.currentMonth = moment().startOf('month');
            this.getSchedureList();
        },
        getMonthViewStartDate(date) {
            let start = moment(date);
            let startOfMonth = moment(start.startOf('month'));
            start.subtract(startOfMonth.day(), 'days');
            return start;
        },
        getMonthViewEndDate(date) {
            return this.getMonthViewStartDate(date).add(6, 'weeks');
        },
        changeMonth (isNext) {
            this.currentMonth = isNext? moment(this.currentMonth).add(1, 'months').startOf('month'): moment(this.currentMonth).subtract(1, 'months').startOf('month');
            this.getSchedureList();
        },
        getSchedureList() {
            let start = this.getMonthViewStartDate(this.currentMonth).format('YYYY-MM-DD HH:mm:ss');
            let end = this.getMonthViewEndDate(this.currentMonth).format('YYYY-MM-DD HH:mm:ss');
            let param = `?start=${start}&end=${end}`;

            let URL = `/schedure/lists${param}`;
            this.$http.get(URL).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.monthEvents = data.data;
                }else {
                    this.$Message.error(data.errmsg);
                }
            }).catch(err => {
                // 请求失败回调
                this.$Message.error('数据请求失败！');
            })
        },
        getDateEvents(viewStartDate) {
            let viewEndDate = moment(viewStartDate).endOf('d');
            return this.monthEvents.filter(val => !(moment(val.start).isAfter(moment(viewEndDate)) || moment(val.end).isBefore(moment(viewStartDate))));
        },
        isSelect(day) {
            return moment(day.date).isSame(this.selectedDate,'day') && day.events.length;
        },
        delCalendar(event) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    let URL = `/schedure/del/${event.sid}`;
                    this.$http.post(URL).then((response) => {
                        // 请求成功回调
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.monthEvents = this.monthEvents.filter(val => val.sid != event.sid);

                            this.$Message.success('日程删除成功！');
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {
                        // 请求失败回调
                        this.$Message.error('数据请求失败！');
                    })
                }
            });
        },
        /*切换到添加，修改日程*/
        toEdit(type,event,day){
            if(type == 'add'){
                this.calendarTitText = '创建日程';
                this.calendar_info = {
                    title: '',
                    remark: '',
                    start: '',
                    end: '',
                    url: '',
                    remind: 0,
                    members: [],
                    timerange: [],
                }
                if(day){
                    if (!day.isCurMonth) {
                        return false
                    }

                    if (day.events.length) {
                        this.selectedDate = moment(day.date);
                        return false;
                    } else {
                        this.selectedDate = moment(day.date);

                        /* 当天之前的日期是不可以再添加新日程的 */
                        if(moment(day.date).isBefore(moment().subtract(1,'days'))){
                            return false;
                        }

                        this.calendar_info.start = moment(day.date).startOf('day').add(9,'h').format('YYYY/MM/DD HH:mm:ss');
                        this.calendar_info.end = moment(day.date).startOf('day').add(18,'h').format('YYYY/MM/DD HH:mm:ss');
                        this.calendar_info.timerange.push(this.calendar_info.start,this.calendar_info.end);
                    }

                }
            }

            if(type == 'update'){
                this.calendarTitText = '修改日程';
                this.calendar_info = Object.assign({timerange: [event.start, event.end]},event);
            }

            this.isEditing = true;
        },
        changeTimeRange($event){
            this.calendar_info.start = $event[0];
            this.calendar_info.end = $event[1];
        },
        toSelectedMember(users,ids,isNoChange) {
            this.calendar_info.members = users;
            this.show_addMember_modal = false;
        },
        removeMember(i) {
            this.calendar_info.members.splice(i,1);
        },
        submitCalendaInfo(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let param = {
                        title: this.calendar_info.title,
                        remark: this.calendar_info.remark || '',
                        url: this.calendar_info.url || '',
                        start: moment(this.calendar_info.start).format('YYYY-MM-DD HH:mm:ss'),
                        end: moment(this.calendar_info.end).format('YYYY-MM-DD HH:mm:ss'),
                        members:  this.calendar_info.members.map(val => val.id),
                    };
                    if (this.calendar_info.remind) {
                        param.remind = this.calendar_info.remind;
                    }

                    let URL = this.calendarTitText == '修改日程'?`/schedure/update/${this.calendar_info.sid}`: `/schedure/add`;
                    this.$http.post(URL,param).then((response) => {
                        // 请求成功回调
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            let oEvent = {};
                            if (this.calendarTitText == '修改日程') {
                                this.monthEvents = this.monthEvents.filter(val => val.sid != this.calendar_info.sid);
                            } else {
                                oEvent = {
                                    sid: data.sid,
                                    owner: true,
                                    name: this.$store.state.mineInfo.name
                                };
                            }

                            this.monthEvents.unshift(Object.assign({},this.calendar_info,oEvent));

                            this.$Message.success(`${this.calendarTitText}成功！`);

                            this.isEditing = false;
                            this.calendarTitText = '日 程'
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {
                        // 请求失败回调
                        this.$Message.error('数据请求失败！');
                    })
                }
            });
        },
        cancel() {
            this.isEditing = false;
            this.calendarTitText = '日 程';
        },
    },
    filters: {
        /*将0-6转化为星期*/
        localeWeekDay (weekday) {
            const localMoment = moment().locale('en');
            return localMoment.localeData().weekdaysShort()[weekday % 7];
        },
        remarkTime(s) {
            return this.timeOptions.filter(val => val.time == s).value;
        }
    }
}
</script>