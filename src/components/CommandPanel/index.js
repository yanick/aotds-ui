import React from 'react';
import _ from 'lodash';

export default class ObjectPanel extends React.Component {

render() {
    let ship = this.props.object;

    return (
<div>
    <div>{ship.name}</div>

    <div>
        heading:  3
         velocity: 4
    </div>

    <label>Remaining engine power: 3</label>

        <div>Orders sent</div>

        <fieldset disabled="">
        <div>
            <label for="thrust">Thrust

            <input type="range" 
                min="0"
                max="5"
                /> 


            <input type="range" name="thrust" />

            <span>3</span>
                </label>
                    </div>


                    <div>
                    <label> Turn

            <input type="range" name="turn" min={-3} max={3}
                value={0} 
                />
                    <span>0</span>
                    </label>
                    </div>

            <input type="button" value="send orders"
                />
                </fieldset>

    </div>
                 //<div objects={objects} ship={object} assign_weapon={assign_weapon} />
    )
}
}
