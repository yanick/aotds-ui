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

export default {
    data: () => ({ svgpanzoom: null, previous_point: [0,0] }),
    components: { Ship, ShipCourse, SvgPanZoom },
    computed: {
        ...mapGetters([ 'center_on' ]),
        middle_ship: function() {
            if(!this.ships || this.ships.length === 0 ) {
                return [0,0];
            }

        },
        panner: function () {
            return SVG.select('g#pan_translate')
        },
        ships: function(){ return this.$store.getters.get_ships },
    },
    watch: {
    },
    methods: {
        select_object: function(id) {
            this.$store.dispatch( 'select_object', id );
        },
        mousemove({clientX,clientY, buttons}) {
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
