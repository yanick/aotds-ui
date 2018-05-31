import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, boolean, array } from '@storybook/addon-knobs';

import { TurnLog } from './index';

import u from 'updeep';

import log from './log_sample';

const stories = storiesOf('TurnLog', module)
.addDecorator( withKnobs )
.add('basic', () => {

    return <TurnLog log={log} />;
})
