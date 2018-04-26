import React from 'react';

import fp from 'lodash/fp';
import u from 'updeep';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const debug = require('debug')('aotds:command');

const grid = 8;



import FireconGroup from './FireconGroup';

export default
class Weaponry extends React.Component {

    constructor(props) {
        super(props);

        this.state = { firecons: [] }
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

        debug( result );

        debug( result.draggableId );
        let state = u({ firecons: 
            u.map({ weapons:  w => w.filter( w => w.id != result.draggableId )  }) 
        }
        ) (this.state );

        state = u({ firecons: u.map( u.if(  f=> f.id === parseInt(result.destination.droppableId), {
            weapons: w => [ ...w, { id: result.draggableId, name: 'hacky' } ] 
        }))})(state);

        debug(state);
        this.setState(state);
    }


    render() { 
        let grouped = this.firecon_weapons();

        return <fieldset legend="weaponry">
                <legend>weaponry</legend>

                <DragDropContext onDragEnd={this.onDragEnd}>

    {
        [ 0, ...(this.props.weaponry.firecons.map( f => f.id ) ) ]
            .map( id => 
                <FireconGroup 
                    key={id}
                    firecon_id={ id } weapons={ grouped[id] } /> ) }


            </DragDropContext>

            </fieldset>
    }

} 
    
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
