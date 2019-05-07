import '@/view/dom.js';
import Vue from 'Vue';
import './src/assets/css/base.css';
const s = new Set([1,2,3,4,5,3,2,16,7,83,21,2,1]);

var w = Object.assign({},{w:1,e:4})
console.log(w);
console.log([...s]);
function rp(v){
  return new Promise((resolve)=>{
    if(v){
      resolve('真')
    }else{
      resolve('假')
    }
  })
}
var r = rp(false).then(res=>{
  console.log(res);
});

new Vue({
  el:'#app'
})
