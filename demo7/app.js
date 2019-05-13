// import "core-js/stable";
import "regenerator-runtime/runtime";
import '@/view/dom.js';
import Vue from 'Vue';
import './src/assets/css/base.less';
import imgUrl from './src/assets/image/logo.png';
let img = document.createElement('img');
img.src=imgUrl;
let d = document.createElement('div');
d.className="logo"
document.getElementById('app').appendChild(d);
document.getElementById('app').appendChild(img);
// async function awaitTest(){
//   let res = await pro(true);
//   console.log(res)
//   return res;
// }
// awaitTest();

// new Vue({
//   el: '#app'
// })
