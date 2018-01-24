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

import { coords2map, heading2angle } from './utils';

export default {
    props: [ 'ship' ],
    computed: {
        has_course: function() { return this.course !== false },
        course: function() { 
            return _.get( this, 'ship.navigation.course', false );
        },
        path: function() {
            return 'M ' +
                    this.course.map( p => p.coords ).map( coords2map )
                    .map( c => c.join( ',' ) ).join( ' L ' ) ;
        },
        coordsTransform: function() {
            if( !this.course ) return { };
            let c = this.course;
            let p = c[ c.length - 1 ];
            let t = coords2map(p.coords).join(',');
            return `rotate( ${ heading2angle(p.heading) }, ${ t } ) translate(${ t })`
        }
    },
};
</script>
