import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { NgForm } from '@angular/forms';
// import { CheckboxService } from './modules/admin/Mycomponents/checkbox.service';

import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './components/payment/success/success.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SuccessComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbDropdownModule,
    FormsModule,
    HttpClientModule,
    // NgForm,
    // NgModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
