//import "core-js/stable";
import "regenerator-runtime/runtime";
import '@/view/dom.js';
import Vue from 'Vue';
import './src/assets/css/base.css';
const s = new Set([1, 2, 3, 4, 5, 3, 2, 16, 7, 83, 21, 2, 1]);

var w = Object.assign({}, { w: 1, e: 4 })
alert(JSON.stringify(w));
alert([...s]);
function pro(v) {
  return new Promise((resolve) => {
    if (v) {
      resolve('真11')
    } else {
      resolve('假22')
    }
  })
}
pro(true).then(res=>{
  alert(res)
})
async function awaitTest(){
  let res = await pro(true);
  alert(res)
  return res;
}
awaitTest();

new Vue({
  el: '#app'
})
