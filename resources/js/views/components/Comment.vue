<template>
    <div class="container" :class="{isSolo: 'isSolo'}">
        <div v-if="isLoading" class="preloader">
            <Preloader />
        </div>
        <div v-else @click="currentComment">
            <div class="name">
                <h4>{{data.name}}({{data.id}})</h4>
                <div v-if="!isSolo" class="control" @click.stop>
                    <ButtonUI @click="editOrSave" size="s">{{ isEdit ? 'Save' : 'Edit' }}</ButtonUI>
                    <ButtonUI @click="deleted" size="s" bgColor="#fa5b5b">Del</ButtonUI>
                </div>
                <span>{{data.date}}</span></div>
            <div v-if="!isEdit">{{data.text}}</div>
            <textarea v-else class="textarea" v-model="field" @click.stop></textarea>
        </div>
    </div>
</template>

<script>
    import ButtonUI from "./UI/ButtonUI";
    import Preloader from "./UI/Preloader"

    export default {
        name: "Comment",
        components: {ButtonUI,Preloader},
        props: {
            data: {
                type: Object
            },
            isSolo: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                isEdit: false,
                isLoading: false,
                field: this.$props.data.text
            }
        },
        methods: {
            async editOrSave(){
                if (this.isEdit){
                    this.isLoading = true
                    const { data } = await this.axios.patch(`/api/comments/${this.$props.data.id}`, {text: this.field}).catch()
                    if (data) {
                        this.$store.commit('updateComment', {text: this.field, id: this.$props.data.id})
                    }
                    // this.$store.dispatch('updateComment', {update: {text: this.field, id: this.$props.data.id}, ctx: this})
                    this.isEdit = false
                    this.isLoading = false
                }else {
                    this.isEdit = true
                }
            },
            deleted(){
                this.isLoading = true
                this.$store.dispatch('delComment', {id: this.$props.data.id, ctx: this})
            },
            currentComment(){
                if( !this.isSolo ) this.$router.push(`/comment/${this.$props.data.id}`)
            }
        }
    }
</script>

<style scoped>
    .container{
        max-width: 600px;
        border: 2px solid  #999999;
        border-radius: 8px;
        color: #fff;
        padding: 10px;
        margin-bottom: 10px;
        text-align: left;
        transition: all 0.3s ease;
        min-width: 250px;
        cursor: pointer;
    }
    .container:hover{
        background-color: rgba(0,0,0,0.5);
    }
    .isSolo:hover{
        background-color: rgba(0,0,0,0);
    }
    .name{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .name h4{
        margin: 0;
        min-width: 100px;
    }
    .name span{
        margin-left: 10px;
    }
    .textarea{
        background-color: transparent;
        width: 100%;
        border: none;
        color: #fff;
        font-size: 16px;
        outline: none;
    }
    .preloader{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
