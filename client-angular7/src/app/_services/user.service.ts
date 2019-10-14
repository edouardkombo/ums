import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpClient,
    ) { }

    me() {
        return this.http.get(`${environment.apiUrl}/users/me`);
    }
  
    getAvatarUrl(iri: string): any {
        return this.http.get(`${environment.apiUrl}${iri}`);
    } 

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/me`, user);
    }
  
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users`, user);
    }
}