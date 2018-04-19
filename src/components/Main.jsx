import React from 'react';
import HeadSection from './HeadSection';

import BattleMap from './BattleMap';

import './Main/style.css';

export default () => <div>
    <HeadSection />
    <div id="main_section">
        <div id="battlemap"> <BattleMap /></div>
        <div id="rightcolumn">
        </div>
    </div>
</div>;
