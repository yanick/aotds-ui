// TODO Go red when the hull/armor goes too low

import React from 'react';

import { ProgressBar } from '@blueprintjs/core';

import './style.css';

const Shields = ({ shields }) => <div className="stat">
    <div className="label">screens</div> 
    <div className="measurement">{ shields.map( s => <Shield {...s} /> ) }</div>
</div>;

const Shield = ({ level }) => <span>
    <div className="screen">
    {level}
    </div>
</span>;

const IntegrityBar = ({current,max}) => <div>
    <ProgressBar 
        className="integrityBar"
        animate={false}
        stripes={false}
        intent={'PRIMARY'}
        value={current/max} 
    /> &nbsp; { current } / { max }
</div>;

const Armor = (stats) => <div className="stat">
    <div className="label">armor</div>
    <IntegrityBar {...stats} />
</div>;

const Hull = (stats) => <div className="stat">
    <div className="label">hull</div>
    <IntegrityBar {...stats} />
</div>;

export default ({ shields, armor, hull }) => <fieldset className="structure" legend="structure">
    <legend id="structure">Structure</legend>
    { shields && <Shields shields={shields} /> }
    { armor && <Armor {...armor} /> }
    <Hull {...hull} />
</fieldset>;
