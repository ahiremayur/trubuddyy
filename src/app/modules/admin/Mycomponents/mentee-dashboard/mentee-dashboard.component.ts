import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAccessToken } from 'src/app/utilities/token-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { MenteeDataModel } from 'src/app/utilities/models/userdata';
import { setAccessToken } from 'src/app/utilities/token-handler';
import { catchError, throwError } from 'rxjs';
import { SessionDataMenteeModel } from 'src/app/utilities/models/workData';


@Component({
  selector: 'app-mentee-dashboard',
  templateUrl: './mentee-dashboard.component.html',
  styleUrls: ['./mentee-dashboard.component.css']
})
export class MenteeDashboardComponent implements OnInit {
  constructor(private router:Router, private http: HttpClient){}
  userData!: MenteeDataModel;
  isMentor !: string;
  sessionData: SessionDataMenteeModel[]=[];

  getData() {
    // Get the access token from wherever you have stored it
    const accessToken = getAccessToken();
  
    // Set the HTTP headers with the access token
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}`
    });
  
    // Make the API call
    this.http.get<MenteeDataModel>(CONFIG['serverURL']+'/user/myprofile', { headers }).subscribe(
      (response:MenteeDataModel) => {
        
        // console.log(response);
        this.userData = response
        this.userData.profile_pic = 'data:image/jpeg;base64,' + this.userData.profile_pic
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );

    this.http.get<any>(CONFIG['serverURL']+'/user/mysessions', { headers }).subscribe(
      (response) => {
        // Handle the response here
        // console.log(response);
        this.sessionData = response.sessions

      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  
  ngOnInit(): void {
      this.redirectToLogin();
      this.getData();
      this.isMentor = localStorage.getItem('isMentor') || false.toString() ;
      if(JSON.parse(this.isMentor) == true){
        this.router.navigate(['/tru/mentor_dashboard'])
      }
    
      // this.redirectToMentor();
    
  }
  
  redirectToLogin(){
    if (getAccessToken() == 'no'){
      this.router.navigate(['/login'])
    }
  }


}
