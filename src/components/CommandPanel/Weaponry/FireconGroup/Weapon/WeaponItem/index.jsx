import React from 'react';

// TODO move WeaponItem to its own file
// TODO create SHOW_WEAPON_ARC action


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees-3) * Math.PI / 6.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 6 ? "0" : "1";

    let d = [
        "M", 16, 16,
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");

    return d;       
}

import { connect } from 'react-redux';
import Actions from '../../../../../../store/actions';
import { arcs } from 'aotds-battle';
 
export
const  WeaponItem = ({weapon, showArc}) => <div>
    {weapon.type + '-' + weapon.level}
    <svg width="32" height="32"
        onMouseOver={ () => showArc(true) }
        onMouseOut={ () => showArc(false) }
        >
    { _.flatMap( weapon.arcs, a => arcs[a] ).map( range => {
        return <path d={describeArc(16,16,16,...range) } />
    }
    ) }
    </svg>
</div>;

export default connect( 
    state => { console.log('das fuck?', state); return {} },
    ( dispatch, ownProps ) => ({
        showArc: showIt => {
            console.log( "should...", dispatch );
            dispatch( Actions.show_weapon_arc( ownProps.bogey_id, ownProps.weapon.id, showIt ) )
            console.log( "should really...", 
            Actions.show_weapon_arc( ownProps.bogey_id, ownProps.weapon.id, showIt ) );
        }
    })
)(WeaponItem);

