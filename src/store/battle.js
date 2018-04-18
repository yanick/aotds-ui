import Vuex from './vuex';

import fp from 'lodash/fp';

import { plot_movement } from '../../node_modules/aotds-battle/lib/movement';

const fetch_game = ({ commit,  dispatch, state }, battle_id ) => {
    fetch(`http://localhost:3000/api/battle/${battle_id}`, {
    }).then( r => r.json() )
    .then( battle => commit( 'populate_battle', battle ) );
};

export default {
    state: { },
    getters: {
        battle_name: fp.getOr('unknown')('game.name'),
        battle_turn: fp.getOr('unknown')('game.turn'),
        get_ships: fp.getOr([])('objects'),
    },
    actions: {
        fetch_game,
        set_nav_order: ({commit},action) => {
            commit('set_nav_order',action);
            commit('compute_course',action.object_id);
        },
    },
    mutations: {
        compute_course: (state,id) => {
            fp.getOr([])('objects')(state).filter( o => o.id === id ).forEach( o => {
                o.navigation.course = plot_movement(o, fp.get('orders.navigation')(o) );
            });
        },
//        populate_battle: (state,battle) => Object.assign(state,battle),
        populate_battle: (state,battle) => {
            fp.getOr([])('objects')(state).forEach( o => {
                o.navigation.course = plot_movement(o, fp.get('orders.navigation')(o) );
            });
        },
        set_nav_order: (state, action ) => {
            let ship = state.objects.find( o => o.id === action.object_id );
            ship.orders = ship.orders || {};
            ship.orders.navigation = ship.orders.navigation || {};
            ship.orders.navigation = {
                ...ship.orders.navigation,
                ...fp.pick(['thrust','turn','bank'])(action),
            };
        },
    },
};
