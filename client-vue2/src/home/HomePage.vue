<template>
    <div>
        <h1>Hi {{account.user.firstname}}!</h1>
        <p>You're logged in with VueJS2 + Vuex!!</p>
        <em v-if="users.loading">Loading ...</em>
        <div v-if="users !== undefined">
            <ul>        
                <div v-for="(me, index) in users.me">
                    <li v-if="!forbiddenFields.includes(index)">
                        {{index}}: {{me}}
                    </li>
                </div>
            </ul>           
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            forbiddenFields: ['@context','@id','@type','image']
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users
        })
    },
    created () {
        this.getMe();
    },
    methods: {
        ...mapActions('users', {
            getMe: 'getMe'
        })
    }
};
</script>