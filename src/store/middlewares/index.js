import fp from 'lodash/fp';
import Actions from '../actions';

import Rest from 'another-rest-client';

const rest_client = new Rest( 'http://localhost:3000/api' );
rest_client.res({
    battle: {
        ship: 'orders'
    },
});


function mw_for( target, inner ) {
    return store => next => action => {
        let func = next;

        if( action.type === target ) {
            func = inner(store)(next);
        }

        return func(action);
    };
}

const MW_new_turn_available = mw_for( 'NEW_TURN_AVAILABLE', ({dispatch,getState}) => next => action => {
    next(action);
    dispatch(Actions.fetch_battle( 
        getState().battle.game.name
    ) );
});

const MW_auth_user_success = mw_for( 'AUTH_USER_SUCCESS', ({dispatch}) => next => action => {
    console.log("!!!");
    next(action);
    localStorage.player = action.player;
    localStorage.token = action.token;
});

const MW_auth_user = mw_for( 'AUTH_USER', ({dispatch}) => next => action => {

    next(action);

    let resp;
    fetch( `http://localhost:3000/api/player/${action.player}/token`, {
        method: 'post',
        body: JSON.stringify(action),
        headers: {
            'content-type': 'application/json'
        },
    }).then( r => r.json() )
    .then( json => {
        let data  = jwt.decode(json.token);
        dispatch( Actions.auth_user_success( data.player, json.token ) );
    })
});

const MW_logout = mw_for( 'LOGOUT', () => next => action => {

    next(action);

    delete localStorage.player;
    delete localStorage.token;
});

const MW_send_orders = mw_for( Actions.SEND_ORDERS, ({dispatch,getState}) => next => action => {
    next(action);

    let state = getState();
    let battle_id = fp.get( 'battle.game.name' )( state );

    rest_client.battle(battle_id).ship(action.object_id).orders.post(
        action.orders || {} ).then( bogey => dispatch( Actions.send_orders_success( bogey ) ) );
});

const MW_fetch_game = mw_for( 'FETCH_BATTLE', ({dispatch}) => next => action => {

    next(action);

    fetch(`http://localhost:3000/api/battle/${action.battle_id}`, {
    }).then( r => r.json() )
    .then( battle => dispatch( Actions.fetch_battle_success(battle) ) )
    .catch( e => console.log("failed to grab battle", e) );

});

const dist_from = origin => coords => fp.sum( [0,1]
    .map( i => origin[0] - coords[0] )
    .map( i => i*i ) );

function find_center_ship(objects) {
    let coords = objects.map( fp.get('navigation.coords') );
    let middle = fp.pipe(
        fp.map( i => coords.map( c => c[i] ) ),
        fp.map( fp.mean ),
    )([0,1]);

    let dist = dist_from(middle);

    let closest = fp.minBy( s => dist( s.navigation.coords ) )( objects );

    return closest;
}


// start by zeroing in on the middle ship
const MW_initial_select = mw_for( 'FETCH_BATTLE_SUCCESS', ({dispatch,getState}) => next => action => {
    console.log(1);
    next(action);
    console.log(2);

    // already selected? Okay, fine
    if( fp.get('ui.selected_object_id')(getState()) ) return;

    let ship = find_center_ship( action.battle.objects );

    dispatch(Actions.select_object( ship.id ) );
});

const MW_center_on_select = mw_for( Actions.SELECT_OBJECT, ({dispatch, getState}) => next => action => {
    next(action);

    let state = getState();

    let id = state.ui.selected_object_id;

    let ship = state.battle.objects.find( o => o.id === id );

    dispatch(Actions.center_on( ship.navigation.coords ) );
});


export default [MW_fetch_game, MW_auth_user, MW_auth_user_success,
    MW_initial_select, MW_center_on_select, MW_send_orders,
    MW_new_turn_available
];
