<template>
    <svg ref="myself" id="battleMap">

        <ShipShape v-for="ship in ships" v-bind="ship" />
    </svg>
</template>

<script>
import svg_pan_zoom from 'svg-pan-zoom';
import ShipShape from './ShipShape.vue';

export default {
    props: [ 'ships' ],
    components: { ShipShape },
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
