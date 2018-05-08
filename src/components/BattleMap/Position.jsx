import React from 'react';

import { coords2map, heading2angle } from './utils';

const coordsTransform = (coords,heading) => {
    let t = coords2map( coords ).join(',');
    return `rotate( ${ heading2angle(heading) }, ${ t } ) translate(${ t })`
};

export default ({ children, x=0, y=0, heading=0 }) => <g 
    transform={coordsTransform([x,y],heading)}>
        {children}
</g>;
