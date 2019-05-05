import Vue from 'Vue';
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">组件 {{ count }} </button>'
})