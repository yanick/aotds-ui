import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';

import Store from './store';

import Actions from './store/actions';

let store = Store();

store.dispatch( Actions.fetch_battle('epsilon') );

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
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
