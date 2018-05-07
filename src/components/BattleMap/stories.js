import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { BattleMap } from './index';

let ships = [
    { id: 'Enkidu', navigation: { coords: [ 100, -100], heading: 0 } },
    { id: 'Siduri', navigation: { coords: [ 200, -100], heading: 3 } },
];

ships[0].navigation.course = [
    { coords: [ 100, -100 ] },
    { coords: [ 100, -50 ] }, { coords: [ 125, -0 ], heading: 2 }
];

const store = createStore( (state={}) => state );

import u from 'updeep';

const stories = storiesOf('BattleMap', module)
.addDecorator( withKnobs )
.add('basic', () => {

    ships[1] = u({navigation: {
        coords: [ number( "siduri x", 100 ), number( "siduri y", -100 ) ],
        heading: number( "siduri heading", 3 )
    }})(ships[1]);

    return <Provider store={store}><BattleMap objects={ships} 
            pan_at={ () => true }
            center_on={ [100,-100] }/></Provider>;
});
