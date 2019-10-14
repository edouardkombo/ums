import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { User } from '@app/_models';
import { AlertService, UserService, AuthenticationService, RelationsService } from '@app/_services';

@Component({
  templateUrl: '../_forms/user-crud.html', 
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    componentForm: FormGroup;
    loading = false;
    submitted = false;
    formatedSkills: any;
    genders: any;
    groups: any;
    eighteenYearsAgo = (new Date()).setFullYear((new Date()).getFullYear()-18);
    public dateValue: Date = new Date(this.eighteenYearsAgo);
    messages: any;
  
    dropdownList = [];
    selectedItems: any;
    dropdownSettings = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private relationsService: RelationsService
    ) {
          this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
          this.messages = {
                "title": "Update my profile",
                "action": {
                    "submit": "Update",
                    "cancel": "Cancel",
                }
          };
    }

    ngOnInit() {
        this.componentForm = this.formBuilder.group({
            firstname: [this.currentUser.firstname, Validators.required],
            lastname: [this.currentUser.lastname, Validators.required],
            username: [this.currentUser.username, Validators.required],
            email: [this.currentUser.email, Validators.required],
            password: [this.currentUser.password, [Validators.required, Validators.minLength(6)]],
            dob: [this.currentUser.dob, Validators.required],
            telephone: [this.currentUser.telephone, Validators.required],
            gender: [this.currentUser.gender, Validators.required],
            group: [this.currentUser.group, Validators.required],
            skills: [this.currentUser.skills, Validators.required],
        });
      

        this.dropdownList = this.relationsService.getAllSkills();
        this.genders = this.relationsService.getAllGenders();
        this.groups = this.relationsService.getAllGroups();

        this.selectedItems = [];
        this.selectedItems = this.dropdownList.filter((el, key) => this.currentUser.skills.includes(el.id));

        this.dropdownSettings = { 
            singleSelection: false, 
            text:"Select skills",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            classes:"myclass custom-class"
        };  
    }

    onItemSelect(item: any){
       console.log(item);
    }
  
    OnItemDeSelect(item: any){
        console.log(item);
    }
  
    onSelectAll(items: any){
        console.log(items);
    }
  
    onDeSelectAll(items: any){
        console.log(items);
    }
  
    formatRelations() {
      return this.componentForm.value.skills = this.selectedItems.map(item => item.id);
    }  
  
    // convenience getter for easy access to form fields
    get f() { return this.componentForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.componentForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.formatRelations();
      
        this.userService.update(this.componentForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log("Ouhlala", data);
                    this.authenticationService.update(data);
                    this.alertService.success('Profile successfully updated', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
