import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {CONFIG} from '../../utilities/config';
import { setAccessToken } from 'src/app/utilities/token-handler';
import { Router } from '@angular/router';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  otpGenerated!: boolean;
  otp!: string;
  otpVerificationResponse !: any
  otpVerificationToken !: string
    constructor (private http: HttpClient, private router: Router) {}

  
    signupSubmit(){
    }
  
    onSubmit(form: NgForm) {
      if (form.valid) {
        var formdata = {
          "first_name":(document.getElementById('firstName') as HTMLInputElement).value,
          "last_name":(document.getElementById('lastName') as HTMLInputElement).value,
          "username":(document.getElementById('phone') as HTMLInputElement).value,
          "password":(document.getElementById('password') as HTMLInputElement).value,
          "i_am_a":(document.getElementById('identity') as HTMLInputElement).value,
          "email":(document.getElementById('emailAddress') as HTMLInputElement).value,
        }


        const registerURL = CONFIG['serverURL']+"/user/register/"+this.otpVerificationToken
        this.http.post<any>(registerURL, formdata).pipe(
          catchError((error)=>{
            console.error('Registration API error : ',error);
            return throwError(error);
          })
        )
        .subscribe((response)=>{
          const token = response.token;
          setAccessToken(token);
          localStorage.setItem('isMentor',false.toString());
          this.router.navigate(['/tru/mentee_dashboard']);
        })

      }
    }

    generateOTP() {
      const otpGenerationUrl = CONFIG['serverURL']+`/user/generateotp/${(document.getElementById('phone') as HTMLInputElement).value}`;

  
      this.http.post(otpGenerationUrl, null)
        .subscribe(
          (response) => {
            // Handle successful OTP generation response
            console.log('OTP generated successfully');
            this.otpGenerated = true;
          },
          (error) => {
            // Handle error response or failed OTP generation
            console.error('OTP generation failed');
          }
        );

}


verifyOTP() {

  const otpVerificationUrl = CONFIG['serverURL']+"/user/verifyotp/";

  const requestBody = {
    phone: (document.getElementById('phone') as HTMLInputElement).value,
    otp: (document.getElementById('otp') as HTMLInputElement).value,
  };

  this.http.post(otpVerificationUrl, requestBody)
    .subscribe(
      (response) => {
        // Handle successful OTP verification response
        this.otpVerificationResponse = response;
        console.log(this.otpVerificationResponse['message'])
        this.otpVerificationToken = this.otpVerificationResponse['verificationToken']
        if (this.otpVerificationResponse['message'] != 'OTP verified'){
          alert(this.otpVerificationResponse['message']);
          location.reload()
        }
        // alert(this.otpVerificationResponse['message'])
        // Continue with signup process or any other action
      },
      (error) => {
        // Handle error response or failed OTP verification
        console.error('OTP verification failed');
        // Display error message or take appropriate action
      }
    );

}
}
