import React from 'react';

function coordsTransform  () { return '' };

class 

export default ({object}) => {
    <g transform={coordsTransform}>
    <use 
        class="ship_shape"
        href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
</g>};

// <template>
// </template>

// <script>

// import { mapGetters, mapMutations } from 'vuex';

// import { coords2map, heading2angle } from './utils';

// export default {
//     props: [ 'ship' ],
//     methods: mapMutations([ 'center_on_selection' ]),
//     computed: {
//         ...mapGetters([ 'should_center_on_selection', 'selected_object' ]),
//         must_center: function() {
//             console.log('!!!',this.should_center_on_selection);
//             if( !this.should_center_on_selection ) return false;

//             if( !this.selected_object || this.selected_object.id !== this.ship.id )
//                 return false;

//             console.log("but now we should flip");
//             this.center_on_selection(false);

//             return true;
//         },
//         heading: function(){ return this.ship.navigation.heading },
//         coords: function(){ return this.ship.navigation.coords },
//         coordsTransform: function() {
//             let t = coords2map(this.coords).join(',');
//             return `rotate( ${ heading2angle(this.heading) }, ${ t } ) translate(${ t })`
//         }
//     },
// };
// </script>
