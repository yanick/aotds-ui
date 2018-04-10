import Vuex from './vuex';

import fp from 'lodash/fp';

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
    },
    mutations: {
//        populate_battle: (state,battle) => Object.assign(state,battle),
    },
};
