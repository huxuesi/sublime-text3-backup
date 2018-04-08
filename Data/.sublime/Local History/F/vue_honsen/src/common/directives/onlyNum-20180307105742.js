function handler(e){
    console.log(e.target.value)
    let reg = /^(\d|\.|Backspace)$/;    // 匹配输入的一个数字、小数点或退格
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
    let reg = /^[^(\d|\.)]+$/;
    if( reg.test(e.target.value) ){
        console.log('包含非法')
    }
};

export default {
    bind(el) {
        el.addEventListener('keydown', handler);
        el.addEventListener('keyup', handlerUp);
    },
    unbind(el) {
        el.removeEventListener('keydown', handler);
        el.removeEventListener('keyup', handlerUp);
    }
};