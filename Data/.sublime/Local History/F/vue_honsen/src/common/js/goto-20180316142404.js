/* 
    目前参数只能是对象
    用法跟push({name:''})一样
*/
import {createRandom} from './createRandom';

export function goTo(obj) {
    obj.query = Object.assign(obj.query || {}, {randomNum: createRandom()});
    this.$router.push(obj);
}