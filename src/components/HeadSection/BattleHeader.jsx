import fp from 'lodash/fp';
import React from 'react';

import { connect } from 'react-redux';

export function BattleHeader({name,turn}) {
    return <div id="battle_header">
        Battle of { name }, turn { turn }
    </div>;
}

const mapStateToProps = state => {
  return {
    name: fp.get('battle.game.name')(state),
    turn: fp.get('battle.game.turn')(state),
  }
}

export default connect( mapStateToProps
)(BattleHeader);
