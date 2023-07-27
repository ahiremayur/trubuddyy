import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {CONFIG} from '../../../../utilities/config';
import { getAccessToken, setAccessToken } from 'src/app/utilities/token-handler';
import { Router } from '@angular/router';
import { MenteeDataModel } from 'src/app/utilities/models/userdata';


@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css']
})
export class PersonalInfoFormComponent implements OnInit{
  personalInfo: any = {}; 


 constructor (private http: HttpClient, private router: Router) {}
  imagebase64 !: string
 
  ngOnInit(): void {
    const accessToken = getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    });
    
    const viewmyInfoURL = CONFIG['serverURL']+"/user/myprofile/"

    this.http.get<any>(viewmyInfoURL , {headers}).subscribe(
      (response) => {
       
        this.personalInfo = response;
        console.log(this.personalInfo)
      },
      error => {
        console.error('Error fetching work experiences:', error);
      }
    );
      
  }
  onImageSelect(event: any){
    const fileInput = event.target as HTMLInputElement;
    if(fileInput.files && fileInput.files.length >0){
      const file = fileInput.files[0]
      const reader = new FileReader();
      reader.onloadend = () => {
          this.imagebase64 = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  submitForm() {
    // const formData= new FormData();
    // formData.append('image',this.image, this.image.name);

    const personalInfoData = 
       {
        profile_pic : this.imagebase64,
        first_name: (<HTMLInputElement>document.getElementById('firstName')).value,
        last_name: (<HTMLInputElement>document.getElementById('lastName')).value,
        dateOfBirth: (<HTMLInputElement>document.getElementById('dob')).value,
        address: (<HTMLInputElement>document.getElementById('address')).value,
        i_am_a:(<HTMLInputElement>document.getElementById('identity')).value,
        gender: (<HTMLInputElement>document.getElementById('gender')).value,
        ethnicity: (<HTMLInputElement>document.getElementById('ethnicity')).value,
        nationality: (<HTMLInputElement>document.getElementById('nationality')).value,
      }
      
    // const formData = {
    //   'schoolData':schoolData,
    //   'higherEducation':higherEducation,
    //   'workExperience':workExperienceData
    // };

    console.log(personalInfoData);
    // Make API call to submit data
    const accessToken = getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    });

    const registerURL = CONFIG['serverURL']+"/user/editmyprofile/"

      this.http.post<any>(registerURL, personalInfoData, {headers}).pipe(
        catchError((error)=>{
          console.error('Registration API error : ',error);
          return throwError(error);
        })
      )
      .subscribe(()=>{
        this.router.navigate(['/tru/mentee_dashboard']);
      })

    }
}
