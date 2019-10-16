<template>
    <div class="jumbotron">
        <h2>Edit my profile</h2>
        <vue-form-builder
            v-if="typeof form === 'object'"
            ref="edit"
            v-model="form.model"
            :schema="form.schema"
            :options="form.schema.formOptions"
            @action="onAction"
        />
    </div>
</template>

<script>
import 'vfc/dist/vfc.css';
import { Input } from 'vfc';
import forms from '../_forms/user-edit-form';
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            form:''
        }
    },
    computed: {
        ...mapState({
            account: state => state.account
        })
    },
    mounted () {
      //Get Default values
      for (let field in this.account.user) {
          if (forms.userEditForm.model[field] !== undefined) {
              this.$set(forms.userEditForm.model, field, this.account.user[field]);
          }
      }
      this.form = forms.userEditForm;
    },
    methods: {
        ...mapActions('account', ['updateMe']),
        async onAction (e) {
            if (e.type === 'submit') {
                const res = await this.$refs.edit.$validator.validate();
console.log("reso", res);
                if (!res) {
                    return false;
                }

                this.updateMe(this.form.model);
            }
        },
    }
};
</script>