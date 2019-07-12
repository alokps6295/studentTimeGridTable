import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToasterModule} from 'angular2-toaster'
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtConfig } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentEntryComponent } from './studentEntry/studentEntry.component';
import { TokenInterceptor } from './shared/services/api/token-interceptor.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
export const httpInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentEntryComponent
  ],
  imports: [
  BrowserModule,
  Ng2SmartTableModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    JwtModule.forRoot(jwtConfig),
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ httpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
