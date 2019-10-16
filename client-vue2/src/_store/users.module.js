import { userService } from '../_services';

const state = {
    status: {},
    me: null
};

const actions = {
    getMe({ commit }) {
        commit('getMeRequest');

        userService.getMe()
            .then(
                user => {
                    let fullUser = user.data;
                    fullUser.gender = JSON.parse(localStorage.getItem('genders')).filter(item => item.value === fullUser.gender)[0].label;
                    fullUser.group = JSON.parse(localStorage.getItem('groups')).filter(item => item.value === fullUser.group)[0].label;
                    fullUser.skills = JSON.parse(localStorage.getItem('skills'))
                        .filter(item => fullUser.skills.includes(item.value))
                        .map(item => item.label);

                    commit('getMeSuccess', fullUser)
                },
                error => commit('getMeFailure', error)
            );
    }
};

const mutations = {
    getMeRequest(state) {
        state.status = { loading: true };
        state.me = {};
    },
    getMeSuccess(state, me) {
        state.status = {};
        state.me = me;
    },
    getMeFailure(state, me) {
        state.status = {};
        state.me = null;
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
