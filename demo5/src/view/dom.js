import Vue from 'Vue';
Vue.component('button-counter', {
  data: function () {
    
    return {
      count: 0
    }
  },
  created() {
  },
  template: '<div v-on:click="count++"> <div class="logo"></div> {{ count }} </div>'
})