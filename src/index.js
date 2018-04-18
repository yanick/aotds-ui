import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';

ReactDOM.render(
    <Main />,
  document.getElementById('app')
);

module.hot.accept();


// import 'babel-register';
// import 'babel-polyfill';
// import Vue from 'vue';
// import './store/vuex';

// import store from './store';


// store.dispatch( 'fetch_game', 'epsilon' );

// import Main from './components/Main.vue';

// new Vue({
//   el: '#app',
//     store,
//     components: { Main },
//   template: "<Main />"
// })
