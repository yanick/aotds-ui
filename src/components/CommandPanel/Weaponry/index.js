import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import u from 'updeep';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const debug = require('debug')('aotds:command');

import FireconGroup from './FireconGroup';

const grid = 8;

class Weaponry extends React.Component {

    constructor(props) {
        super(props);
    }

    targets = () => {
        let bogeys = this.props.bogeys.filter( b => b.id !== this.props.bogey_id );

        let origin = this.props.bogey.navigation.coords;
        const dist =  ({navigation: coords }) => fp.sum( [0,1].map( i => coords[i] - origin[i] 
        ).map( x => x*x ) );

        return fp.sortBy(dist)(bogeys);
    }

    firecon_weapons = () => {
        let { firecons, weapons } = this.props.weaponry;

        let grouped = fp.groupBy( w => w.firecon_id || 0 )( weapons );

        [ 0, ...firecons.map( f => f.id ) ]
            .filter( id => !grouped[id])
            .forEach( id => grouped[id] = [] )

        debug(grouped);

        return grouped;
    };

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) { return; }

        this.props.weapon_firecon( result.draggableId, parseInt( result.destination.droppableId ) );
    }


    render() { 
        let grouped = this.firecon_weapons();
        console.log( "STORE IS: ", this );

        return <fieldset legend="weaponry">
                <legend>weaponry</legend>

                <DragDropContext onDragEnd={this.onDragEnd}>

    {
        [ 0, ...(this.props.weaponry.firecons.map( f => f.id ) ) ]
            .map( id => 
                <FireconGroup 
                bogey_id={this.props.bogey_id}
                    targets={this.targets()}
                    key={id}
                    firecon_id={ id } weapons={ grouped[id] } /> ) }


            </DragDropContext>

            </fieldset>
    }

} 

import Actions from '../../../store/actions';

export default connect(
    state => ({ bogeys: fp.getOr([])('battle.objects')(state) }),
    (dispatch,ownProps) => ({
        weapon_firecon: (weapon_id, firecon_id) => dispatch( Actions.weapon_firecon(
            ownProps.bogey_id, weapon_id, firecon_id
        ) )
    }),
)(Weaponry);
    
                // <fieldset><legend>unassigned</legend>
                //     <div>Beam class 1</div>
                //     <div>Beam class 2</div>
                // </fieldset>

                // <fieldset><legend>firecon 1</legend>
                //     <div>target: <select><option>siduri</option></select></div>
                //     <div>Beam class 1</div>
                // </fieldset>
    //           {this.state.items.map((item, index) => (
    //           ))}
