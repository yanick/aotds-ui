import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import _ from 'lodash';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'red',

  // styles we need to apply on draggables
  ...draggableStyle,
});

import WeaponItem from './WeaponItem';

export default ({weapon,bogey_id}) => 
    <Draggable 
        key={weapon.id} draggableId={weapon.id} index={weapon.id}>
        {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style
                      )}
                    >
                        <WeaponItem weapon={weapon} bogey_id={bogey_id} />
                    </div>
                  )}
    </Draggable>;
