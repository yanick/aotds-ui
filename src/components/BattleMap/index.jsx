import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';

import './style.css';

import MapObject from './MapObject';

export
class BattleMap extends React.Component {

    static defaultProps = {
        objects: [],
    };

    render = () => <div>
        <svg id="battleMap" onMouseMove="mousemove"
            onMousedown="set_panning">

          <g id="pan_translate" >

            { this.props.objects.map( o => 
                <MapObject object={o} /> 
            ) }

          </g>
        </svg>
    </div>;

}

export default connect(
    state => ({ objects: fp.getOr([])('battle.objects')(state) }),
)( BattleMap );

