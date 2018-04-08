function handler(e){
    let reg = /^(\d|\.)$/;    // 匹配一个数字或小数点
    if( !reg.test(e.key) ){
        e.preventDefault();
    }
    /*let code = e.keyCode;
    let aNum = [110, 8, 190]; // 110--数字键的点 8--退格 190--主键的点
    let isNum = code > 47 && code < 58 || code > 95 && code < 106 || aNum.includes(code);
    if (!isNum) {
        e.preventDefault();
    }*/
};

function handlerUp(e){
    let reg = /\d+(.\d+)?/
    console.log(e.target.value)
    if( reg.test(e.target.value) ){
        console.log('包含')
    }
};

export default {
    bind(el) {
        el.addEventListener('keydown', handler);
        // el.addEventListener('keyup', handlerUp);
    },
    unbind(el) {
        el.removeEventListener('keydown', handler);
        // el.removeEventListener('keyup', handlerUp);
    }
};