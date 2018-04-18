import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../../../store/actions';

class NotLogged extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
        };
    }

    updateName = e => this.setState({ name: e.target.value });
    updatePassword = e => this.setState({ password: e.target.value });

    submit_auth = e => this.props.auth_user( this.state.name, this.state.password );

    render() { return <div>
            <input type="text" placeholder="player name" 
                onChange={ this.updateName }
                value={this.state.name} />
            <input type="text" 
                placeholder="password"
                onChange={ this.updatePassword }
                value={ this.state.password } 
            />
            <a href="#" onClick={this.submit_auth}>log in</a>
    </div> }
}

const mapActionsToProps = dispatch => ({
    auth_user: (player,password) => dispatch(Actions.auth_user(player,password)),
});

export default connect(
    null,
    mapActionsToProps
)(NotLogged);
