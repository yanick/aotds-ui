import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';

import Store from './store';

import Actions from './store/actions';

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

let store = Store();

store.dispatch( Actions.fetch_battle('epsilon') );

// Create WebSocket connection.
const ws_client = new WebSocket('ws://localhost:3001');

ws_client.addEventListener('open', function (event) {
    ws_client.send( JSON.stringify({ battle: 'epsilon' }) );
});

// Listen for messages
ws_client.addEventListener('message', function (event) {
    console.log(event);
    store.dispatch( JSON.parse(event.data) );
});

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
