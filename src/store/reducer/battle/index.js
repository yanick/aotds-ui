import Actions from '~/store/actions';

import { actions_reducer, combine_reducers, pipe_reducers } from '../utils';
import u from 'updeep';
import fp from 'lodash/fp';
import _ from 'lodash';

import bogeys from './bogeys';

const actions_red = actions_reducer({
    FETCH_BATTLE_SUCCESS: ({ battle }) => () => battle, 
});

const subreducers = combine_reducers({
    objects: bogeys
});

export default pipe_reducers([
    actions_red,
    subreducers,  
]);
