import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONFIG } from 'src/app/utilities/config';
import { getAccessToken, removeAccessToken } from 'src/app/utilities/token-handler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor (private http:HttpClient){}
  login_logout_name!:string;

  ngOnInit(): void {
      if (getAccessToken() == 'no'){
        this.login_logout_name = "LOGIN/SIGNUP";
      } else{
        this.login_logout_name = "LOGOUT";
      }

  }
  
  Logout(){
    if(this.login_logout_name=="LOGOUT"){
      const accessToken = getAccessToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${accessToken}`
      });
      const logoutURL = CONFIG['serverURL'] + '/user/logout/'
      this.http.post<any>(logoutURL,null, {headers}).pipe(
        catchError((error)=>{
          console.error('Registration API error : ',error);
          return throwError(error);
        })
      )
      .subscribe(()=>{
      })
      removeAccessToken();
    }
  }
}
