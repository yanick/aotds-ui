import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';

import Actions from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function mw_for( target, inner ) {
    return store => next => action => {
        let func = next;

        if( action.type === target ) {
            func = inner(store)(next);
        }

        return func(action);
    };
}

const MW_auth_user_success = mw_for( 'AUTH_USER_SUCCESS', ({dispatch}) => next => action => {
    console.log("!!!");
    next(action);
    localStorage.player = action.player;
    localStorage.token = action.token;
});

const MW_auth_user = mw_for( 'AUTH_USER', ({dispatch}) => next => action => {

    next(action);

    let resp;
    fetch( `http://localhost:3000/api/player/${action.player}/token`, {
        method: 'post',
        body: JSON.stringify(action),
        headers: {
            'content-type': 'application/json'
        },
    }).then( r => r.json() )
    .then( json => {
        let data  = jwt.decode(json.token);
        dispatch( Actions.auth_user_success( data.player, json.token ) );
    })
});

const MW_logout = mw_for( 'LOGOUT', () => next => action => {

    next(action);

    delete localStorage.player;
    delete localStorage.token;
});

const MW_fetch_game = mw_for( 'FETCH_BATTLE', ({dispatch}) => next => action => {

    next(action);

    fetch(`http://localhost:3000/api/battle/${action.battle_id}`, {
    }).then( r => r.json() )
    .then( battle => dispatch( Actions.fetch_battle_success(battle) ) )
    .catch( e => console.log("failed to grab battle") );
});

let reducer = (state = {}, action ) => {

    if( action.type === Actions.FETCH_BATTLE_SUCCESS ) {
        return { ...state, battle: action.battle }
    }

    if( action.type === Actions.AUTH_USER_SUCCESS ) {
        return { ...state, user: {
            player: action.player,
            token:  action.token,
        }}
    }

    if( action.type === Actions.LOGOUT ) {
        return { ...state, user: {} }
    }


    return state;
};


export default () => {
    let state = {
    };

    if( localStorage.player ) {
        state.user = { player: localStorage.player, token: localStorage.token }
    }

    let store = createStore( reducer, state,
   composeEnhancers( applyMiddleware( MW_fetch_game, MW_auth_user, MW_auth_user_success ) )
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
    //   const nextRootReducer = require('../reducers/index');
    //   store.replaceReducer(nextRootReducer);
    // });

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
