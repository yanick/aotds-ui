import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, number, boolean } from '@storybook/addon-knobs';

import { WeaponItem } from './WeaponItem';

import { arcs } from 'aotds-battle';

import _ from 'lodash';


const stories = storiesOf('Weapon', module)
.addDecorator( withKnobs )
.add('basic', () => {
   let select_arcs = _.fromPairs(
        _.keys(arcs).map( a => [ a, boolean(a,false) ] )
   );

    console.log( WeaponItem );

    const weapon = {
        type: select('type',['beam'], 'beam'),
        level: number('class', 1),
        arcs: _.keys(arcs).filter( a => select_arcs[a] )
    };

    return <WeaponItem weapon={weapon} />
}
)
