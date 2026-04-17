import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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