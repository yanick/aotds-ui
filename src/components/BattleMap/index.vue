<template>
    <SvgPanZoom :panTo="pan_coords" :onSVGPanZoomLoad="debug"
    >
    <svg id="battleMap" >
        <g>

          <circle cx="0" cy="0" r="10" stroke="black" stroke-width="3"
          fill="red" />
            <circle cx="100" cy="100" r="10" stroke="black" stroke-width="3"
                                                          fill="blue" />

        <ShipCourse v-for="ship in ships" :ship="ship"
            />

         <Ship v-for="ship in ships" :ship="ship" /> 
        </g>
    </svg>
      <svg id="thumbView" class="thumbViewClass" slot="thumbnail">
          <g>
            <Ship v-for="ship in ships" :ship="ship" />
          <circle cx="100" cy="100" r="1" stroke="black" stroke-width="0.01" />
          <circle cx="100" cy="110" r="1" stroke="black" stroke-width="0.01" />
          </g>

      </svg>
    </SvgPanZoom>
</template>

<script>
import { mapGetters } from 'vuex';

import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';

import SvgPanZoom from '../../../node_modules/vue-svg-pan-zoom/src/index.js';

import { coords2map } from './utils';

export default {
    data: () => ({ svgpanzoom: null }),
    components: { Ship, ShipCourse, SvgPanZoom },
    computed: {
        ships: function(){ return this.$store.getters.get_ships },
        ...mapGetters([ 'center_on' ]),
        pan_coords: function() {
            if( !this.center_on ) return null;
            let coords = coords2map(this.center_on);
            return {
                x: coords[0],
                y: coords[1],
            };
        }
    },
    methods: {
        debug: function(svg) {
            window.ssh = svg;
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
