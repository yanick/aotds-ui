import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';

import BattleMap from './index.vue';

let ships = [
    { id: 'Enkidu', navigation: { coords: [ 100, -100], heading: 0 } },
    { id: 'Siduri', navigation: { coords: [ 200, -100], heading: 3 } },
];

ships[0].navigation.course = [
    { coords: [ 100, -100 ] },
    { coords: [ 100, -50 ] }, { coords: [ 125, -0 ], heading: 2 }
];

const stories = storiesOf('BattleMap', module)
.addDecorator( withKnobs )
.add('basic', () => {
    ships[1].navigation = {
        coords: [ number( "siduri x", 1000 ), number( "siduri y", -100 ) ],
        heading: number( "siduri heading", 3 )
    };

    return {
        components: {  BattleMap },
        data: () => ({
            ships
        }),
        template: '<BattleMap :ships="ships" />'
    }}
)
