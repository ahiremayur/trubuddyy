import { Component, OnInit } from '@angular/core';
import { school10DataModel } from 'src/app/utilities/models/schoolData';
import { school12DataModel } from 'src/app/utilities/models/schoolData';
import { schoolgradDataModel } from 'src/app/utilities/models/schoolData';
import { schoolpostgradDataModel } from 'src/app/utilities/models/schoolData';
import { schoolprofDataModel } from 'src/app/utilities/models/schoolData';
import { MenteeDataModel } from 'src/app/utilities/models/userdata';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAccessToken } from 'src/app/utilities/token-handler';
import { CONFIG } from 'src/app/utilities/config';
import { PersonalityModel, workexpDataModel } from 'src/app/utilities/models/workData';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(private router:Router, private http: HttpClient){}
  school10Data!: school10DataModel;
  school12Data!: school12DataModel;
  schoolgradData!: schoolgradDataModel;
  schoolpostgradData!: schoolpostgradDataModel;
  schoolprofData!: schoolprofDataModel;
  workData:  workexpDataModel[]=[];
  personalInfoData!: MenteeDataModel;
company!:string
mypersonality!: PersonalityModel;

  getData() {
    // Get the access token from wherever you have stored it
    const accessToken = getAccessToken();
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}`
    });
  
    // Make the API call
    this.http.get<any>(CONFIG['serverURL']+'/user/viewmyschooledu', { headers }).subscribe(
      (response) => {
        
        console.log(response);
        
        this.school10Data = response[0]
        this.school12Data=response[1]
      },
      (error) => {
       
        console.error(error);
      }
    );

    this.http.get<any>(CONFIG['serverURL']+'/user/mypersonalitydata/', { headers }).subscribe(
      (response) => {
        
        // console.log(response);
        
        this.mypersonality = response;
       
      },
      (error) => {
       
        console.error(error);
      }
    );

    const viewmyworkexpURL = CONFIG['serverURL']+"/user/viewmyworkexp/"


    this.http.get<any>(viewmyworkexpURL, { headers }).subscribe(
      (response) => {
       
        var workExperienceArray = []
        for (const items of response){
          workExperienceArray.push(items)
        }
        // console.log(workExperienceArray)
        this.workData = workExperienceArray;

        // console.log(response)
        // this.workData = response
      },
      (error) => {
        
        console.error(error);
      }
    );

    this.http.get<any>(CONFIG['serverURL']+'/user/viewmyhigheredu', { headers }).subscribe(
      (response) => {
        // Handle the response here
        // console.log(response);
      
        this.schoolgradData = response[0]
        this.schoolpostgradData=response[1]
        this.schoolprofData=response[2 ]

      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
    this.http.get<any>(CONFIG['serverURL']+'/user/myprofile', { headers }).subscribe(
      (response) => {
        // Handle the response here
        // console.log(response);
      
        this.personalInfoData = response
        this.personalInfoData.profile_pic = 'data:image/jpeg;base64,' + this.personalInfoData.profile_pic
       

      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );

  }

  ngOnInit(): void {
    
    this.getData();
}
   
}
