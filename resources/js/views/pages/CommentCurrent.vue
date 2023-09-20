<template>
    <div v-if="$store.state.isLoading">
        <Preloader/>
    </div>
    <div v-else>
        <Comment :data="this.$store.state.comment" :key="this.$store.state.comment.id" isSolo />
        <ButtonUI @click="goHome">Back</ButtonUI>
    </div>
</template>

<script>
    import Comment from "../components/Comment";
    import Preloader from "../components/UI/Preloader";
    import ButtonUI from "../components/UI/ButtonUI";

    export default {
        name: "CommentCurrent",
        components: {Comment, Preloader, ButtonUI},
        mounted() {
            this.$store.dispatch('getCurrentComment', {id: this.$route.params.id, ctx: this})
        },
        methods: {
            goHome(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
