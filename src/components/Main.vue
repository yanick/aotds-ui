<template>
    <div>
    <div id="head_section">
        <BattleHeader />
        <Auth /> 
    </div>
    <div>
        <BattleMap />
    </div>
    </div>
</template>

<script>

import Auth from './Auth/index.vue';
import BattleHeader from './BattleHeader.vue';
import BattleMap from './BattleMap/index.vue';

export default {
    components: { Auth, BattleHeader, BattleMap },
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



</style>
