import React from 'react';

import _ from 'lodash';

import Position from './Position';

import { arcs as Arcs } from 'aotds-battle';

import './ShipWeaponArcs/style.css';

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
        "M", 0, 0,
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");

    return d;       
}

const Arc = ( {x=0,y=0,r=1,from,to }) => <path d={describeArc(x,y,r,from,to) } />;
import { scaled } from './utils';

// for now, all are beams
const WeaponArc = ({ arcs, level }) => <g>
    { _.flatMap( arcs, a => Arcs[a] ).filter( a => a).map( angle => 
        _.times(level).map( l => 
            <g className="weapon_arc">
                <Arc r={ scaled(12*(l+1)) } from={angle[0]} to={angle[1]} /> 
            </g>
        ) 
    )}
</g>;

export default ({ ship }) => <Position 
        x={ _.get(ship,'navigation.coords.0') }
        y={ _.get(ship,'navigation.coords.1') }
        heading={ _.get(ship,'navigation.heading') }
    >
    {
        _.get(ship,'weaponry.weapons',[])
            .filter( w => w.show_range )
            .map( w => <WeaponArc {...w} /> )
    }
</Position>;
