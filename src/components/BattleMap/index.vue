<template>
    <SvgPanZoom :panTo="pan_coords" >
    <svg id="battleMap" >

          <g>
        <rect v-bind="battle_area"  fill="none" stroke="none" />
        <ShipCourse v-for="ship in ships" :ship="ship"
            />

         <Ship v-for="ship in ships" :ship="ship" /> 
          </g>
    </svg>
      <svg id="thumbView" class="thumbViewClass" slot="thumbnail">
          <g>
            <rect v-bind="battle_area" fill="none" stroke="none" />

            <Ship v-for="ship in ships" :ship="ship" />
          </g>

      </svg>
    </SvgPanZoom>
</template>

<script>
import fp from 'lodash/fp';
import { mapGetters } from 'vuex';

import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';

import SvgPanZoom from '../../../node_modules/vue-svg-pan-zoom/src/index.js';

import { coords2map } from './utils';

const min_max = fp.over([ Math.min, Math.max ]);

export default {
    data: () => ({ svgpanzoom: null }),
    components: { Ship, ShipCourse, SvgPanZoom },
    computed: {
        ships: function(){ return this.$store.getters.get_ships },
        battle_area: function() {
            console.log('ah');
            if (!this.ships || this.ships.length == 0) return;
            console.log('oh');
            console.log(this.ships);
            let max_velocity = fp.max( this.ships.map( s => s.navigation.velocity ) );
            let coords = fp.map( 'navigation.coords' )(this.ships);
            let mm = [ 0, 1 ].map( i => coords.map( c => c[i] ) ).map( x =>
                min_max(...x) );

            let min_point = coords2map([ 
                mm[0][0] - max_velocity,
                mm[1][1] - max_velocity,
            ]);

            let max_point = coords2map([
                mm[0][1] + max_velocity,
                mm[1][0] + max_velocity,
            ]);

            let x = {
                x: min_point[0],
                y: min_point[1],
                width: max_point[0] - min_point[0],
                height: max_point[1] - min_point[1],
            };
            console.log(x);
            return x;
        },
        ...mapGetters([ 'center_on' ]),
        pan_coords: function() {
            if( !this.center_on ) return null;
            return coords2map(this.center_on);
        }
    },
    methods: {
        register_svgpanzoom: function(svgpanzoom) { this.svgpanzoom =
                svgpanzoom;
                window.ssh = svgpanzoom
        },
        debug: function(svg) {
            window.ssh = svg;
            this.battle_area;
        }
    },
};

</script>

<style>
    #battleMap { 
        width: 100%;
        height: 600px;
        border: 2px solid;
        border-color: blue;
        background: #9500ff url('/starbackground.jpg');
    }

    .ship_shape {
        fill: red;
    }
    .thumbViewClass {
        border: 1px solid black;
        position: absolute;
        bottom: 5px;
        left: 5px;
        width: 20%;
        height: 30%;
        margin: 3px;
        padding: 3px;
        overflow: hidden;
      }

      #thumbView {
        z-index: 110;
        background: white;
      }

      #scopeContainer {
        z-index: 120;
      }
</style>
