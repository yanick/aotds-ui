<template>
    <div class="commandPanel">
      <div>
          <div class="ship_name">{{ship.name}}</div>

          <div>heading: {{ heading }}, 
              velocity: {{ velocity }}</div>

          <input type="button" 
                 :value="order_label" 
            />
        <div>Orders sent</div>

        <FieldSet legend="navigation">
            <div>
                <div>
                    heading: XXX velocity: XXX
                </div>
                <div>drive rating: XXX</div>
                <div>
                    <label>thrust 
                        <span>
                            {{ move_ranges.thrust[0] }}
                            <input type="range" 
                                :min="move_ranges.thrust[0]"
                                :max="move_ranges.thrust[1]" 
                                v-model="order_thrust" />
                            {{ move_ranges.thrust[1] }}
                            -
                            <b>10</b>
                        </span>
                    </label>
                </div>
                <label>turn 
                    <input type="range" min="0" max="20" value="10" />
                </label>
                <label>bank 
                    <input type="range" min="0" max="20" value="10" />
                </label>
            </div>
        </FieldSet>


        <fieldset disabled="">
          <div>
            <label for="thrust">
              Thrust
              <input
                type="range"
                min="0"
                max="5"
                onChange={e => this.orderMovement("thrust", e.target.value)}
              />
              <input type="range" name="thrust" />
              <span>3</span>
            </label>
          </div>
          <div>
            <label>Turn</label>
                slider min={-3} max={3} value={0} />
          </div>

          <input type="button" value="send orders" />
        </fieldset>
      </div>
      <div objects={objects} ship={object} assign_weapon={assign_weapon} />
    </div>
</template>


<script>

import _ from 'lodash';
import FieldSet from './FieldSet.vue';

let Ship = {
    name: 'string',
    id: { type: 'string', required: true },
    drive_rating: 'number',
    navigation: {
        heading: 'number',
        velocity: 'number',
    },
    orders: {
        done: 'boolean',
        navigation: {
            thrust: 'number',
            bank: 'number',
            thrust: 'number',
        },
    },
};

let MoveRanges = {
    thrust: { ArrayOf: [ 'number', 'number' ], },
    bank:   { ArrayOf: [ 'number', 'number' ], },
    turn:   { ArrayOf: [ 'number', 'number' ], },
}

import u from 'updeep';

function ship_move_ranges( ship, orders ) {
    if(!orders) {
        orders = _.get( ship, 'orders.navigation', {} );
        
        [ 'thrust', 'bank', 'turn' ].filter( a => ! orders[a] ).forEach
    }

    ['thrust','bank','turn'].forEach( a => {
        orders = u({ [a]: 0}, orders);
    });

    let rating_left = _.get( ship, 'drive.rating[0]', 0 ) - _.sum( [ 'thrust', 'bank',
        'turn' ].map( a => _.get( orders, a, 0 ) ) );

    let ranges = {
        thrust: [ -rating_left, rating_left ].map( x => x + orders.thrust )
    };

    return {
        thrust: [ 0, 5 ],
        turn:   [ -3, 3 ],
        bank:   [ -3, 3 ],
    };
}

// vue2-redux?
export default {
    props: [ 'ship' ],
    components: { FieldSet },
    computed: {
        move_ranges: function() {
            return ship_move_ranges(this.ship);
        },
        projected_course: function() { },
        heading:  function() { return _.get( this, 'ship.navigation.heading', 0 ) },
        velocity: function() { return _.get( this, 'ship.navigation.velocity', 0 ) },
        orders_sent: function() { 
            return _.get( this, 'ship.orders.done', false ) },
        order_label: function() { return this.orders_sent ? 'orders sent' :
                'send orders' },
        order_thrust: {
            get() { return 2 },
            set(value) { console.log('yo',value); }

        },
//        order_thrust: function() { return _.get(this, 'ship.orders.navigation.thrust', 0 ) }
    }
}

</script>
