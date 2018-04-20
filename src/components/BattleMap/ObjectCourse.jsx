import React from 'react';

import fp from 'lodash/fp';

import Actions from '../../store/actions';

const debug = require('debug')('aotds:app');

import { coords2map } from './utils';

import MapObject from './MapObject';

function path_for( trajectory = [] ) {
    return 'M ' + 
            trajectory.map( p => p.coords ).filter( p => p ).map( coords2map )
            .map( c => c.join( ',' ) ).join( ' L ' ) ; 
}
export default ({ object }) => {
    let course = fp.get('navigation.course' )(object);
    if(!course) return null;

    object = { ...object, navigation: course };

    return <g className="course" opacity="0.5">
        <path d={ path_for(course.trajectory) }
                fill="none"
                stroke="red" strokeWidth="3" />

        <MapObject object={object} />
    </g>;
};
