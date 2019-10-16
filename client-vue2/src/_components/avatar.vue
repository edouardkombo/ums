<template>
    <div>
        <a class="nav-item nav-link">
            <img 
                 :src="account.user.image" 
                 width="80px" height="80px"
                 style="background-color:grey;"
                 @click="triggerAvatarUpload()"
            >
            <i class='fas fa-pencil-alt' id="editImageIcon"></i>
        </a>
        <input 
            style="display:none;"
            type="file"
            id="file"
            accept="image/*"
            ref="file"
            @change="uploadAvatar($event)"
        >
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { mediaService, userService } from '../_services';
import config from 'config';

export default {
    name: 'navbar',
    computed: {
        ...mapState({
            account: state => state.account,
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear',
            alertError: 'alert/error',
            updateMe: 'account/updateMe'
        }),
        triggerAvatarUpload(){
            this.$refs.file.click()
        },        
        uploadAvatar(event) {
            let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]); 

            //Upload image
            mediaService.upload(data)
              .then((response) => {
                  console.log("ze response", response);
                  this.$set(this.account.user, 'image', config.apiUrl + response.data.contentUrl);
                  this.updateMe({image: response.data['@id']}, config.apiUrl + response.data.contentUrl)
              })
              .catch(error => {
                  this.alertError(error);
              });              
        },
    }
};
</script>
<style>
.navbar #editImageIcon {
    position: absolute;
    top: 72px;
    left: 85px;
    color: #527bff;
}
</style>