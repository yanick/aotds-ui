<template>
    <div id="battle_header">Battle of {{ battle_name }}, turn {{ battle_turn }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const foo = async () => 1;

export default {
    computed: {
        ...mapGetters([ 'battle_name', 'battle_turn'  ]),
    }
};
</script>
