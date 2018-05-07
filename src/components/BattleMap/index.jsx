import React from 'react';
import { connect } from 'react-redux';

import SVG from 'svg.js';
import fp from 'lodash/fp';

import './style.css';

import Actions from '../../store/actions';

import MapObject from './MapObject';
import ObjectCourse from './ObjectCourse';

const debug = require('debug')('aotds:app');

import { coords2map } from './utils';

export
class BattleMap extends React.Component {

    static defaultProps = {
        objects: [],
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ panner: SVG.select('g#pan_translate') });
        this.center();
    }

    componentDidUpdate() {
        this.center();
    }

    center() {
        let  center_on = this.props.center_on;
        debug( 'SAH!', center_on );
        if(!center_on) return;

        if(!this.state) return;

        debug( "must center on ", center_on );
        debug( this.myRef);
        let point = coords2map(center_on);
        let elt = this.myRef.current;
        let bbox = [ elt.offsetWidth, elt.offsetHeight ];

        let trans= [0,1].map( i => bbox[i]/2 - point[i] );

        this.state.panner.animate(500, '-').move( ...trans ).after( () => {
            this.props.pan_at(null);
        });
    }

    set_panning = ({ clientX, clientY }) => {
        this.setState({ previous_point: [ clientX, clientY ] });
    };

   mousemove = ({clientX, clientY, buttons}) => {
       // not dragging
        if(! buttons & 1 ) return;

       if(! this.state.previous_point ) return;

        let delta = [ clientX - this.state.previous_point[0], clientY -
            this.state.previous_point[1] ];

        this.setState({ previous_point: [ clientX, clientY ]});
        
        this.state.panner.dmove(...delta);
   };

    render = () => <div ref={this.myRef}>
        <svg id="battleMap" onMouseMove={this.mousemove}
            onMouseDown={this.set_panning }>

          <g id="pan_translate" >
            { this.props.objects.map( o => 
                <ObjectCourse object={o} /> 
            ) }

            { this.props.objects.map( o => 
                <MapObject object={o} /> 
            ) }

          </g>
        </svg>
    </div>;

}

export default connect(
    state => ({ 
        objects: fp.getOr([])('battle.objects')(state),
        center_on: fp.get('ui.center_on')(state),
    }),
    dispatch => ({
        pan_at: coords => dispatch(Actions.center_on(coords) )
    }),
)( BattleMap );

