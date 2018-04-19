import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';

import Actions from './actions';

import reducer from './reducer';
import middlewares from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
    let state = {
    };

    if( localStorage.player ) {
        state.user = { player: localStorage.player, token: localStorage.token }
    }

    let store = createStore( reducer, state,
   composeEnhancers( applyMiddleware( ...middlewares) )
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
       const nextRootReducer = require('./reducer/index');
       store.replaceReducer(nextRootReducer);
    });

    return store;
  }
};


// import fp from 'lodash/fp';

// import Vuex from 'vuex';

// import user from './user';
// import battle from './battle';
// import ui from './ui';

// export default new Vuex.Store({
//     getters: {
//         selected_object: state => {
//             let id = state.ui.selected_object;
//             if( !id ) return;

//             return fp.getOr([])('battle.objects')(state).find(
//                 o => o.id === id
//             );
//         }
//     },
//     mutations: {
//         populate_battle: (state,battle) => state.battle = battle,
//     },
//     modules: { user, battle, ui }
// });
