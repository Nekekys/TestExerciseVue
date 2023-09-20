<template>
    <input :value="value" @input=" e => $emit('input', e.target.value)" class="input" type="text" :placeholder="placeholder" />
</template>

<script>
    export default {
        name: "InputUI",
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: String
            },
        },

    }
</script>

<style scoped>
    .input{
        font-size: 16px;
        border: 2px solid  #999999;
        background-color: transparent;
        border-radius: 8px;
        color: #fff;
        padding: 10px 20px;
        outline: none;
    }
</style>
