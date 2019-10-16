const state = {
    type: null,
    message: null,
    property: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
        state.property = null;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = (typeof message !== 'string') ? message[0] : message;
        state.property = (typeof message !== 'string') ? message[1] : null;
    },
    clear(state) {
        state.type = null;
        state.message = null;
        state.property = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
