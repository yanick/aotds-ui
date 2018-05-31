import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

const EntryComponents = {};

EntryComponents.INIT_GAME = () => <li>Battle is joined</li>;

EntryComponents.TODO = ({entry}) => <li>
    TODO: { entry.type }
</li>;

EntryComponents.PLAY_TURN = () => <li>Start of turn</li>;
EntryComponents.MOVE_OBJECTS = () => <li>Movement phase</li>;
EntryComponents.EXECUTE_FIRECON_ORDERS = () => <li>Firing phase</li>;

[ 'FIRE_WEAPONS', 'CLEAR_ORDERS' ].forEach( 
    ignore => EntryComponents[ignore] = () => null 
);

const nice_coords  = coords => coords.map( x => Math.round(x,2) ).join(",")

// TODO hierarchical log?

// TODO prettify object_id into bogey name
// I want the full name (Corvette Enkidu), with the color of the player
EntryComponents.MOVE_OBJECT = ({ entry: { object_id, navigation: { coords, heading, velocity } }}) => <li>
    <span>{ object_id }</span> moving to ({ nice_coords(coords) }), heading: { heading }, velocity: { velocity }
</li>;


export
const LogEntry = ({entry}) => {
    let Comp = EntryComponents[entry.type] || EntryComponents.TODO;
    return <Comp entry={entry} />
};

export
const TurnLog = ({ log }) => <ul>
    { log.map( (entry,i) => <LogEntry key={i} entry={entry} /> ) }
</ul>


export default connect(
    state => { console.log(state); return { log: _.get(state,'battle.log',[]) } },
)( TurnLog);

