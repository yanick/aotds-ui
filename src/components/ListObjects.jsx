import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';

import Actions from '../store/actions';

const Item = ({object,select_object}) => <li>
    <a href="#" onClick={select_object(object.id)}>
        { object.name }
    </a>
</li>;


const ListObjects = ({ objects, select_object }) => <ul>
    { objects && 
        objects.map( o => 
            <Item object={o} select_object={select_object} /> 
        ) 
    }
</ul>;

export default connect(
    state => ({ objects: fp.get('battle.objects')(state) }),
    dispatch => ({ select_object: id => dispatch( Actions.select_object(id) ) }),
)( ListObjects );
