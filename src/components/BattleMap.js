import React from 'react';
import _ from 'lodash';

import { _if } from './react-helpers';

import generic_ship from './shapes/ship/generic.svg';

import './BattleMap/style.scss';

const SVG_SCALE = 35;

const coordsToSvg = coords => [ coords[0], - coords[1] ].map( x => SVG_SCALE * x );

const ObjectSymbol = ( { coords, heading } ) => {
    let ref = '#' + generic_ship.id;
    console.log(generic_ship);
    let viewBox = generic_ship.viewBox.split( ' ' ).map( x => parseInt(x) );
    coords = coordsToSvg( coords);
    heading = 30 * heading;
    let rotation = [ heading, ...coords ].join( ' ' );
    coords[0] = coords[0] - ( viewBox[2] ) / 2;
    coords[1] = coords[1] - ( viewBox[3] ) / 2;
    return <use xlinkHref={ref} width="35px" height="35px"
            transform={`rotate(${rotation})`}
            x={ coords[0]  }
            y={ coords[1] }
        />
};

const BattleMapObject = ({object}) => {
    let ref = '#' + generic_ship.id;
    return <ObjectSymbol coords={object.coords} heading={ object.heading } />
};



const trajectorySegmentToPath = segment => {
    switch ( segment[0] ) {
        case 'POSITION': return  [ 'M', ...coordsToSvg( segment[1] ) ];
        case 'MOVE':     return  [ 'l', ...coordsToSvg( segment[1] ) ];
        default:         return [];
    }
};

const trajectoryToPath = trajectory => {
    return _.flatten( trajectory.map( trajectorySegmentToPath ) ).join( ' ' )
};

import { gen_ship_movement } from 'battle/movement';

const Trajectory = ({object}) => {
    let movement = object::gen_ship_movement( _.get( object, 'orders.movement', {} ) );
    console.log( movement );

    return <g className="trajectory">
            <path 
                stroke="blue"
                strokeWidth="3px"
                fill="none"
                d={ trajectoryToPath(movement.trajectory) }
            />

        <ObjectSymbol coords={ movement.coords } heading={ movement.heading } />
    </g>

};

import {ReactSVGPanZoom} from 'react-svg-pan-zoom';


export default ({ objects }) => ( <ReactSVGPanZoom
    width={ 400 } height={ 400 } tool="pan" toolbarPosition="none">
    <svg width={ 400 } height={ 400 }>

    <g>
    { objects.map( o => <Trajectory object={o} /> ) }
    </g>

    <g>
    { objects.map( o => <BattleMapObject object={o} /> ) }
    </g>
</svg>
    </ReactSVGPanZoom>
);


