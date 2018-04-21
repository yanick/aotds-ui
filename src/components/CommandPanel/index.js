import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import u from 'updeep';

import { ProgressBar, Button } from '@blueprintjs/core';

import FieldSet from './FieldSet';
import Navigation from './Navigation';

import Actions from '../../store/actions';

class CommandPanel extends React.Component {
    render() {
        if(!this.props.bogey) return null;
        console.log( this.props.send_orders )

        let drive_fraction = this.props.bogey.drive.current / this.props.bogey.drive.rating;

        let drive_class  = drive_fraction < 1 ? 'pt-intent-warning' : 'pt-intent-primary';

        drive_class = drive_class + ' pt-no-stripes'


        return <div className="command_panel">
            <div>
                <div className="bogey_name">{this.props.bogey.name}</div>
          <div>heading: { this.props.bogey.heading } 
              velocity: { this.props.bogey.velocity }
              <div>
                  drive rating: { this.props.bogey.drive.current } / { this.props.bogey.drive.rating }
            <ProgressBar 
                className={ drive_class }
                value={ drive_fraction }
                />
              </div>
          </div>

            <Button
                text="send orders"
                onClick={ this.props.send_orders }
                />

            <Navigation 
                maneuvers={ fp.get('navigation.course.maneuvers')(this.props.bogey)  }
                orders={ fp.get('orders.navigation')(this.props.bogey) }
                amend_orders={ orders => this.props.amend_orders(
                    { navigation: orders }
                ) }
                    />



            </div>
        </div>;
    }
}

const selected_bogey = state => {
    let id = fp.get('ui.selected_object_id')(state);
    return fp.getOr([])('battle.objects')(state).find( o => o.id === id );
};
import { bindActionCreators } from 'redux';

const mapDispatches = dispatch => ({
        amend_orders: id => orders => dispatch(Actions.amend_orders( id, orders )),
        send_orders: (id,orders) => () => dispatch(Actions.send_orders( id,orders )),
});

export default connect(
    state => ({ 
        bogey: selected_bogey(state),
    }),
    mapDispatches,
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...ownProps,
        amend_orders: dispatchProps.amend_orders( fp.get('bogey.id')(stateProps) ),
        send_orders: dispatchProps.send_orders( fp.get('bogey.id')(stateProps), fp.get('bogey.orders')(stateProps)),
    })
)( CommandPanel );

// <template>
//     <div class="commandPanel">
//       <div>


//           <!-- <input type="button" :value="orders_sent ? 'orders sent' : 'send orders'" /> -->

//         <FieldSet legend="navigation">
//             <div>
//                 <!-- <NavSlider :label="field" :min="maneuver[field][0]" -->
//                 <!-- :max="maneuver[field][1]" :value="nav_orders[field]" --> 
//                 <!-- :change="send_single_nav_order(field)" -->
//                 <!--     v-for="field in nav_fields" /> -->
//                 <label>thrust 
//                     <input type="range" :min="thrust_range[0]"
//                     :max="thrust_range[1]" v-model="thrust_order" />
//                 </label>
//                 <label>turn 
//                     <input type="range" :min="turn_range[0]"
//                     :max="turn_range[1]" v-model="turn_order" />
//                 </label>
//                 <label>bank 
//                     <input type="range" min="0" max="20" value="10" />
//                 </label>
//             </div>
//         </FieldSet>


//         <!-- <fieldset disabled=""> -->
//           <!-- <div> -->
//           <!--   <label for="thrust"> -->
//           <!--     Thrust -->
//           <!--     <input -->
//           <!--       type="range" -->
//           <!--       min="0" -->
//           <!--       max="5" -->
//           <!--       onChange={e => this.orderMovement("thrust", value)} -->
//           <!--     /> -->
//           <!--     <input type="range" name="thrust" /> -->
//           <!--     <span>3</span> -->
//           <!--   </label> -->
//           <!-- </div> -->
//           <!-- <div> -->
//           <!--   <label>Turn</label> -->
//           <!--       slider min={-3} max={3} value={0} /> -->
//           <!-- </div> -->

//           <!-- <input type="button" value="send orders" /> -->
//         <!-- </fieldset> -->
//       <!-- </div> -->
//       <!-- <div objects={objects} ship={object} assign_weapon={assign_weapon} /> -->
//       </div>
//     </div>
// </template>


// <script>

// import { mapActions, mapGetters } from 'vuex';


// // TODO go from _ to fp
// import _ from 'lodash';
// import fp from 'lodash/fp';
// import FieldSet from './FieldSet.vue';
// import NavSlider from './NavSlider.vue';

// import u from 'updeep';

// const expand_computed = entries => _.mapValues( entries, function(value,key) {
//     if( typeof value !== 'string' && !Array.isArray(value) ) return value;

//     if( typeof value === 'string' ) value = [ value ];

//     value[0] = value[0].replace( '&', key );

//     console.log(value, "!", key);

//     return function() { return fp.getOr( value[1] )(value[0] )(this) };
// });

// // vue2-redux?
// export default {
//     components: { FieldSet, NavSlider },
//     data: () => ({ order_thrust: 0, nav_fields: [ 'thrust', 'turn', 'bank' ] }),
//     methods: {
//         ...mapActions([ 'set_nav_order' ]),
//     },
//     computed: {
//         turn_order: {
//             set: function(x) { this.set_nav_order({ object_id:
//                 this.selected_object.id, turn: parseInt(x) }) },
//             get: function() { return fp.getOr(0)('nav_orders.turn')(this) },
//         },
//         thrust_order: {
//             set: function(x) { this.set_nav_order({ object_id:
//                 this.selected_object.id, thrust: parseInt(x) }) },
//             get: function() { return fp.getOr(0)('nav_orders.thrust')(this) },
//         },
//         ...mapGetters( [ 'selected_object' ] ),
//         ...expand_computed({
//             heading: 'selected_object.navigation.&',
//             name: [ 'selected_object.name', 'Unknown' ],
//             velocity:     'selected_object.navigation.&',
//             drive: 'selected_object.&',
//             course: 'selected_object.navigation.&',
//             bank_range: 'course.maneuvers.bank',
//             turn_range: 'course.maneuvers.turn',
//             thrust_range: 'course.maneuvers.thrust',
//             nav_orders: 'selected_object.orders.navigation',
//             bank_order: [ 'nav_orders.bank', 0 ],
//         }),
//     },
// //    expand_computed({
// //        ship_name:    [ 'ship.name', 'Unknown' ],
// //        maneuver:     [ 'ship.navigation.*', { thrust: [0,0], turn: [0,0],
// //            bank: [0,0] } ],
// //        nav_orders:     [ 'ship.orders.navigation', { thrust: 0, turn: 0,
// //            bank: 0 } ],
// //        orders_sent:  [ 'ship.orders.done', false ],
// //        move_ranges: function() {
// //            return ship_move_ranges(this.ship);
// //        },
// //    })
// }

// </script>
