import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

// used to create backend
import { backendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';

import { environment } from '@environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        routing,
        DatePickerModule,
        AngularMultiSelectModule,      
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create backend
        backendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: `${environment.graphQlUrl}`}),
      cache: new InMemoryCache()
    });
  }
}