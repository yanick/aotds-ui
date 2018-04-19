import Actions from '../../actions';
import { actions_reducer } from '../utils';
import u from 'updeep';
import fp from 'lodash/fp';

import { plot_movement } from '../../../../node_modules/aotds-battle/lib/movement';

export default actions_reducer({
    FETCH_BATTLE_SUCCESS: ({ battle }) => {
        return () => u({ objects: u.map(
                o => u({ navigation: { course: u.constant(
                    plot_movement(o, fp.get('orders.navigation')(o) )
                ) }})(o)
            ) })(battle);
    },
});
