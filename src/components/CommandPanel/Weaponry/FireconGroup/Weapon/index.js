import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { arcs } from 'aotds-battle';
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

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees-3) * Math.PI / 6.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 6 ? "0" : "1";

    let d = [
        "M", 16, 16,
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");

    return d;       
}

export const WeaponItem = ({weapon}) => { console.log(weapon); return <div>
    {weapon.type + '-' + weapon.level}
    <svg width="32" height="32">
    { _.flatMap( weapon.arcs, a => arcs[a] ).map( range => {
        return <path d={describeArc(16,16,16,...range) } />
    }
    ) }
    </svg>
</div> };

export default ({weapon}) => 
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
                        <WeaponItem weapon={weapon} />
                    </div>
                  )}
    </Draggable>;
