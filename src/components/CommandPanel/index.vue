<template>
    <div class="commandPanel">
      <div>
          <div class="ship_name">{{ship_name}}</div>

          <div>heading: {{ heading }} 
              velocity: {{ velocity }}
              drive rating: {{ drive_rating }}
          </div>

          <input type="button" :value="orders_sent ? 'orders sent' : 'send orders'" />

        <FieldSet legend="navigation">
            <div>
                <NavSlider :label="field" :min="maneuver[field][0]"
                :max="maneuver[field][1]" :value="nav_orders[field]" 
                :change="send_single_nav_order(field)"
                    v-for="field in nav_fields" />
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
                onChange={e => this.orderMovement("thrust", value)}
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
import NavSlider from './NavSlider.vue';

import u from 'updeep';

const expand_computed = obj => _.mapValues( obj, function(value,key) {
    if( typeof value !== 'string' && !Array.isArray(value) ) return value;

    if( typeof value === 'string' ) value = [ value ];

    value[0] = value[0].replace( '*', key );

    console.log(value);

    return function() { return _.get(this,...value) };
});

// vue2-redux?
export default {
    props: [ 'ship', 'send_orders' ],
    components: { FieldSet, NavSlider },
    data: () => ({ order_thrust: 0, nav_fields: [ 'thrust', 'turn', 'bank' ] }),
    methods: {
        send_single_nav_order: function( path ) {
            return value  => 
                this.send_orders( this.ship.id, _.set({}, 'navigation.' + path, value ) );
        },
        
        stuff: function(event) { console.log(event.target.value) }
    },
    computed: expand_computed({
        ship_name:    [ 'ship.name', 'Unknown' ],
        heading:      'ship.navigation.*',
        velocity:     'ship.navigation.*',
        maneuver:     [ 'ship.navigation.*', { thrust: [0,0], turn: [0,0],
            bank: [0,0] } ],
        nav_orders:     [ 'ship.orders.navigation', { thrust: 0, turn: 0,
            bank: 0 } ],
        drive_rating: 'ship.*',
        orders_sent:  [ 'ship.orders.done', false ],
        move_ranges: function() {
            return ship_move_ranges(this.ship);
        },
    })
}

</script>
