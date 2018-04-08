import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import notFound from '@/components/notFound'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/*',
            name: 'notFound',
            component: notFound
        },
    ]
})
