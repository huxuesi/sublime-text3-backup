/* 全局常量 */
window.imgUrl = process.env.BASE_API_TEST;
if( window.location.origin == process.env.BASE_WEB ){
    imgUrl = process.env.BASE_API;
}else if( window.location.origin == process.env.BASE_WEB_TEST ){
    imgUrl = process.env.BASE_API_TEST;
}else if( window.location.origin == process.env.BASE_WEB_PRIVIEW ){
    imgUrl = process.env.BASE_API_PRIVIEW;
}
window.socketUrl = imgUrl.replace(/https:/, 'http:').replace(/\/api/, '')
console.log(imgUrl.replace(/https:/, 'http:').replace(/\/api/, ''))
window.RETCODE_OK = 0;
window.HONSEN_id = 398;
window.honsenId = 398;
