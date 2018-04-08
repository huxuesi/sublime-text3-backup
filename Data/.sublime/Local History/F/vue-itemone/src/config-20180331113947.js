/* 全局常量 */
window.apiurl = process.env.BASE_API_TEST;
if( window.location.origin == process.env.BASE_WEB ){
    apiurl = process.env.BASE_API;
}else if( window.location.origin == process.env.BASE_WEB_TEST ){
    apiurl = process.env.BASE_API_TEST;
}else if( window.location.origin == process.env.BASE_WEB_PRIVIEW ){
    apiurl = process.env.BASE_API_PRIVIEW;
}
window.socketUrl = apiurl.replace(/\/api/, '')
window.RETCODE_OK = 0;
window.HONSEN_id = 398;
