<template>
    <div>
        <div v-if="$store.state.isLoading" class="preloader">
            <Preloader/>
        </div>
        <div v-else>
            <Comment v-for="comment in comments" :data="comment" :key="comment.id"/>
        </div>

        <div class="inputControl">
            <InputUI v-model="fields.message" placeholder="Comment"/>
            <date-picker :style="{width: '120px', marginLeft: '10px'}" v-model="fields.date" valueType="DD-MM-YYYY"></date-picker>
        </div>
        <div class="inputControl">
            <InputUI v-model="fields.name" placeholder="Name"/>
            <ButtonUI :disable="validateFrom" @click="SubmitFrom">Send</ButtonUI>
        </div>
        <pagination class="pagination" :current-page="page" :max-pages="this.$store.getters.countComments" @change="changePage"/>
        <div class="sortGroup">
            <div>
                <ButtonUI :disable="$store.state.isLoading" @click="SortIdAndDate">{{ sortType ? 'sort id' : 'sort date' }}
                </ButtonUI>
                <ButtonUI :disable="$store.state.isLoading" @click="SortDecreasingAndIncrease">{{ checkedSort ? 'increase' : 'decreasing' }}
                </ButtonUI>
            </div>
            <div>
                <p>Current sort: {{sortType ? 'sort date' : 'sort id'}} / {{ checkedSort ? 'decreasing' : 'increase' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonUI from "../components/UI/ButtonUI.vue"
    import InputUI from "../components/UI/InputUI";
    import Comment from "../components/Comment";
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import Preloader from "../components/UI/Preloader";
    import Pagination from '../components/UI/Pagination';

    export default {
        name: "CommentsList",
        components: {InputUI, ButtonUI, Comment, DatePicker, Preloader, Pagination},
        data: function () {
            return {
                fields: {
                    message: '',
                    name: '',
                    date: null
                },
                page: 1,
                checkedSort: false,
                sortType: false
                // comments: []
            }
        },
        computed: {
            comments() {
                return this.$store.getters.getComments.filter((e, index) => index >= (this.page - 1) * 3 && index < (this.page) * 3)
            },
            validateFrom() {
                return this.fields.message.length === 0 || this.fields.name.length === 0
            },
            getCurrentDate() {
                const today = new Date()
                const yyyy = today.getFullYear()
                let mm = today.getMonth() + 1
                let dd = today.getDate()

                if (dd < 10) dd = '0' + dd
                if (mm < 10) mm = '0' + mm

                return yyyy + '-' + mm + '-' + dd
            }
        },
        methods: {
            SubmitFrom() {
                const comment = {
                    name: this.fields.name,
                    text: this.fields.message,
                    date: this.fields.date ? this.fields.date : this.getCurrentDate,
                }
                this.$store.dispatch('setComment', {ctx: this, comment})

                this.fields.message = ''
                this.fields.date = null
            },
            changePage(page) {
                this.page = page
            },
            SortIdAndDate() {
                this.sortType = !this.sortType
                this.sort()
            },
            SortDecreasingAndIncrease() {
                this.checkedSort = !this.checkedSort
                this.sort()
            },
            sort() {
                if (!this.sortType) {
                    if (this.checkedSort) {
                        this.$store.commit('sortIdDecreasing')
                    } else {
                        this.$store.commit('sortIdIncrease')
                    }
                } else {
                    if (this.checkedSort) {
                        this.$store.commit('sortDateDecreasing')
                    } else {
                        this.$store.commit('sortDateIncrease')
                    }
                }
            }
        },
        mounted() {
            this.$store.dispatch('getComments', this)
        },
        watch: {
            '$store.state.isLoading': {
                handler(val) {
                    if (!val) this.sort()
                },
            }
        }
    }
</script>

<style scoped>
    .inputControl {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }

    .preloader {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }

    .sortGroup {
        margin-top: 10px;
    }

    .pagination {
        margin-top: 10px;
    }

    @media screen and (max-width: 500px) {
        .inputControl input {
            max-width: 100px;
        }
    }
</style>
