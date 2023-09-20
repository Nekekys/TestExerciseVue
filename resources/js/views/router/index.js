
import CommentCurrent from "../pages/CommentCurrent.vue"
import CommentsList from "../pages/CommentsList.vue"
import Vue from "vue";
import VueRouter from "vue-router";
import Error404 from "../pages/404.vue"

Vue.use(VueRouter)

const routes =  [
        {
            path: '/',
            component: CommentsList,
        },
        {
            path: '/comment/:id',
            component: CommentCurrent,
        },
        {
            path: '/:pathMatch(.*)*',
            component: Error404,
        },
]




export  default new VueRouter({
        routes
    }
)
