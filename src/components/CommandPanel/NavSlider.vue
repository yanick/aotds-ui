<template>
                <div>
                    <label>{{ label }} 
                        <span>
                            {{ min }}
                            <input type="range" 
                                step="1"
                                :min="min"
                                :max="max"
                                v-model.number="range_value" />
                            {{ max }}
                            -
                            <b>{{ range_value }}</b>
                        </span>
                    </label>
                </div>
</template>

<script>

import _ from 'lodash';

export default {
    props: [ 'min', 'max', 'label', 'value', 'change' ],
    computed: {
        range_value: {
            get: function(){ return this.value },
            set: function(value){ this.change(value) },
        },
    }
}

</script>
