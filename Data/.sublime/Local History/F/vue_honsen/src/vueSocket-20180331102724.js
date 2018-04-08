import store from './vueX';

export default function connectSocket(uid) {
    document.cookie = `uid=${uid};path=/;domain=.honsenflag.com`;
    // if( process.env.NODE_ENV == 'production' ){
        console.log(socketUrl)
        window.socket = io( socketUrl );
        window.socket.on('notification', function(data){
            store.commit('addNotiData',data);
            console.log('通知', data);
        });
        window.socket.on('chat', function(data){
            store.commit('changeSinglechat', data);
            console.log('聊天信息', data);
        });
        window.socket.on('schedure', function(data){
            store.commit('addSchedure', data);
            console.log('日程提醒', data);
        })
        window.socket.on('chatread', function(data){
            store.commit('changeChatRead', data);
            console.log('已读', data);
        });
    // }
}
