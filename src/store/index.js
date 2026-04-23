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
    return Vuex.createStore(options)
}

export { storeOptions, createStoreInstance }

export default createStoreInstance(storeOptions)
