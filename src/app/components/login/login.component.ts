import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {CONFIG} from '../../utilities/config';
import { setAccessToken } from 'src/app/utilities/token-handler';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private http: HttpClient, private router: Router) {}
  // constructor(private ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      var formdata = {
        "username":(document.getElementById('phone') as HTMLInputElement).value,
        "password":(document.getElementById('password') as HTMLInputElement).value,
      }

      const loginURL = CONFIG['serverURL']+"/user/login/"
      this.http.post<any>(loginURL, formdata).pipe(
        catchError((error)=>{
          console.error('Registration API error : ',error);
          return throwError(error);
        })
      )
      .subscribe((response)=>{
        const token = response.token;
        setAccessToken(token);
        console.log(response)
        localStorage.setItem('isMentor',response.isMentor.toString())
        if(response.isMentor == false && token != ""){
          this.router.navigate(['/tru/mentee_dashboard']);
      }
      else if(response.isMentor == true && token != ""){
        this.router.navigate(['/tru/mentor_dashboard']);
      }
    })

    }
  }
}
