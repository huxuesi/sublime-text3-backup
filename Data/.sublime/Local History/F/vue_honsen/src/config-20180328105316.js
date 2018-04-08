/* 全局常量 */
window.imgUrl = process.env.BASE_API_TEST;
window.socketUrl = 'cloudwechat.honsenflag.com';
if( window.location.origin == process.env.BASE_WEB ){
    imgUrl = process.env.BASE_API;
    socketUrl = 'wechat.honsenflag.com';
}else if( window.location.origin == process.env.BASE_WEB_TEST ){
    imgUrl = process.env.BASE_API_TEST;
    socketUrl = 'cloudwechat.honsenflag.com';
}else if( window.location.origin == process.env.BASE_WEB_PRIVIEW ){
    imgUrl = process.env.BASE_API_PRIVIEW;
    socketUrl = 'previewwechat.honsenflag.com';
}
window.RETCODE_OK = 0;
window.HONSEN_id = 398;
window.honsenId = 398;
