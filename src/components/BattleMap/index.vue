<template>
    <svg id="battleMap">

        <ShipShape v-for="ship in ships" v-bind="ship" />
    </svg>
</template>

<script>
import ShipShape from './ShipShape.vue';

export default {
    props: [ 'ships' ],
    components: { ShipShape }
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
