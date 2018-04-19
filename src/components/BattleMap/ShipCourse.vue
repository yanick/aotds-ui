<template>

    <g v-if="has_course" class="course">
        <path :d="path"
                fill="none"
                stroke="red" stroke-width="3" />

        <g :transform="coordsTransform">
        <use 
            class="ship_shape"
            href="/svg/ship/generic.svg#ship_generic" transform="scale(0.4)" />
        </g>
    </g>
</template>

<style>
.course {
    opacity: 0.5;
}
</style>

<script>
import _ from 'lodash';
import fp from 'lodash/fp';

import { coords2map, heading2angle } from './utils';

export default {
    props: [ 'ship' ],
    computed: {
        has_course: function() { return !!this.course },
        course: function() { 
            return fp.get('navigation.course')(this.ship);
        },
        coordsTransform: function() {
            if( !this.has_course ) return '';
            let t = coords2map(this.course.coords).join(',');
            return `rotate( ${ heading2angle(this.course.heading) }, ${ t } ) translate(${ t })`
        }
    },
};
</script>
