<template>
<div>
    <div id="mainViewContainer">
    <svg id="battleMap">

        <ShipCourse v-for="ship in ships" :ship="ship" />

        <Ship v-for="ship in ships" :ship="ship" />
    </svg>
    </div>


 <div id="thumbViewContainer">
      <svg id="scopeContainer" class="thumbViewClass">
        <g>
          <rect id="scope" fill="red" fill-opacity="0.1" stroke="red" stroke-width="2px" x="0" y="0" width="0" height="0"/>
          <line id="line1" stroke="red" stroke-width="2px" x1="0" y1="0" x2="0" y2="0"/>
          <line id="line2" stroke="red" stroke-width="2px" x1="0" y1="0" x2="0" y2="0"/>
        </g>
      </svg>
      <svg id="thumbView" class="thumbViewClass">
            <ShipCourse v-for="ship in ships" :ship="ship" />

            <Ship v-for="ship in ships" :ship="ship" />
      </svg>
</div>

</div>

</template>

<script>
import svg_pan_zoom from 'svg-pan-zoom';
import Ship from './Ship.vue';
import ShipCourse from './ShipCourse.vue';
import thumbnailViewer from './thumbnailViewer';

export default {
    props: [ 'ships' ],
    components: { Ship, ShipCourse },
    mounted: function() {
        console.log( "mounteD!" );
       thumbnailViewer({
           mainViewId: 'battleMap',
           thumbViewId: 'thumbView'
       });
//        svg_pan_zoom( '#battleMap' ,{
//                  zoomEnabled: true,
//                  controlIconsEnabled: true,
//                  fit: false,
//                  center: true,});
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
