<template>
    <div>
        <!-- nav -->
        <navbar
          v-if="account.status.loggedIn"
        />

        <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 offset-sm-3">
                        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gqlQuery from '../_graphql/queries';

export default {
    name: 'app',
    components: {
      'navbar': () => import('../_components/navbar')
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
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    },
    apollo: {
        // Get all genders, groups and skills for signup
        collection_query_genders_groups_skills: {
            query: () => gqlQuery.relations,
            variables() {
                return {}
            },
            result ({ data, loading, networkStatus }) {
                if (7 === networkStatus && !loading) {
                    let genders = data.genders.edges.map(el => ({value: el.node.id, label: el.node.name}));
                    let groups = data.groups.edges.map(el => ({value: el.node.id, label: el.node.name}));
                    let skills = data.skills.edges.map(el => ({value: el.node.id, label: el.node.name}));

                    localStorage.setItem('genders', JSON.stringify(genders));
                    localStorage.setItem('groups', JSON.stringify(groups));
                    localStorage.setItem('skills', JSON.stringify(skills));
                }
            },
            error (error) {
                //this.flashError(error);
            }
        }
    },
};
</script>