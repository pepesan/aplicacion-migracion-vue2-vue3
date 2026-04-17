import { createStore } from 'vuex'

export default createStore({
    state: {
        tasks: ['Aprender Vue 2', 'Preparar migración a Vue 3']
    },
    mutations: {
        ADD_TASK(state, task) {
            state.tasks.push(task)
        }
    },
    actions: {
        addTask({ commit }, task) {
            commit('ADD_TASK', task)
        }
    }
})