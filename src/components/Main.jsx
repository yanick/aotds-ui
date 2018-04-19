import React from 'react';
import HeadSection from './HeadSection';

import BattleMap from './BattleMap';
import ListObjects from './ListObjects';

import { Tab, Tabs } from "@blueprintjs/core";
 

import './Main/style.css';

export default () => <div>
    <HeadSection />
    <div id="main_section">
        <div id="battlemap"> <BattleMap /></div>
        <div id="rightcolumn">
            <Tabs>
                <Tab id="ships" title="ships" panel={ <ListObjects /> } />
                <Tab id="controls" title="controls" panel="" />
            </Tabs>
        </div>
    </div>
</div>;
