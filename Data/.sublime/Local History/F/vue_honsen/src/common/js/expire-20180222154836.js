/**
 * 账号过期判断
 * @param {function} fn 没过期要执行的函数
 * @param {function} fn1 过期要执行的函数
 */
export function isExpire(fn, fn1) {
    if( this.$store.getters.auth_code_5 == 1){
        fn1()
    }else{
        fn()
    }
}