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

import { plot_movement } from '../../../node_modules/aotds-battle/lib/movement';

import { coords2map, heading2angle } from './utils';

export default {
    props: [ 'ship' ],
    computed: {
        has_course: function() { return !!this.course },
        course: function() { 
            return fp.get( 'navigation' )(plot_movement( this.ship,
                fp.get('orders.navigation')(this.ship) ));
        },
        path: function() {
            return 'M ' + 
                    fp.getOr([])('trajectory')(this.course
                    ).map( p => p.coords ).map( coords2map )
                    .map( c => c.join( ',' ) ).join( ' L ' ) ; 
        },
        coordsTransform: function() {
            if( !this.has_course ) return '';
            let t = coords2map(this.course.coords).join(',');
            return `rotate( ${ heading2angle(this.course.heading) }, ${ t } ) translate(${ t })`
        }
    },
};
</script>
