import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
//import { action } from '@storybook/addon-actions';

import CommandPanel from './index';

let enkidu = {
    name: 'enkidu'
};

const stories = storiesOf('CommandPanel', module)
//.addDecorator( withKnobs )
.add('basic', () => {
    return <CommandPanel 
        object={enkidu}
        dispatchOrderMovement={ action( 'ORDER_MOVEMENT' ) }
        ></CommandPanel>
  }
)
