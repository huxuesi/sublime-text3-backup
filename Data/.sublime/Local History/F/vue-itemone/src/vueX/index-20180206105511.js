import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        gotoLoginPanel: false,
        contactslist: [],
        curcontactid: 0,
        singlechat: {},
        chatread: {},
        /* 通知 */
        notifData: {}, // 当前推送来的通知
        unReadNotif: 0,
        curOrderInfo: {},
        curShortNoteInfo: {}
    },
    getters: {
        /* 状态码拆分 4-30-0-1-0 */
        // 123表示vip
        auth_code_123(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(0,3);
        },
        auth_code_1(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(0,1);
        },
        auth_code_2(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(1,3);
        },
        auth_code_3(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(3,4);
        },
        auth_code_4(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(4,5);
        },
        auth_code_5(state) {
            return state.userInfo.id && state.userInfo.auth_code.toString().substring(5,6);
        },
    },
    mutations: {
        clearalldata(state) {
            state.userInfo = {}
            state.gotoLoginPanel = false
            state.contactslist = []
            state.curcontactid = 0
            state.singlechat = {}
            state.chatread = {}
            state.notifData = {}
            state.unReadNotif = 0
        },
        changeGotoLogin(state , data) {
            state.gotoLoginPanel = data
        },
        addUserInfo(state, data) {
            state.userInfo = data
        },
        /* 改变 userInfo 中的一项*/
        changeMineInfo(state, keyvalueobj) {
            state.userInfo[keyvalueobj.key] = keyvalueobj.value;
        },
        changeCurcontactid(state, data) {
            state.curcontactid = data
        },
        changeContactslist(state, data) {
            state.contactslist = data
        },
        addContactslist(state, data) {
            state.contactslist.unshift(data)
        },
        addfirstContactslist(state, data) {
            let arrobj = state.contactslist.splice(data, 1)
            state.contactslist.unshift(arrobj[0])
        },
        changeMessage(state, data) {
            state.contactslist.forEach(val => {
                if( val.uid == data.id ){
                    if( data.type == "push" ){
                        val[data.item].push(data.list)
                    }else if( data.type == "loadmore" ){
                        val[data.item] = data.list.concat(val[data.item])
                    }else if( data.type == "addone" ){
                        val[data.item] += 1
                    }else if( data.type == "isread" ){
                        val[data.item].forEach(e => {
                            if( e.target == 'out' ){
                                e.is_readed = 1;
                            }
                        })
                    }else{
                        Vue.set(val, data.item, data.list)
                    }
                }
            })
        },
        changeSinglechat(state, data) {
            state.singlechat = data
        },
        changeChatRead(state, data) {
            state.chatread = data;
        },
        /*来的通知*/
        addNotiData(state, data) {
            state.notifData = data;
        },
        changeUnReadNotif(state, data) {
            if( data == 'addone' ){
                state.unReadNotif += 1
            }else{
                state.unReadNotif = data
            }
        },
        changeUserInfo(state, keyvalueobj) {
            state.userInfo[keyvalueobj.key] = keyvalueobj.value;
        },
        setCurOrderInfo(state, order) {
            state.curOrderInfo = order
        },
        setCurShortNoteInfo(state, info) {
            state.curShortNoteInfo = info
        }
    },
    actions: {

    },
    modules: {

    }
})
