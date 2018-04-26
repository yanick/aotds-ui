import Actions from '../../actions';
import { actions_reducer } from '../utils';
import u from 'updeep';
import fp from 'lodash/fp';
import _ from 'lodash';

import { plot_movement } from '../../../../node_modules/aotds-battle/lib/movement';

const weapon_reducer = actions_reducer({
    WEAPON_FIRECON: action => u.if( _.matches({ id: action.weapon_id }),
        { firecon_id: action.firecon_id || null }
    )
});

const bogey_reducer = actions_reducer({
    WEAPON_FIRECON: action => u.if(_.matches({ id: action.bogey_id }), {
        weaponry: { weapons: u.map( w => weapon_reducer(w,action) ) } 
    }),
    AMEND_ORDERS: ({orders}) => state => {
        console.log(orders, " ", state );
        state = u({ orders })(state);
        state = u({ navigation: { course: u.constant(
            plot_movement(state, fp.get('orders.navigation')(state) )
        ) }})(state)
        return state;

    },
    SEND_ORDERS: action => state => {
        if( action.object_id !== state.id ) return state;

        return u({ orders: { done: true } })(state);
    },
});

const array_reducer = reducer => (state = [],action) => state.map(
    item => reducer(item,action)
);

const bogeys_reducer = array_reducer(bogey_reducer);


export default actions_reducer({
    WEAPON_FIRECON: action => u({ objects:  o => bogeys_reducer(o,action) }),
    FETCH_BATTLE_SUCCESS: ({ battle }) => {
        return () => u({ objects: u.map(
                o => u({ navigation: { course: u.constant(
                    plot_movement(o, fp.get('orders.navigation')(o) )
                ) }})(o)
            ) })(battle);
    },
    SEND_ORDERS: action => u({ objects: o => bogeys_reducer(o,action) }),
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
