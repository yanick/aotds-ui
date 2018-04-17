<template>
    <div>
    <svg id="battleMap" @mousemove="mousemove"
        @mousedown="set_panning">

          <g id="pan_translate" >
        <ShipCourse v-for="ship in ships" :ship="ship" />

         <Ship v-for="ship in ships" :ship="ship" /> 
          </g>
    </svg>
    </div>
</template>

<script>
import SVG from 'svg.js';
import fp from 'lodash/fp';
import { mapGetters, mapActions } from 'vuex';

import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';

import SvgPanZoom from '../../../node_modules/vue-svg-pan-zoom/src/index.js';

import { coords2map } from './utils';

const min_max = fp.over([ Math.min, Math.max ]);

const dist_from = origin => coords => fp.sum( [0,1]
    .map( i => origin[0] - coords[0] )
    .map( i => i*i ) );

export default {
    data: () => ({ svgpanzoom: null, previous_point: [0,0] }),
    components: { Ship, ShipCourse, SvgPanZoom },
    computed: {
        ...mapGetters([ 'center_on' ]),
        middle_ship_coords: function() {
            if(!this.ships || this.ships.length === 0 ) {
                return [0,0];
            }

            let coords = this.ships.map( fp.get('navigation.coords') );
            let middle = fp.pipe(
                fp.map( i => coords.map( c => c[i] ) ),
                fp.map( fp.mean ),
            )([0,1]);

            let closest = fp.minBy( dist_from(middle) )( coords );

            return closest;

        },
        panner: function () {
            return SVG.select('g#pan_translate')
        },
        ships: function(){ return this.$store.getters.get_ships },
    },
    watch: {
        middle_ship_coords: function(v) {
            if( this.center_on ) return;

            this.action_center_on(v);
        },
        center_on: function() {
            if( !this.center_on ) return null;
            let point = coords2map(this.center_on);
            this.previous_point = this.next_point;
            let bbox = [ this.$el.offsetWidth, this.$el.offsetHeight ];

            let trans= [0,1].map( i => bbox[i]/2 - point[i] );
            
            SVG.select('g#pan_translate').animate(500, '-').move( ...trans );
        },
    },
    methods: {
        action_center_on: function(coords) {
            this.$store.dispatch( 'center_on', coords );
        },
        mousemove({clientX,clientY, buttons}) {
            if(! buttons & 1 ) return;

            let delta = [ clientX - this.previous_point[0], clientY -
                this.previous_point[1] ];

            this.previous_point = [ clientX, clientY ];
            
            this.panner.dmove(...delta);
        },
        set_panning: function({ clientX, clientY }) {
            this.previous_point = [ clientX, clientY ];
        },
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
