// @flow
import React from "react";
import _ from "lodash";

import style from "./style.css";

import { Slider } from "@blueprintjs/core";

import foo from 'aots-battle/./index.js';

export default class ObjectPanel extends React.Component<any> {

  render() {
    let ship = this.props.object;

    return (
      <div>
        <div className="object_name">{ship.name}</div>

        <div>heading: 3 velocity: 4</div>

        <div>Orders sent</div>

        <fieldset disabled="">
          <div>
            <label for="thrust">
              Thrust
              <input
                type="range"
                min="0"
                max="5"
                onChange={e => this.orderMovement("thrust", e.target.value)}
              />
              <input type="range" name="thrust" />
              <span>3</span>
            </label>
          </div>
          <div>
            <label>Turn</label>
                <Slider min={-3} max={3} value={0} />
          </div>

          <input type="button" value="send orders" />
        </fieldset>
      </div>
      //<div objects={objects} ship={object} assign_weapon={assign_weapon} />
    );
  }
}
