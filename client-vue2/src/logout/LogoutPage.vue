<template>
    <div>
        <h1>Thank you for your visit!</h1>
        <p>
            <router-link to="/">Return to home</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {}
    },
    created () {
        this.logout();
    },
    methods: {
        ...mapActions('account', {
            logout: 'logout'
        })
    }
};
</script>