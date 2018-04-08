function handler(e){
    let reg = /^(\d|\.|Backspace|Delete)$/;    // 匹配输入的一个数字、小数点或退格
    if( e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 39 && e.keyCode != 37 ){
        if( !reg.test(e.key) ){
            e.preventDefault();
        }
    }
    /*let code = e.keyCode;
    let aNum = [110, 8, 190]; // 110--数字键的点 8--退格 190--主键的点
    let isNum = code > 47 && code < 58 || code > 95 && code < 106 || aNum.includes(code);
    if (!isNum) {
        e.preventDefault();
    }*/
};

export default {
    bind(el) {
        el.addEventListener('keydown', handler);
    },
    unbind(el) {
        el.removeEventListener('keydown', handler);
    }
};
