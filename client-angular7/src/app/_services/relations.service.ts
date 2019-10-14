import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class RelationsService {
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient
    ) {}
  
    getAllGenders() {
        return JSON.parse(localStorage.getItem('genders'));
    }
  
    getAllGroups() {
        return JSON.parse(localStorage.getItem('groups'));
    }
  
    getAllSkills() {
        return JSON.parse(localStorage.getItem('skills'));
    }
}