import fp from 'lodash/fp';

import Vuex from 'vuex';

import user from './user';
import battle from './battle';
import ui from './ui';

export default new Vuex.Store({
    getters: {
        selected_object: state => {
            let id = state.ui.selected_object;
            if( !id ) return;

            return fp.getOr([])('battle.objects')(state).find(
                o => o.id === id
            );
        }
    },
    mutations: {
        populate_battle: (state,battle) => state.battle = battle,
    },
    modules: { user, battle, ui }
});
