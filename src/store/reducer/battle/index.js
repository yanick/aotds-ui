import Actions from '../../actions';
import { actions_reducer } from '../utils';
import u from 'updeep';
import fp from 'lodash/fp';
import _ from 'lodash';

import { plot_movement } from '../../../../node_modules/aotds-battle/lib/movement';

const bogey_reducer = actions_reducer({
    AMEND_ORDERS: ({orders}) => state => {
        console.log(orders, " ", state );
        state = u({ orders })(state);
        state = u({ navigation: { course: u.constant(
            plot_movement(state, fp.get('orders.navigation')(state) )
        ) }})(state)
        return state;

    },
    SEND_ORDERS_SUCCESS: action => state => {
        if( action.bogey.id !== state.id ) return state;
        state = action.bogey;
        console.log(
                    plot_movement(state, fp.get('orders.navigation')(state) )
        );
        state = u({ navigation: { course: u.constant(
                    plot_movement(state, fp.get('orders.navigation')(state) )
                ) }})(state);
        return state;

    },
});

const array_reducer = reducer => action => state => state.map(
    item => reducer(item,action)
);

const map_bogeys = array_reducer(bogey_reducer);

const bogeys_reducer = map_bogeys;


export default actions_reducer({
    FETCH_BATTLE_SUCCESS: ({ battle }) => {
        return () => u({ objects: u.map(
                o => u({ navigation: { course: u.constant(
                    plot_movement(o, fp.get('orders.navigation')(o) )
                ) }})(o)
            ) })(battle);
    },
    SEND_ORDERS_SUCCESS: action => u({ objects: bogeys_reducer(action) }),
    AMEND_ORDERS: action => store => {
        store = u({ 
            objects: u.map( 
                u.if( _.matches({ id: action.object_id }), 
                    b => bogey_reducer(b,action ) 
                ) 
            )
        })(store);
        return store;
    }
});