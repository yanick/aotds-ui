import React from 'react';
import fp from 'lodash/fp';

import { coords2map, heading2angle } from '../utils';

const coordsTransform = nav => {
    let t = coords2map( nav.coords ).join(',');
    return `rotate( ${ heading2angle(nav.heading) }, ${ t } ) translate(${ t })`
};

export default ({object}) => <g transform={coordsTransform(object.navigation)}>
    <use 
        className="ship_shape"
        href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
</g>;
