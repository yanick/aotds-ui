import _ from 'lodash';

import '../../../index.css';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Structure from './index';

const stories = storiesOf('Ship structure', module)
.addDecorator( withKnobs )
.add('basic', () => {
    let struct = object( 'structure', {
        shields: [ { id: 1, level: 1 }, { id:2, level: 2 }  ],
        hull: { current: 3, max: 6 },
        armor: { current: 4, max: 8 },
    }, 'foo' );
    return <Structure { ...struct } />
}
)
