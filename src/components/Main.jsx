import React from 'react';
import HeadSection from './HeadSection';

import BattleMap from './BattleMap';
import ListObjects from './ListObjects';
import CommandPanel from './CommandPanel';
import TurnLog from './TurnLog';

import { Tab, Tabs } from "@blueprintjs/core";
 

import './Main/style.css';

export default () => <div>
    <HeadSection />
    <div id="main_section">
        <div id="battlemap"> <BattleMap /></div>
        <div id="rightcolumn">
            <Tabs renderActiveTabPanelOnly={true}>
                <Tab id="controls" title="command" panel={ <CommandPanel /> } />
                <Tab id="ships" title="ships" panel={ <ListObjects /> } />
                <Tab id="turn_log" title="logs" panel={ <TurnLog /> } />
            </Tabs>
        </div>
    </div>
</div>;
