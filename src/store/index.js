import Vuex from 'vuex';

import user from './user';
import battle from './battle';

export default new Vuex.Store({
    mutations: {
        populate_battle: (state,battle) => state.battle = battle,
    },
    modules: { user, battle }
});
