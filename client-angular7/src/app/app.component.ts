import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, GraphqlQueriesService, MediasService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    fileData: File = null;
  
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private graphqlQueriesService: GraphqlQueriesService,
        private mediasService: MediasService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.graphqlQueriesService.getGendersGroupsAndSkills(cb => true);
    }
  
    importFile(event: any) {
        this.fileData = <File>event.target.files[0];
        this.mediasService.uploadAvatar(this.fileData, this.authenticationService, this.currentUser, (iri, url) => {
            //Link media to user
            this.mediasService.linkAvatarToUser(iri);
        });
    }
  
    onImgError(event) {
      return event.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    }
  
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}