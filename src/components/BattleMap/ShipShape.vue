<template>
    <g :transform="coordsTransform">
        <use 
            class="ship_shape"
            href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
    </g>
</template>

<script>

import { coords2map, heading2angle } from './utils';

export default {
    props: [ 'navigation' ],
    computed: {
        heading: function(){ return this.navigation.heading },
        coords: function(){ return this.navigation.coords },
        coordsTransform: function() {
            let t = coords2map(this.coords).join(',');
            return `rotate( ${ heading2angle(this.heading) }, ${ t } ) translate(${ t })`
        }
    },
};
</script>
