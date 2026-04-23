import Vue from 'vue'
import Vuex from 'vuex'

const storeOptions = {
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
}

function createStoreInstance(options) {
    if (typeof Vuex.createStore === 'function') {
        return Vuex.createStore(options)
    }

    Vue.use(Vuex)
    return new Vuex.Store(options)
}

export { storeOptions, createStoreInstance }

export default createStoreInstance(storeOptions)
