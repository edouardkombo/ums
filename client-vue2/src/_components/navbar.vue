<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <avatar />
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-item nav-link" @click="redirectTo('/')">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" @click="redirectTo('/profile')">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" @click="redirectTo('/logout')">Logout</a>
            </li>
          </ul>
        </div>
    </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'navbar',
    components: {
      'avatar': () => import('./avatar')
    },
    computed: {
        ...mapState({
            account: state => state.account,
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
        redirectTo(link) {
            this.$router.push(link);
        }
    }
};
</script>