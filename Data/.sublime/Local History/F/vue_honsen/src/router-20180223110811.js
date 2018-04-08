import Vue from 'vue';
import Router from 'vue-router';
import store from './vueX';

/* 路由懒加载分块 */
import login from '@/components/login/login';
import personalSetter from '@/components/personalSetter/personalSetter';
import accountSet from '@/components/personalSetter/accountSet';
import identitySet from '@/components/personalSetter/identitySet';
import orderManagement from '@/components/personalSetter/orderManagement';
import recommend from '@/components/recommend/recommend';
import passwordReset from '@/components/passwordReset/passwordReset';
import feed from '@/components/feed/feed';
import bindAccount from '@/components/login/bindAccount';
import agreement from '@/components/agreement/agreement';
import userAgreement from '@/components/agreement/userAgreement';
import payAgreement from '@/components/agreement/payAgreement';
import post from '@/components/post/post';
import postList from '@/components/post/postList';
import postRead from '@/components/post/postRead';
import postEdit from '@/components/post/postEdit';
import personalPage from '@/components/personalCenter/personalPage';
import personalCenter from '@/components/personalCenter/personalCenter';
import selectLawyer from '@/components/personalCenter/selectLawyer';
import business from '@/components/business/business';
import businessList from '@/components/business/businessList';
import customerDetails from '@/components/business/customerDetails';
import caseEdit from '@/components/business/caseEdit';
import caseRead from '@/components/business/caseRead';
import news from '@/components/header/news';
import searchPage from '@/components/search/searchPage';
import search from '@/components/search/search';
import aboutUs from '@/components/aboutUs/aboutUs';
import notFound from '@/components/aboutUs/notFound';

/*
const login = resolve => require(['@/components/login/login'], resolve);
const personalSetter = resolve => require(['@/components/personalSetter/personalSetter'], resolve);
const accountSet = resolve => require(['@/components/personalSetter/accountSet'], resolve);
const identitySet = resolve => require(['@/components/personalSetter/identitySet'], resolve);
const orderManagement = resolve => require(['@/components/personalSetter/orderManagement'], resolve);
const recommend = resolve => require(['@/components/recommend/recommend'], resolve);
const passwordReset = resolve => require(['@/components/passwordReset/passwordReset'], resolve);
const feed = resolve => require(['@/components/feed/feed'], resolve);
const bindAccount = resolve => require(['@/components/login/bindAccount'], resolve);
const agreement = resolve => require(['@/components/agreement/agreement'], resolve);
const userAgreement = resolve => require(['@/components/agreement/userAgreement'], resolve);
const payAgreement = resolve => require(['@/components/agreement/payAgreement'], resolve);
const post = resolve => require(['@/components/post/post'], resolve);
const postList = resolve => require(['@/components/post/postList'], resolve);
const postRead = resolve => require(['@/components/post/postRead'], resolve);
const postEdit = resolve => require(['@/components/post/postEdit'], resolve);
const personalPage = resolve => require(['@/components/personalCenter/personalPage'], resolve);
const personalCenter = resolve => require(['@/components/personalCenter/personalCenter'], resolve);
const selectLawyer = resolve => require(['@/components/personalCenter/selectLawyer'], resolve);
const business = resolve => require(['@/components/business/business'], resolve);
const businessList = resolve => require(['@/components/business/businessList'], resolve);
const customerDetails = resolve => require(['@/components/business/customerDetails'], resolve);
const caseEdit = resolve => require(['@/components/business/caseEdit'], resolve);
const caseRead = resolve => require(['@/components/business/caseRead'], resolve);
const news = resolve => require(['@/components/header/news'], resolve);
const searchPage = resolve => require(['@/components/search/searchPage'], resolve);
const search = resolve => require(['@/components/search/search'], resolve);
const aboutUs = resolve => require(['@/components/aboutUs/aboutUs'], resolve);
const notFound = resolve => require(['@/components/aboutUs/notFound'], resolve);
*/


/*
const login = () => import ('@/components/login/login');
const personalSetter = () => import ('@/components/personalSetter/personalSetter');
const accountSet = () => import ('@/components/personalSetter/accountSet');
const identitySet = () => import ('@/components/personalSetter/identitySet');
const orderManagement = () => import ('@/components/personalSetter/orderManagement');
const recommend = () => import ('@/components/recommend/recommend');
const passwordReset = () => import ('@/components/passwordReset/passwordReset');
const feed = () => import ('@/components/feed/feed');
const bindAccount = () => import ('@/components/login/bindAccount');
const agreement = () => import ('@/components/agreement/agreement');
const userAgreement = () => import ('@/components/agreement/userAgreement');
const payAgreement = () => import ('@/components/agreement/payAgreement');
const post = () => import ('@/components/post/post');
const postList = () => import ('@/components/post/postList');
const postRead = () => import ('@/components/post/postRead');
const postEdit = () => import ('@/components/post/postEdit');
const personalPage = () => import ('@/components/personalCenter/personalPage');
const personalCenter = () => import ('@/components/personalCenter/personalCenter');
const selectLawyer = () => import ('@/components/personalCenter/selectLawyer');
const business = () => import ('@/components/business/business');
const businessList = () => import ('@/components/business/businessList');
const customerDetails = () => import ('@/components/business/customerDetails');
const caseEdit = () => import ('@/components/business/caseEdit');
const caseRead = () => import ('@/components/business/caseRead');
const news = () => import ('@/components/header/news');
const searchPage = () => import ('@/components/search/searchPage');
const search = () => import ('@/components/search/search');
const aboutUs = () => import ('@/components/aboutUs/aboutUs');
const notFound = () => import ('@/components/aboutUs/notFound');
*/

Vue.use(Router);

let router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
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
            name: 'feed',
            component: feed,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login
		},
		{
			path: '/personalSetter',
			component: personalSetter,
            redirect: to => {
                return { name: 'accountSet'}
            },
			children: [
				{
					path: 'accountSet',
					name: 'accountSet',
                    component: accountSet,
                    meta: {
                        requireAuth: true
                    }
				},
				{
					path: 'identitySet',
					name: 'identitySet',
                    component: identitySet,
                    meta: {
                        requireAuth: true
                    }
				},
				{
					path: 'orderManagement',
					name: 'orderManagement',
                    component: orderManagement,
                    meta: {
                        requireAuth: true
                    }
				}
			]
		},
        {
            path: '/recommend',
            name: 'recommend',
            component: recommend,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/passwordReset',
            name: 'passwordReset',
            component: passwordReset
        },
        {
            path: '/bindAccount',
            name: 'bindAccount',
            component: bindAccount,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/agreement',
            component: agreement,
            redirect: to => {
                return { name: 'userAgreement'}
            },
            children: [
                {
                    path: 'userAgreement',
                    name: 'userAgreement',
                    component: userAgreement
                },
                {
                    path: 'payAgreement',
                    name: 'payAgreement',
                    component: payAgreement
                }
            ]
        },
        {
            path: '/post',
            component: post,
            redirect: to => {
                return { name: 'postList'}
            },
            children: [
                {
                    path: 'postList',
                    name: 'postList',
                    component: postList,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'read/:read_pid',
                    name: 'postRead',
                    component: postRead
                },
                {
                    path: 'edit/:edit_pid',/*edit_pid为new时为创建*/
                    name: 'postEdit',
                    component: postEdit,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
			path: '/personalPage',
            component: personalPage,
            redirect: to => {
                return { name: 'personalCenter'}
            },
            children: [
                {
                    path: 'personalCenter/:id',
                    name: 'personalCenter',
                    component: personalCenter
                },
                {
                    path: 'selectLawyer/:id',
                    name: 'selectLawyer',
                    component: selectLawyer,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
		},
        {
            path: '/business',
            component: business,
            children: [
                {
                    path: '',
                    name: 'businessList',
                    component: businessList,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: 'customerDetails/:ctmid',
                    name: 'customerDetails',
                    component: customerDetails,
                    meta: {
                        requireAuth: true
                    }
                },
                {
					path: 'caseEdit/:caseid',
					name: 'caseEdit',
                    component: caseEdit,
                    meta: {
                        requireAuth: true
                    }
                },
                {
					path: 'caseRead/:caseid',
					name: 'caseRead',
                    component: caseRead,
                    meta: {
                        requireAuth: true
                    }
				}
            ]
        },
        {
            path: '/news',
            name: 'news',
            component: news,
            meta: {
                requireAuth: true
            }
        },
        {
			path: '/search',
            component: searchPage,
            redirect: to => {
                return { name: 'search'}
            },
            children: [
                {
                    path: '',
                    name: 'search',
                    component: search,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
		},
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: aboutUs
        },
        {
            path: '/*',
            name: 'notFound',
            component: notFound
        },
    ]
});

/* 路由拦截 */
router.beforeEach((to, from, next) => {
    if( store.state.loginStatus ) {     // 登录了逻辑
        if( to.name == 'login' ){       // 登录之后进入登录页跳往动态页
            next({
                name: 'feed'
            });
        }else if( to.name == 'businessList' ){  // 律师才能进业务列表
            if( Vue.prototype.$authCodeT(store.getters.auth_code_123).isLawyer ){
                next();
            }else{
                next({
                    name: 'feed'
                });
            }
        }else if( to.name == 'orderManagement' ){  // 交过费才能进订单列表
            if( store.state.mineInfo.is_pay ){
                next();
            }else{
                next({
                    name: 'accountSet'
                });
            }
        }else{
            next();
        }
    }else{  // 没登录逻辑
        if( to.meta.requireAuth ) {     // 判断是否需要登录权限 没权限跳转去登录页
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            });
        }else{
            next();
        }
    }
    /* 百度统计 */
    _hmt.push(['_trackPageview', `/${to.fullPath}`]);
});

export default router;
