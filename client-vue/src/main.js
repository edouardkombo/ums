import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import VFC from 'vfc';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ENTRYPOINT } from './config/entrypoint';
import VueApollo from 'vue-apollo';
import VueFlashMessage from 'vue-flash-message';


import homeRoute from './router/default';
import userRoutes from './router/user';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: ENTRYPOINT + '/graphql',
})

const token = localStorage.getItem('token') || null
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (null !== token) {
    operation.setContext({
        headers: {
            authorization: `Bearer ${token}`
        }
    })
  }
  return forward(operation)
})
  
// Cache implementation
const cache = new InMemoryCache()
  
// Create the apollo client
const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

Vue.use(VFC);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueApollo);
Vue.use(VueFlashMessage);

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...userRoutes,
      ...homeRoute
  ]
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (null === token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.redirectIfLogged)) {
        if (store.getters.authenticated) {
            next({
                path: '/user/me'
            })
        } else {
            next()
        }
    } else {
            next()
    }
    
    return (null === token) ? next('/login') : false;
});

new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
});
