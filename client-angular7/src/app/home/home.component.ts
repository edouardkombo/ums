import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    user = new User();
    exposableUser = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {  
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
        let promise = new Promise((resolve, reject) => {
          resolve('done');
        });

        promise
          .then(() => {
              this.loadMe();
          }).then(() => {
              this.loadAvatar();
          }).catch((err) => {
              console.log(err);
          });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    private loadAvatar() {
        this.userService.getAvatarUrl(this.currentUser.image).pipe(first()).subscribe(result => {
            let v = {...{}, ...result};
            this.currentUser.image = `${environment.apiUrl}${v.contentUrl}`;

            this.authenticationService.update(this.currentUser);
        })      
    }
  
    private loadMe() {
        for (let i in this.currentUser) {
           if (!['token','@context','@id','@type','password'].includes(i)) {
               
               this.user[i] = this.currentUser[i];
               if (!['image'].includes(i)) {
                   this.exposableUser[i] = this.currentUser[i];
               } 
           }
        }
    }
}