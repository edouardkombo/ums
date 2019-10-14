import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class backendInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;        
        // array in local storage for registered users
        //let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/auth') && request.method === 'POST') {
                return next.handle(request).pipe(
                  tap(evt => {
                      if (evt instanceof HttpResponse) {
                          let token = evt.body.token;
                          let user = JSON.parse(atob(token.split('.')[1]));
                          user.token = token;

                         return of(new HttpResponse({ status: evt.status, body: user })); 
                      }
                  }),
                  catchError((err: any) => {
                      let message = "Invalid username or password";
                      if(err instanceof HttpErrorResponse) {
                          message = 'An error occurred';
                      }
                      return throwError({ error: { status: err.error.code, message: err.error.message } });
                  })
                );
            }

            // get current user with ACL included
            if (request.url.endsWith('/users/me') && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === `Bearer ${currentUser.token}`) {
                     return next.handle(request).pipe(
                        tap(evt => {
                            if (evt instanceof HttpResponse) {
                              return of(new HttpResponse({ status: evt.status, body: evt.body })); 
                            }
                        }),
                        catchError((err: any) => {
                           return throwError({ status: err.error.code, error: { message: 'Unauthorized' } });
                        })
                    );                 

                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorized' } });
                }
            }          

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let backendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: backendInterceptor,
    multi: true
};