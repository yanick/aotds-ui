import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../../store/actions';

import NotLogged from './Auth/NotLogged';

const Logged = connect(
    null, 
    dispatch => ({
        logout: () => dispatch(Actions.logout()),    
    }),
)(
    ({player_name, logout}) => <div>
   Admiral { player_name } <a href="#" onClick={ logout }>logout</a>
</div>
);

const Auth = ({player}) => <div id="auth_section">
    { player 
        ? <Logged player_name={ player }/>
        : <NotLogged /> 
    }
</div>;


const mapStateToProps = state => ({
    player: fp.get('user.player')(state)
});

export default connect( mapStateToProps )(Auth);
