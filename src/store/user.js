import Vuex from 'vuex';
import Vue from 'vue';

import jwt from 'jsonwebtoken';

const auth_user_action = ({ commit, dispatch, state: { player, password } }) => {
    commit('auth_processing',true);
    let mess = { player, password };

    let resp;
    fetch( `http://localhost:3000/api/player/${player}/token`, {
        method: 'post',
        body: JSON.stringify(mess),
        headers: {
            'content-type': 'application/json'
        },
    }).then( r => r.json() )
    .then( json => {
        let data  = jwt.decode(json.token);
        dispatch( 'update_auth', { player: data.player, token: json.token } );
    })
    .then( () => commit('auth_processing',false) )
    .catch( e => console.log(e) );
};


export default {
    state: {
        player: localStorage.player || '',
        password: '',
        token: localStorage.token || '',
    },
    getters: {
        is_processing_auth: state => state.is_processing_auth,
        auth_token: state => state.token,
        player_name: state => state.player,
    },
    actions: {
        logout: ({commit}) => {
            delete localStorage.token;
            delete localStorage.player;
            commit('logout');
        },
        authUser: auth_user_action,
        update_auth: ({commit},{ player,token }) => {
            localStorage.token = token;
            localStorage.player = player;
            commit( 'update_auth', { player, token } );
        },
    },
    mutations: {
        logout: state => {
            state.player = null;
            state.token = null;
        },
        update_auth: (state, { player, token } ) => {
            state.token = token;
            state.player = player;
        },
        auth_processing:  (state,is_processing_auth) => Vue.set( state, 'is_processing_auth', is_processing_auth ) ,
        updatePlayer:   (state,player) => state.player = player,
        updatePassword: (state,password) => state.password = password,
    },
};
