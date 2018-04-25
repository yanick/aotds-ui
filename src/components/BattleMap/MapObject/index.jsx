import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';

import { coords2map, heading2angle } from '../utils';
import Actions from '../../../store/actions';

const coordsTransform = nav => {
    let t = coords2map( nav.coords ).join(',');
    return `rotate( ${ heading2angle(nav.heading) }, ${ t } ) translate(${ t })`
};

const MapObject = ({object, select_object}) => <g 
    onClick={ select_object }
    transform={coordsTransform(object.navigation)}>
    <use 
        className="ship_shape"
        href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
</g>;

export default connect(
    null,
    (dispatch,{object}) => ({ select_object: 
        () => dispatch( Actions.select_object(object.id) ) }),
)( MapObject );
