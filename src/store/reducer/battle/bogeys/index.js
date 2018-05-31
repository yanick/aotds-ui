import { actions_reducer, combine_reducers, pipe_reducers } from '../../utils';

import { plot_movement } from '../../../../../node_modules/aotds-battle/lib/movement';

import u from 'updeep';
import fp from 'lodash/fp';
import _ from 'lodash';


const if_matches = _.curry( ( cond, update ) => {
    if( typeof cond !== 'function' ) {
        cond = _.matches({ id: cond });
    }
    return u.if( cond, update );
});

const weapon_reducer = actions_reducer({
    SHOW_WEAPON_ARC: action => if_matches(action.weapon_id, {
        show_range: action.show 
    }),
    WEAPON_FIRECON: action => u.if( _.matches({ id: action.weapon_id }),
        { firecon_id: action.firecon_id || null }
    )
});

const weapons_orders_reducer = actions_reducer({
    WEAPON_FIRECON: action => state => {
        let { weapon_id, firecon_id } = action;

        if ( state.find( o => o.weapon_id === weapon_id ) ) {
            return u.map(
                u.if( _.matches({ weapon_id }), { firecon_id } )
            )(state)
        }

        return [ ...state,  { weapon_id, firecon_id } ];
    },
},[]);

let inner_bogey_reducer = actions_reducer({
    SHOW_WEAPON_ARC: action => u.if(_.matches({ id: action.bogey_id }), {
        weaponry: { weapons: u.map( w => weapon_reducer(w,action) ) },
    }),
    WEAPON_FIRECON: action => u.if(_.matches({ id: action.bogey_id }), {
        weaponry: { weapons: u.map( w => weapon_reducer(w,action) ) },
        orders: { weaponry: { weapons: w => weapons_orders_reducer(w, action ) } },
    }),
    AMEND_ORDERS: ({orders}) => state => {
        if( action.object_id !== state.id ) return state;
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

    // recompute the movements
    FETCH_BATTLE_SUCCESS: action => ship => {
        debugger;
        console.log('YUP'); 
        return u({
        navigation: { course: u.constant(
            plot_movement(ship, fp.get('orders.navigation')(ship) )
        )}
    })(ship) }
    ,
});

let bogey_reducer = (state,action) => {
    return inner_bogey_reducer(state,action);
};

const array_reducer = reducer => (state = [],action) => state.map(
    item => reducer(item,action)
);

export default array_reducer(bogey_reducer);

