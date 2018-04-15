<template>
    <div>
    <div id="head_section">
        <BattleHeader />
        <Auth /> 
    </div>
    <div id="main_section">
        <div id="battlemap"> <BattleMap /></div>
        <div id="rightcolumn">
            <ListObjects />
        </div>
    </div>
    </div>
</template>

<script>

import Auth from './Auth/index.vue';
import BattleHeader from './BattleHeader.vue';
import BattleMap from './BattleMap/index.vue';
import ListObjects from './ListObjects.vue';

export default {
    components: { Auth, BattleHeader, BattleMap, ListObjects },
};

</script>

<style>

@lost flexbox flex;

/* body {   lost-utility: edit; } */

#head_section {
    lost-flex-container: row;

    & #battle_header { lost-column: 3/4 }
    & #auth_section  { lost-column: 1/4 }
}

#main_section {
    lost-flex-container: row;

    & #battlemap { lost-column: 3/4 }
    & #rightcolumn  { lost-column: 1/4 }
}



</style>
