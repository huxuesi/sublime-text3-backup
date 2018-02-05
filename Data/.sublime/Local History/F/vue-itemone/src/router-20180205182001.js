import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vueX'

import feed from '@/components/feed/feed'
import feedItem from '@/components/feed/feedItem'
import knowDetails from '@/components/feed/knowDetails'
import businessDetails from '@/components/feed/businessDetails'

import follow from '@/components/follow/follow'
import concern from '@/components/follow/concern'
import recommend from '@/components/follow/recommend'

import chat from '@/components/chat/chat'
import chatInfo from '@/components/chat/chatInfo'

import account from '@/components/account/account'
import bindAccount from '@/components/account/bindAccount'
import V2bindAccount from '@/components/account/V2bindAccount'
import changePassword from '@/components/account/changePassword'
import passwordReset from '@/components/account/passwordReset'
import login from '@/components/account/login'
import register from '@/components/account/register'
import registerSuccess from '@/components/account/registerSuccess'
import personal from '@/components/account/personal'
import personalNavWrap from '@/components/account/personalNavWrap'
import personalbizNav from '@/components/account/personalbizNav'
import personalpostNav from '@/components/account/personalpostNav'
import personalsetNav from '@/components/account/personalsetNav'
import personalSetInfo from '@/components/account/personalSetInfo'
import personalorderNav from '@/components/account/personalorderNav'
import paymentManage from '@/components/account/paymentManage'
import orderRecords from '@/components/account/orderRecords'
import personalinvoiceNav from '@/components/account/personalinvoiceNav'
import getInvoiceList from '@/components/account/getInvoiceList'
import getInvoiceForm from '@/components/account/getInvoiceForm'
import invoiceList from '@/components/account/invoiceList'
import paymentInfo from '@/components/account/paymentInfo'
import orderInfo from '@/components/account/orderInfo'
import invoiceInfo from '@/components/account/invoiceInfo'
import headimgUp from '@/components/account/headimgUp'
import jobauth from '@/components/account/jobauth'
import sendBiz from '@/components/account/sendBiz'
import myBiz from '@/components/account/myBiz'
import selectLawyer from '@/components/account/selectLawyer'
import caseReadKH from '@/components/account/caseReadKH'
import bizreqDetails from '@/components/account/bizreqDetails'
import lawyerBizList from '@/components/account/lawyerBizList'
import lawyerBizListChild from '@/components/account/lawyerBizListChild'
import problem from '@/components/account/problem'
import cusComment from '@/components/account/cusComment'
import toolnav from '@/components/account/toolnav'
import shortNote from '@/components/account/shortNote'
import shortNoteInfo from '@/components/account/shortNoteInfo'

import notice from '@/components/notice/notice'

import search from '@/components/search/search'

Vue.use(Router)

let router =  new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '',
            redirect: to => {
                return { name: 'feed'}
            }
        },
        {
            path: '/feed',
            component: feed,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'feed',
                    component: feedItem,
                    meta: {
                        keepAlive: true,
                        requireAuth: true
                    }
                },
                {
                    path: 'knowDetails/:id',
                    name: 'knowDetails',
                    component: knowDetails
                },
                {
                    path: 'businessdetails/:id',
                    name: 'businessDetails',
                    component: businessDetails
                },
            ]
        },
        {
            path: '/follow',
            component: follow,
            children: [
                {
                    path: '',
                    name: 'recommend',
                    component: recommend
                },
                {
                    path: 'concern',
                    name: 'follow',
                    component: concern,
                    meta: {
                        requireAuth: true,
                        nologinskip: '/follow'
                    }
                }
            ]
        },
        {
            path: '/account',
            component: account,
            children: [
                {
                    path: '',
                    name: 'login',
                    component: login,
                    meta: {
                        loginskip: '/account/personal/me'
                    }
                },
                {
                    path: 'register',
                    name: 'register',
                    component: register,
                    meta: {
                        loginskip: '/account/personal/me'
                    }
                },
                {
                    path: 'bindAccount',
                    name: 'bindAccount',
                    component: bindAccount
                },
                {
                    path: 'V2bindAccount',
                    name: 'V2bindAccount',
                    component: V2bindAccount
                },
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    component: changePassword
                },
                {
                    path: 'passwordReset',
                    name: 'passwordReset',
                    component: passwordReset
                },
                {
                    path: 'registerSuccess',
                    name: 'registerSuccess',
                    component: registerSuccess,
                    meta: {
                        loginskip: '/account/personal/me'
                    }
                },
                {
                    path: 'personal/:id',
                    name: 'personal',
                    component: personal
                },
                {
                    path: 'personalNavWrap',
                    name: 'personalNavWrap',
                    component: personalNavWrap,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalbizNav',
                    name: 'personalbizNav',
                    component: personalbizNav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalpostNav',
                    name: 'personalpostNav',
                    component: personalpostNav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalsetNav',
                    name: 'personalsetNav',
                    component: personalsetNav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalSetInfo',
                    name: 'personalSetInfo',
                    component: personalSetInfo,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalorderNav',
                    name: 'personalorderNav',
                    component: personalorderNav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'paymentManage',
                    name: 'paymentManage',
                    component: paymentManage,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'orderRecords',
                    name: 'orderRecords',
                    component: orderRecords,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'personalinvoiceNav',
                    name: 'personalinvoiceNav',
                    component: personalinvoiceNav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'getInvoiceList',
                    name: 'getInvoiceList',
                    component: getInvoiceList,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'getInvoiceForm',
                    name: 'getInvoiceForm',
                    component: getInvoiceForm,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'invoiceList',
                    name: 'invoiceList',
                    component: invoiceList,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'paymentInfo/:type',
                    name: 'paymentInfo',
                    component: paymentInfo,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'orderInfo',
                    name: 'orderInfo',
                    component: orderInfo,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'invoiceInfo',
                    name: 'invoiceInfo',
                    component: invoiceInfo,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'headimgUp',
                    name: 'headimgUp',
                    component: headimgUp,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'jobauth',
                    name: 'jobauth',
                    component: jobauth,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'sendBiz',
                    name: 'sendBiz',
                    component: sendBiz,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'myBiz',
                    name: 'myBiz',
                    component: myBiz,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'selectLawyer/:id',
                    name: 'selectLawyer',
                    component: selectLawyer,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'caseReadKH/:id',
                    name: 'caseReadKH',
                    component: caseReadKH,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'bizreqDetails/:id/:name',
                    name: 'bizreqDetails',
                    component: bizreqDetails,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'lawyerBizList',
                    name: 'lawyerBizList',
                    component: lawyerBizList,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'lawyerBizListChild/:id/:name',
                    name: 'lawyerBizListChild',
                    component: lawyerBizListChild,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'problem/:id',
                    name: 'problem',
                    component: problem,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'cusComment/:id',
                    name: 'cusComment',
                    component: cusComment,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'toolnav',
                    name: 'toolnav',
                    component: toolnav,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'shortNote/:id',
                    name: 'shortNote',
                    component: shortNote,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'shortNoteInfo',
                    name: 'shortNoteInfo',
                    component: shortNoteInfo,
                    meta: {
                        requireAuth: true
                    }
                },
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/notice',
            name: 'notice',
            component: notice,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: chat,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/chatInfo/:id',
            name: 'chatInfo',
            component: chatInfo,
            meta: {
                requireAuth: true
            }
        },
    ]
})
var routerFirst = true
//  路由拦截
router.beforeEach((to, from, next) => {
    // 关闭提示登录面板
    if( !routerFirst ){
        if( store.state.gotoLoginPanel ){
            store.commit('changeGotoLogin', false)
        }
    }

    // 如果登录了
    if( store.state.userInfo.id ) { // 判断是否登录
        if( to.meta.loginskip ) {    // 判断是否需要跳过
            next({
                path: to.meta.loginskip,
                query: { redirect: to.fullPath }
            })
        }else{
            next()
        }
    }else{  // 没登录
        if( to.meta.requireAuth ) {    // 判断是否需要登录权限
            // 没登录则弹出提示或跳过
            if( to.meta.nologinskip ) {    // 判断是否需要跳过
                next({
                    path: to.meta.nologinskip,
                    query: { redirect: to.fullPath }
                })
            }else{
                if( !routerFirst ){
                    store.commit('changeGotoLogin', true)
                }
            }
        }else{
            next()
        }
    }

    routerFirst = false
})

export default router
