import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import _ from 'lodash';
import u from 'updeep';

import { Slider } from '@blueprintjs/core';
import FieldSet from './FieldSet';

import './Navigation.css';

const debug = require('debug')('aotds:app');

const Maneuver = ({ drive_rating, disabled, maneuver, range, value, amend_orders }) => {
   let denom = 2 * drive_rating + 1;

    let style = {
        width: `${ 100 * (range[1]-range[0]+1) / denom }%`,
        marginLeft:`${ 100 * (drive_rating + range[0]) / denom }%`,
    };

    return <label>{ maneuver } 
    <div className="nav_slider" style={style}>
        <Slider 
            disabled={disabled}
            min={ range[0]}
            max={ range[1]}
            value={value}
            onChange={amend_orders}
            showTrackFill={true}
            labelRenderer={true} />
        </div>
    </label> 
};


export default ({ drive_rating,
    disabled, amend_orders, orders, maneuvers }) => <FieldSet disabled={disabled} legend="navigation">
    { [ 'thrust', 'turn', 'bank' ].map( type => <Maneuver
        drive_rating={ drive_rating }
        maneuver={ type }
        range={ _.get(maneuvers,type, [0,0])  }
        value={ _.get(orders,type, 0)  }
        amend_orders={ value => amend_orders({[type]:value})}
        disabled={disabled}
    /> ) }
</FieldSet>;
