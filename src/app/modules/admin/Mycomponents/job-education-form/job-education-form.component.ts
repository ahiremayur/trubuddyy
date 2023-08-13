import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {CONFIG} from '../../../../utilities/config';
import { getAccessToken, setAccessToken } from 'src/app/utilities/token-handler';
import { PersonalityModel } from 'src/app/utilities/models/workData';

@Component({
  selector: 'app-job-education-form',
  templateUrl: './job-education-form.component.html',
  styleUrls: ['./job-education-form.component.css']
})
export class JobEducationFormComponent implements OnInit{
  
  workExperiences: any[] = [];
  schoolData: any = {};
  higherEducation: any ={};
strength: any= {};
weakness: any = {};
likes: any={};
dislikes: any={};
describeMe: any={};
personality: any={}
personalityData!: PersonalityModel;

  ngOnInit() {
    const accessToken = getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    });
    const viewmyworkexpURL = CONFIG['serverURL']+"/user/viewmyworkexp/"
    const viewmyschooleduURL = CONFIG['serverURL']+"/user/viewmyschooledu/"
    const viewmyhighereduURL = CONFIG['serverURL']+"/user/viewmyhigheredu/"
    const mypersonalitydataURL = CONFIG['serverURL']+"/user/mypersonalitydata/"



    this.http.get<any>(viewmyworkexpURL , {headers}).subscribe(
      (response) => {
        var workExperienceArray = []
        for (const items of response){
          workExperienceArray.push(items)
        }
        // console.log(workExperienceArray)
        this.workExperiences = workExperienceArray;
      },
      error => {
        console.error('Error fetching work experiences:', error);
      }
    );
    
    this.http.get<any>(viewmyschooleduURL , {headers}).subscribe(
      (response) => {
       
        this.schoolData = response;
        // console.log(this.schoolData)
      },
      error => {
        console.error('Error fetching work experiences:', error);
      }
    );

    this.http.get<any>(mypersonalitydataURL , {headers}).subscribe(
      (response) => {
       
        this.personalityData = response;
        // console.log(response)
      },
      error => {
        console.error('Error fetching work experiences:', error);
      }
    );

    this.http.get<any>(viewmyhighereduURL , {headers}).subscribe(
      (response) => {
       
        this.higherEducation = response;
        // console.log(this.schoolData)
      },
      error => {
        console.error('Error fetching work experiences:', error);
      }
    );
  }

  addWorkExperience() {
    this.workExperiences.push({ company: '', job: '', description: '', duration: '' });
  }

  removeWorkExperience(index: number) {
    this.workExperiences.splice(index, 1);
  }
 constructor (private http: HttpClient, private router: Router) {}
  submitForm() {

    const schoolData = [
       {qualification : '10th',
        board: (<HTMLInputElement>document.getElementById('board10')).value,
        school: (<HTMLInputElement>document.getElementById('school10')).value,
        marks: (<HTMLInputElement>document.getElementById('marks10')).value,
        year: (<HTMLInputElement>document.getElementById('year10')).value
      },
      { qualification: '12th',
        board: (<HTMLInputElement>document.getElementById('board12')).value,
        school: (<HTMLInputElement>document.getElementById('school12')).value,
        marks: (<HTMLInputElement>document.getElementById('marks12')).value,
        year: (<HTMLInputElement>document.getElementById('year12')).value
      },]

       this.strength = [
        (<HTMLInputElement>document.getElementById('strength')).value
      ]
    
    const personality = {
      strength : (<HTMLInputElement>document.getElementById('strength')).value,
      weakness : (<HTMLInputElement>document.getElementById('weakness')).value,
      likes : (<HTMLInputElement>document.getElementById('likes')).value,
      dislikes : (<HTMLInputElement>document.getElementById('dislikes')).value,
      discribeMe:(<HTMLInputElement>document.getElementById('describeMe')).value
    }

      const higherEducation=[
      { qualification : 'graduation',
        degree: (<HTMLInputElement>document.getElementById('degree_grad')).value,
        school: (<HTMLInputElement>document.getElementById('university_grad')).value,
        marks: (<HTMLInputElement>document.getElementById('marks_grad')).value,
        year: (<HTMLInputElement>document.getElementById('year_grad')).value
      },
      { qualification : 'postGraduation',
        degree: (<HTMLInputElement>document.getElementById('degree_postgrad')).value,
        school: (<HTMLInputElement>document.getElementById('university_postgrad')).value,
        marks: (<HTMLInputElement>document.getElementById('marks_postgrad')).value,
        year: (<HTMLInputElement>document.getElementById('year_postgrad')).value
      },
      { qualification : 'professionalDegree',
        degree: (<HTMLInputElement>document.getElementById('degree_prof')).value,
        school: (<HTMLInputElement>document.getElementById('school_prof')).value,
        marks: (<HTMLInputElement>document.getElementById('marks_prof')).value,
        year: (<HTMLInputElement>document.getElementById('year_prof')).value
      }
    ];

    const workExperienceData = this.workExperiences.map((experience, index) => {
      return {
        company: (<HTMLInputElement>document.getElementById(`company${index}`)).value,
        job: (<HTMLInputElement>document.getElementById(`job${index}`)).value,
        description: (<HTMLInputElement>document.getElementById(`description${index}`)).value,
        duration: (<HTMLInputElement>document.getElementById(`duration${index}`)).value
      };
    });

    const formData = {
      'schoolData':schoolData,
      'higherEducation':higherEducation,
      'workExperience':workExperienceData,
      'personality': personality
    };

    console.log(formData);
    // Make API call to submit data
    const accessToken = getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    });
    const registerURL = CONFIG['serverURL']+"/user/editmyeducationandwork/"
      this.http.post<any>(registerURL, formData, {headers}).pipe(
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


  // addEntry(): void {
  //   const container = document.getElementById('entriesContainer');
  //   if (container !== null) {
  //     const entry = document.createElement('div');
  //     entry.classList.add('entry');
  //     entry.innerHTML = `
  //     <label style="margin-left: 2%;" for="job">COMPANY </label>
  //     <input type="text" name="job" required />
  //     <label style="margin-left: 2%;" for="job">JOB TITLE </label>
  //     <input type="text" name="job" required />
  //     <label style="margin-left: 2%;" for="job">JOB DESCRIPTION </label>
  //     <input type="text" name="job" required />
  //     <label style="margin-left: 2%;" for="job">DURATION </label>
  //     <input type="text" name="job" required />
  //     `;
  //     container.appendChild(entry);
  //   }
  // }

  // constructor (private http: HttpClient, private router: Router) {}
 
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     var formdata = {
  //       "board_10":(document.getElementById('board10') as HTMLInputElement).value,
  //       "school_10":(document.getElementById('school10') as HTMLInputElement).value,
  //       "marks_10":(document.getElementById('marks10') as HTMLInputElement).value,
  //       "year_10":(document.getElementById('year10') as HTMLInputElement).value,

  //       "board_12":(document.getElementById('board12') as HTMLInputElement).value,
  //       "school_12":(document.getElementById('school12') as HTMLInputElement).value,
  //       "marks_12":(document.getElementById('marks12') as HTMLInputElement).value,
  //       "year_12":(document.getElementById('year12') as HTMLInputElement).value,

  //       "degree_Grad":(document.getElementById('degree_grad') as HTMLInputElement).value,
  //       "university_Grad":(document.getElementById('university_grad') as HTMLInputElement).value,
  //       "marks_Grad":(document.getElementById('marks_grad') as HTMLInputElement).value,
  //       "year_Grad":(document.getElementById('year_grad') as HTMLInputElement).value,

  //       "degree_Postgrad":(document.getElementById('degree_postgrad') as HTMLInputElement).value,
  //       "university_Postgrad":(document.getElementById('university_postgrad') as HTMLInputElement).value,
  //       "marks_Postgrad":(document.getElementById('marks_postgrad') as HTMLInputElement).value,
  //       "year_Postgrad":(document.getElementById('year_postgrad') as HTMLInputElement).value,

  //       "degree_Prof":(document.getElementById('degree_prof') as HTMLInputElement).value,
  //       "school_Prof":(document.getElementById('school_prof') as HTMLInputElement).value,
  //       "marks_Prof":(document.getElementById('marks_prof') as HTMLInputElement).value,
  //       "year_Prof":(document.getElementById('year_prof') as HTMLInputElement).value,

  //       "Company":(document.getElementById('company') as HTMLInputElement).value,
  //       "Job":(document.getElementById('job') as HTMLInputElement).value,
  //       "Desc":(document.getElementById('desc') as HTMLInputElement).value,
  //       "Duration":(document.getElementById('duration') as HTMLInputElement).value,
        
  //     }

  //     const registerURL = CONFIG['serverURL']+"/user/register/"
  //     this.http.post<any>(registerURL, this.workExperiences).pipe(
  //       catchError((error)=>{
  //         console.error('Registration API error : ',error);
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe((response)=>{
  //       const token = response.token;
  //       setAccessToken(token);
        
  //       this.router.navigate(['/tru/mentee_dashboard']);
  //     })

  //   }
  // }


