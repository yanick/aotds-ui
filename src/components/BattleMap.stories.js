import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import BattleMap from './BattleMap';

let ships  = [
    { name: 'enkidu', id: 'enkidu', coords: [ 10,-10 ], velocity: 0, heading: 0,
        engine_rating: 10,
        orders: { 
            movement: { thrust: 4, turn: 1 }
        }
    },
    { name: 'siduri', id: 'siduri', coords: [10, 0 ], velocity: 1, heading: 3 },
];

const stories = storiesOf('BattleMap', module)
.addDecorator( withKnobs )
.add('basic', () => {
    return <BattleMap objects={ships}></BattleMap>
  }
  )
.add('orders', () => {
    const ship = { ... ships[0] };
    ship.orders = { movement: {
        thrust: number('thrust', 4),
        turn: number('turn', 1),
    }
    };
    return <BattleMap objects={[ship]}></BattleMap>
  }
  );
