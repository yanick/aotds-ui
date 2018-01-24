<template>
    <SvgPanZoom>
    <svg id="battleMap">

        <ShipCourse v-for="ship in ships" :ship="ship" />

        <Ship v-for="ship in ships" :ship="ship" />
    </svg>
      <svg id="thumbView" class="thumbViewClass" slot="thumbnail">
            <Ship v-for="ship in ships" :ship="ship" />
      </svg>
    </SvgPanZoom>
</template>

<script>
import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';

import SvgPanZoom from 'vue-svg-pan-zoom';

export default {
    props: [ 'ships' ],
    components: { Ship, ShipCourse, SvgPanZoom },
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
