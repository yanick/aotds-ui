import React from 'react';
import _ from 'lodash';

function _if( then, then_not ) {
    if(this) {
        return then(this);
    }
    else {
        if ( then_not ) {
            then_not(this);
        }
    }

    return;
}


const show_ready = () => ' ready';

export default ({objects, selectObject}) => <div>
    <ul>
    { objects::_if( () => 
        objects.map( o => 
            <li>
                <a href="#" onClick={  () => selectObject( o.id ) }>{ o.name }</a>
                { _.get( o, 'orders.ready' )::_if(show_ready) }
            </li> ) ) 
    }
    </ul>
</div>;
