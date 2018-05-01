import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: grid,
  width: 250,
});

import Weapon from './Weapon';

export default({ targets, firecon_id, weapons }) => <fieldset>
    <legend> { firecon_id ? 'Firecon ' + firecon_id : 'unassigned' } </legend>

    { firecon_id > 0 &&
        <select>
        <option value=""></option>
        { targets.map( t => <option value={ t.id }>{ t.name }</option> ) }
        </select>
    }

    <Droppable key={firecon_id} droppableId={ ""+firecon_id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={getListStyle(droppableSnapshot.isDraggingOver)}
            >
              { weapons.map( w => <Weapon weapon={w} /> ) }
              {droppableProvided.placeholder}
            </div>
          )}
    </Droppable>
</fieldset>;
