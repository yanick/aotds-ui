import Vuex from './vuex';

import fp from 'lodash/fp';

export default {
    state: { 
        selected_object: null,
        center_on: null,
    },
    getters: {
        center_on: state => state.center_on,
    },
    actions: {
        select_object: ({commit,rootGetters},object_id) => {
            commit('select_object', object_id );
            let coords = fp.get('navigation.coords')( rootGetters.selected_object );
            if(coords) commit('center_on', coords );
        },
        center_on: ({commit},coords) => commit('center_on',coords),
    },
    mutations: {
        select_object: (state,object_id) => {
            state.selected_object = object_id;
        },
        center_on: (state,coords) => {
            console.log( "centering: ", coords );
            state.center_on = coords;
        }
    },
};
