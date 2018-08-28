import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import u from 'updeep';

import { ProgressBar, Button } from '@blueprintjs/core';

import FieldSet from './FieldSet';
import Navigation from './Navigation';
import Weaponry from './Weaponry';
import Structure from './Structure';

import Actions from '../../store/actions';

import './style.css';


class CommandPanel extends React.Component {
    orders_sent = () => !!fp.get('bogey.orders.done')(this.props);

    render() {
        if(!this.props.bogey) return null;

        let drive_fraction = this.props.bogey.drive.current / this.props.bogey.drive.rating;

        let drive_class  = drive_fraction < 1 ? 'pt-intent-warning' : 'pt-intent-primary';

        drive_class = drive_class + ' pt-no-stripes'

        return <div className="command_panel">
            <div>
                <div className="head_section">
                    <div className="bogey_name">
                        <a href='#' onClick={this.props.center_on}>
                            {this.props.bogey.name}
                        </a>
                    </div>
                    <div>
            { this.props.previous_bogey && <a href='#' onClick={this.props.select_object(this.props.previous_bogey)} >
                            &lt;
                            &lt;
                        </a> } &nbsp;
            { this.props.next_bogey && <a href='#' onClick={this.props.select_object(this.props.next_bogey)} >
                            &gt;
                            &gt;
                        </a> }
                    </div>
                </div>
          <div>heading: { this.props.bogey.navigation.heading } 
              velocity: { this.props.bogey.navigation.velocity }
              <div>
                  drive rating: { this.props.bogey.drive.current } / { this.props.bogey.drive.rating }
            <ProgressBar 
                className={ drive_class }
                value={ drive_fraction }
                />
              </div>
          </div>

            <fieldset disabled={this.orders_sent()}>
            <Button
                text={ this.orders_sent() ? 'orders sent' : "send orders" }
                onClick={ this.props.send_orders }
                />

            <Navigation 
                drive_rating={ fp.getOr(0)('drive.current')(this.props.bogey) }
                disabled={ this.orders_sent() }
                maneuvers={ fp.get('navigation.course.maneuvers')(this.props.bogey)  }
                orders={ fp.get('orders.navigation')(this.props.bogey) }
                amend_orders={ orders => this.props.amend_orders(
                    { navigation: orders }
                ) }
                    />


            </fieldset>

            <Structure { ...this.props.bogey.structure } />

            { this.props.bogey.weaponry &&
                <Weaponry 
                    bogey={ this.props.bogey }
                    bogey_id={ this.props.bogey.id }
                    weaponry={ this.props.bogey.weaponry }
                />
            }


            </div>
        </div>;
    }
}

const selected_bogey = state => {
    let id = fp.get('ui.selected_object_id')(state);
    return fp.getOr([])('battle.objects')(state).find( o => o.id === id );
};

const mapDispatches = dispatch => ({
    amend_orders: id => orders => dispatch(Actions.amend_orders( id, orders )),
    send_orders: (id,orders) => () => dispatch(Actions.send_orders( id,orders )),
    select_object: id => dispatch(Actions.select_object(id)),
});

const neighbor_bogeys = state => {
    let selected  = selected_bogey(state);
    if(!selected) return {};
    const bogeys = _.sortBy( state.battle.objects, [ 'player_id', 'name' ] );
    let index = _.findIndex( bogeys, { id: selected.id } );
    console.log( _({ previous_bogey: bogeys.length - 1, next_bogey: 1 }
        ).mapValues(i => (( i + index ) % bogeys.length ))
        .mapValues(i => bogeys[i].id )
        .mapValues( id => id === selected.id ? null : id ).value() );
    return _({ previous_bogey: bogeys.length - 1, next_bogey: 1 }
        ).mapValues(i => (( i + index ) % bogeys.length ))
        .mapValues(i => bogeys[i].id )
        .mapValues( id => id === selected.id ? null : id ).value();

};

export default connect(
    state => ({ 
        bogey: selected_bogey(state),
        ...neighbor_bogeys(state),
    }),
    mapDispatches,
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...ownProps,
        amend_orders: dispatchProps.amend_orders( fp.get('bogey.id')(stateProps) ),
        send_orders: dispatchProps.send_orders( fp.get('bogey.id')(stateProps), fp.get('bogey.orders')(stateProps)),
        center_on: e => {
            e.preventDefault();
            dispatchProps.select_object(stateProps.bogey.id);
        },
        select_object: id => e => {
            e.preventDefault();
            dispatchProps.select_object(id);
        },
    })
)( CommandPanel );
