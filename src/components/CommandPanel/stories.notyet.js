import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
//import { action } from '@storybook/addon-actions';

import CommandPanel from './index.vue';

let enkidu = {
    id: 'enkidu',
    name: 'Enkidu',
    navigation: {
        heading: 3,
        velocity: 4,
        coords: [ 5, 7 ],
        maneuver: {
            thrust: [0, 5],
            turn: [ -2, 2 ],
            bank: [ -2, 2 ],
        },
    },
    drive_rating: 8,
};

console.log(CommandPanel);
// CommandPanel.computed.order_thrust.set = action( 'set-thrust' );


const stories = storiesOf('CommandPanel', module)
.addDecorator( withKnobs )
.add('basic', () => {
//    enkidu.orders.done = boolean( 'orders sent');
//    console.log( '>>', enkidu.orders.done );
    console.log("!");
    return {
        components: {  CommandPanel },
        data: () => ({
            ship: enkidu,
            send_orders: action('send_orders'),

        }),
        template: '<CommandPanel :ship="ship" :send_orders="send_orders" />'
    }}
)
