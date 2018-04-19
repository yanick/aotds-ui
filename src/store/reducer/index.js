import Actions from '../actions';
import { actions_reducer, combine_reducers, pipe_reducers } from './utils';
import u from 'updeep';

import user from './user';
import ui from './ui';
import battle from './battle';

export default pipe_reducers([
    combine_reducers({ user, ui, battle }),
]);
