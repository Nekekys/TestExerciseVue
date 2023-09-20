<template>
    <ul class="pagination">
        <li v-for="i in maxPages">
            <a href='#'
               :class="{'active': currentPage === i}"
               @click="$emit('change', i)">
                {{ i }}
            </a>
        </li>
     </ul>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            currentPage: {
                default: 1,
                required: true,
            },
            maxPages: {
                type: Number,
                default: 1,
                required: true,
            },
        },
    }
</script>

<style scoped>
    .pagination {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    li {
        display: inline-block;
        box-sizing: border-box;
        margin-left: -1px;
    }
    a {
        background: #323232;
        margin: .25rem;
        padding: .25rem .5rem;
        border-radius: 4px;
        text-decoration: none;
        position: relative;
        display: block;
        color: #ffffff;
    }
    .pagination .active {
         background: #000000;
         color: #fff;
     }

</style>
