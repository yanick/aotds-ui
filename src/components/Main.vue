<template>
    <div>
    <div id="head_section">
        <BattleHeader />
        <Auth /> 
    </div>
    <div id="main_section">
        <div id="battlemap"> <BattleMap /></div>
        <div id="rightcolumn">
            <UiTabs>
                <UiTab title="ships">
                    <ListObjects />
                </UiTab>
                <UiTab title="command">
                    <CommandPanel />
                </UiTab>
                <UiTab title="logs">
                    <div>TODO</div>
                </UiTab>
            </UiTabs>
        </div>
    </div>
    </div>
</template>

<script>
import 'keen-ui/dist/keen-ui.css';

import Auth from './Auth/index.vue';
import BattleHeader from './BattleHeader.vue';
import BattleMap from './BattleMap/index.vue';
import ListObjects from './ListObjects.vue';
import CommandPanel from './CommandPanel/index.vue';

import { UiTabs, UiTab } from 'keen-ui';

export default {
    components: { Auth, BattleHeader, BattleMap, ListObjects, UiTabs, UiTab,
        CommandPanel },
};

</script>
