import _ from 'lodash';

export function _if( cond, then, then_not ) {
    if(cond) {
        return typeof then === 'function' ? then(cond) : then;
    }

    if ( then_not ) {
        return typeof then_not === 'function' ? then_not(cond) : then_not;
    }

    return;
}
