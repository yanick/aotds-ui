import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
//import { action } from '@storybook/addon-actions';

import CommandPanel from './index.vue';

let enkidu = {
    name: 'Enkidu',
    navigation: {
        course: 3,
        velocity: 4,
    },
    drive_rating: 4,
    orders: {
        done: false,
    },
};

console.log(CommandPanel);
CommandPanel.computed.order_thrust.set = action( 'set-thrust' );


const stories = storiesOf('CommandPanel', module)
.addDecorator( withKnobs )
.add('basic', () => {
    enkidu.orders.done = boolean( 'orders sent');
    console.log( '>>', enkidu.orders.done );
    return {
        components: {  CommandPanel },
        data: () => ({
            ship: enkidu,
        }),
        template: '<CommandPanel :ship="ship" />'
    }}
)
