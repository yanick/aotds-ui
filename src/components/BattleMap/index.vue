<template>
    <svg id="battleMap">

        <ShipCourse v-for="ship in ships" :ship="ship" />

        <Ship v-for="ship in ships" :ship="ship" />
    </svg>
</template>

<script>
import svg_pan_zoom from 'svg-pan-zoom';
import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';

export default {
    props: [ 'ships' ],
    components: { Ship, ShipCourse },
    mounted: function() {
        console.log( "mounteD!" );
        svg_pan_zoom( this.$el ,{
                  zoomEnabled: true,
                  controlIconsEnabled: true,
                  fit: false,
                  center: true,});
    }
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

</style>
