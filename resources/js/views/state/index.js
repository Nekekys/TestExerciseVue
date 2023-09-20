export const state = () => ({
    comments: [],
    comment: {},
    isLoading: false,
    isLoadingComment: false
})

export const getters = {
    countComments: (state) => {
        return Math.ceil(state.comments.length / 3)
    },
    getComments: (state) => {
        return state.comments
    },
}

export const mutations = {
    setComments(state, payload) {
        state.comments = payload;
    },
    getCurrentComment(state, payload) {
        state.comment = payload;
    },
    addComment(state, payload) {
        state.comments.push(payload)
    },
    delComment(state, payload) {
        state.comments = state.comments.filter(elem => elem.id !== payload)
    },
    updateComment(state, payload) {
        state.comments = state.comments.map(elem => {
            return elem.id === payload.id ? {...elem, text: payload.text} : elem
        })
    },
    startLoading(state) {
        state.isLoading = true
    },
    endLoading(state) {
        state.isLoading = false
    },
    startLoadingComment(state) {
        state.isLoadingComment = true
    },
    endLoadingComment(state) {
        state.isLoadingComment = false
    },
    sortIdIncrease(state) {
        state.comments = state.comments.sort(function (a, b) {
            return a.id - b.id;
        })
    },
    sortIdDecreasing(state) {
        state.comments = state.comments.sort(function (a, b) {
            console.log(b.id - a.id)
            return  b.id - a.id;
        })
    },
    sortDateIncrease(state) {
        state.comments = state.comments.sort(function (a, b) {
            const dateA = a.date.split('-').reverse()
            const dateB = b.date.split('-').reverse()
            for(let i = 0; i < 3; i++){
                if (Number(dateA[i]) > Number(dateB[i])) {
                    return 1;
                }
                if (Number(dateA[i]) < Number(dateB[i])) {
                    return -1;
                }
            }
            return 0;
        })
    },
    sortDateDecreasing(state) {
        state.comments = state.comments.sort(function (a, b) {
            const dateA = a.date.split('-').reverse()
            const dateB = b.date.split('-').reverse()
            for(let i = 0; i < 3; i++){
                if (Number(dateA[i]) < Number(dateB[i])) {
                    return 1;
                }
                if (Number(dateA[i]) > Number(dateB[i])) {
                    return -1;
                }
            }
            return 0;
        })
    }
}

export const actions = {
    async getComments(context, ctx) {
        context.commit('startLoading')
        const { data } = await ctx.axios.get('/api/comments/').catch()
        if (data) {
            context.commit('setComments', data)
        }
        context.commit('endLoading')
    },
    async getCurrentComment(context, {ctx, id}) {
        context.commit('startLoading')
        const { data } = await ctx.axios.get(`/api/comments/${id}`).catch()
        if (data) {
            context.commit('getCurrentComment', data)
        }
        context.commit('endLoading')
    },
    async setComment(context, {ctx, comment}) {
        context.commit('startLoading')
        const { data } = await ctx.axios.post('/api/comments/', comment).catch()
        if (data) {
            context.commit('addComment', data)
        }
        context.commit('endLoading')
    },
    async delComment(context, {ctx, id}) {
        context.commit('startLoadingComment')
        const { data } = await ctx.axios.delete(`/api/comments/${id}`).catch()
        if (data) {
            context.commit('delComment', id)
        }
        context.commit('endLoadingComment')
    }
}
