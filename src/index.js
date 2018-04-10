import 'babel-register';
import 'babel-polyfill';
import Vue from 'vue';
import './store/vuex';

import store from './store';


store.dispatch( 'fetch_game', 'epsilon' );

import Main from './components/Main.vue';

new Vue({
  el: '#app',
    store,
    components: { Main },
  template: "<Main />"
})
