/**
 * auth_code转换成具体身份
 * @param {string} code auth_code或者vip
 * return isLawyer: 是否为律师，role：具体身份
 */
export function authCodeT(code) {
    if( !code ){
        return {};
    }
    let v = Number(code.toString().substr(0, 3));
    let isV = v >= 420? true: false;
    let isLawyer = v >= 420? true: false;
    let role = '';
    switch(v) {
        case 420: role = '律师助理'; break;
        case 430: role = '实习律师'; break;
        case 440: role = '律师'; break;
        default: role = '普通用户';
    }
    return {isV, isLawyer, role};
}
