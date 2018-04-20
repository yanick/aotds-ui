import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import _ from 'lodash';
import u from 'updeep';

import { Slider } from '@blueprintjs/core';
import FieldSet from './FieldSet';

const debug = require('debug')('aotds:app');

const Maneuver = ({ maneuver, range, value, amend_orders }) => <label>{ maneuver } 
        <Slider 
            style="width: 200px"
            min={ range[0]}
            max={ range[1]}
            value={value}
            onChange={amend_orders}
            showTrackFill={true}
            labelRenderer={true} />
    </label>


export default ({ amend_orders, orders, maneuvers }) => <FieldSet legend="navigation">
    { [ 'thrust', 'turn', 'bank' ].map( type => <Maneuver
        maneuver={ type }
        range={ _.get(maneuvers,type, [0,0])  }
        value={ _.get(orders,type, 0)  }
        amend_orders={ value => amend_orders({[type]:value})}
    /> ) }
</FieldSet>;
