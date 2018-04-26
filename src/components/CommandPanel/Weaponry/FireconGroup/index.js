import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'grey',
  padding: grid,
  width: 250,
});

import Weapon from './Weapon';

export default({ firecon_id, weapons }) => <fieldset>
    <legend> { firecon_id ? 'Firecon ' + firecon_id : 'unassigned' } </legend>
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
