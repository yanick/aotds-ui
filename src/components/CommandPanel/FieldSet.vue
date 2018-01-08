<template>
    <fieldset>
        <legend>{{legend}}</legend>
        <slot />
    </fieldset>
</template>

<script>
export default {
    props: [ 'legend' ],
};
</script>
