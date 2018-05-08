import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import u from 'updeep';

import { coords2map, heading2angle } from '../utils';
import Actions from '../../../store/actions';

import Position from '../Position';

const coordsTransform = nav => {
    console.log("transforming", nav);
    nav = u.if( !nav.coords, { coords: [0,0] } )(nav);
    let t = coords2map( nav.coords ).join(',');
    return `rotate( ${ heading2angle(nav.heading) }, ${ t } ) translate(${ t })`
};

const MapObject = ({object, select_object}) => <Position
    x={ fp.get('navigation.coords.0')(object) }
    y={ fp.get('navigation.coords.1')(object) }
    heading={ fp.get('navigation.heading')(object) } >
    <use 
        onClick={ select_object } 
        className="ship_shape"
        href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
</Position>;

export default connect(
    null,
    (dispatch,{object}) => ({ select_object: 
        () => dispatch( Actions.select_object(object.id) ) }),
)( MapObject );
