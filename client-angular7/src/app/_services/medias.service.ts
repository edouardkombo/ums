import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class MediasService {
    constructor(
      private http: HttpClient
    ) {}

    uploadAvatar(fileData: File, authenticationService: AuthenticationService, currentUser: User, cb: any) {
        const formData = new FormData();
        formData.append('name', 'user-avatar');
        formData.append('file', fileData);
        return this.http.post<any>(`${environment.apiUrl}/media_objects`, formData, {
                reportProgress: true,
                observe: 'events'
            })
            .subscribe(events => {
                if(events.type == HttpEventType.UploadProgress) {
                    //console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
                } else if(events.type === HttpEventType.Response) {
                    //console.log(events);
                    if (events.ok) {
                      let imageUrl = `${environment.apiUrl}/${events.body.contentUrl}`;

                      currentUser.image = imageUrl;
                      authenticationService.update(currentUser);

                      cb(events.body['@id'], imageUrl);
                    }
                }
            })
    }
  
    linkAvatarToUser(iri: string) {
        return this.http.put<any>(`${environment.apiUrl}/users/me`, {
              image: iri
            })
            .subscribe(events => {
               if (events.type === HttpEventType.Response) {
                    if (events.ok) {
                        console.log(events.body);
                    } else {
                        return throwError({ error: { status: 400, message: 'An unexpected error occured!' } });
                    }
                }
            });
    } 
}