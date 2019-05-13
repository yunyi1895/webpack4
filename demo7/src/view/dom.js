import Vue from 'Vue';
import imgUrl from '../assets/image/logo.png';
Vue.component('button-counter', {
  data: function () {
    
    return {
      count: 0
    }
  },
  created() {
  },
  template: `
  <div v-on:click="count++"> <img src="${imgUrl}" alt=""><div class="logo"></div> {{ count }} </div>`
})