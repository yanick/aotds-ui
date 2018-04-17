<template>
    <ul>
        <li v-for="ship in ships">
            <a href="#" @click="select_object(ship.id)">
            {{ ship.name }} 
            </a>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: { },
    computed: {
        ships: function(){ return this.$store.getters.get_ships },
    },
    methods: mapActions( [ 'select_object' ] ),
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
