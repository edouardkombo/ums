import { userService, mediaService } from '../_services'
import { router, errorResponse } from '../_helpers'
import config from 'config'

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, me: null };

const actions = {
    login({ dispatch, commit }, credentials) {
        commit('loginRequest', credentials.email);
    
        userService.login(credentials)
            .then(
                login_payload => {
                    if (!login_payload) {
                        commit('loginFailure', null);
                        dispatch('alert/error', "Email or password incorrect!", { root: true });
                        return false;
                    }
                  
                    //We save the token first, to be sent by default
                    localStorage.setItem('user', JSON.stringify({token: login_payload.data.token}));
                    return true;
                },
                error => errorResponse(error, 'loginFailure', commit, dispatch)
            )
            .then(
                res => {
                 
                    if (null === JSON.parse(localStorage.getItem('user'))) {
                        return false;
                    }
                  
                    //Get current user data
                    userService.getMe()
                       .then(
                            me_payload => {
                               let me = me_payload.data;

                               if (null === me.image) {
                                   me.token = JSON.parse(localStorage.getItem('user')).token;
                                   localStorage.setItem('user', JSON.stringify(me));
                                   commit('loginSuccess', me);
                                  
                                   window.location.href= '/';
                               }
                              
                              return false;

                         },
                         error =>  errorResponse(error, 'loginFailure', commit, dispatch) 
                    )
                }
            )
            .then(
                res => {
                    let me = JSON.parse(localStorage.getItem('user'));

                    if (null === me || (Object.keys(me).includes('image') && null === me.image)) {
                        return false;
                    }
                  
                    //Update image url
                    mediaService.getUrl(me.image)
                        .then(
                            media_payload => {
                                me.image = config.apiUrl + media_payload.data.contentUrl;

                                localStorage.setItem('user', JSON.stringify(me));

                                commit('loginSuccess', me);
                              
                                window.location.href= '/';
                            },
                            error => errorResponse(error, 'loginFailure', commit, dispatch)
                        )                  
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user.data);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => errorResponse(error, 'registerFailure', commit, dispatch)
            );
    },
    updateMe({ dispatch, commit }, data, contentUrl = '') {
      
        userService.update(data)
            .then(
                user => {
                    let me = user.data;
                    me.image = contentUrl || me.image;
                    commit('updateSuccess', me);
                    dispatch('alert/success', 'Data successfully updated', { root: true });
                },
                error => errorResponse(error, 'updateFailure', commit, dispatch)
            );
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.me = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.me = user;
    },
    loginFailure(state) {
        state.status = {};
        state.me = null;
    },
    updateSuccess(state, user) {
        state.status = { loggedIn: true };
        state.me = user;
    },
    updateFailure(state) {
        state.status = {};
        state.me = null;
    },
    logout(state) {
        state.status = {};
        state.me = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};