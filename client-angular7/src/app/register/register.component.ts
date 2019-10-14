import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AlertService, UserService, AuthenticationService, GraphqlQueriesService } from '@app/_services';

@Component({
  templateUrl: '../_forms/user-crud.html', 
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
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
        private graphqlQueriesService: GraphqlQueriesService,
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
          
        this.messages = {
            "title": "Register",
            "action": {
                "submit": "Register",
                "cancel": "Cancel",
            }
        };
    }

    ngOnInit() {
        this.componentForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            dob: ['', Validators.required],
            telephone: ['', Validators.required],
            gender: ['', Validators.required],
            group: ['', Validators.required],
            skills: ['', Validators.required],
        });
      
        this.graphqlQueriesService.getGendersGroupsAndSkills((cb) => {
          this.selectedItems = [];
          this.dropdownList = cb.skills;

          this.selectedItems = [this.dropdownList[1]];
          
          this.genders = cb.gender;
          this.groups = cb.group;
          
          cb.gender = this.genders[0].id;
          cb.group = this.groups[0].id;

          this.dropdownSettings = { 
              singleSelection: false, 
              text:"Select skills",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class"
          };  

          this.componentForm.patchValue(cb);
        });
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
      
        this.userService.register(this.componentForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
