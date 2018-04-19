import Actions from '../actions';
import { actions_reducer, combine_reducers, pipe_reducers } from './utils';
import u from 'updeep';

import user from './user';
import ui from './ui';

let reducer = actions_reducer({
    FETCH_BATTLE_SUCCESS: ({ battle }) => u({ battle: u.constant(battle) }),
});

export default pipe_reducers([
    reducer, combine_reducers({ user, ui }),
]);
