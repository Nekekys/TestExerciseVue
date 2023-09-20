<template>
    <button @click="$emit('click')" :style="{backgroundColor: bgColor}" :class="{small: size === 's', disable: disable}" class="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            size: {
                type: String,
                default: 'm'
            },
            disable: {
                type: Boolean,
                default: false
            },
            bgColor: {
                bgColor: String,
                default: '#999999'
            },
        }
    }
</script>

<style scoped>
    .button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #999999;
        cursor: pointer;
        transition: border-color 0.25s;

    }
    .small {
        padding: 3px 10px;
        font-size: 12px;
    }
    .button:hover {
        border-color: #000;
    }
    .button:focus,
    .button:focus-visible {
        /*outline: 4px auto -webkit-focus-ring-color;*/
    }
    .disable{
        cursor: not-allowed;
        pointer-events:none;
        opacity: 0.6;
    }

</style>
