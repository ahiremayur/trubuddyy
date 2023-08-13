import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { InfoModel, JobModel, SearchModel } from 'src/app/utilities/models/workData';
import { ActivatedRoute, Router } from '@angular/router';
import { getAccessToken } from 'src/app/utilities/token-handler';

@Component({
  selector: 'app-mentor-info',
  templateUrl: './mentor-info.component.html',
  styleUrls: ['./mentor-info.component.css']
})
export class MentorInfoComponent implements OnInit {
  person!: InfoModel;
  workData:JobModel[]=[];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const personId = +params['id']; // Get the person ID from the route parameter
      this.getPersonData(personId);
      this.getWorkData(personId)
    });
    this.redirectToLogin();
  }

  getPersonData(id: number) {
    const apiUrl = CONFIG['serverURL']+'/user/public-mentor-details'; 
    this.http.get<InfoModel>(`${apiUrl}/${id}`)
      .subscribe(
        (response: InfoModel) => {
         this.person = response;
        //  console.log(response)
         
        },
        error => {
          console.error('Error fetching person data:', error);
        }
      );
  }

  getWorkData(id: number) {
    const apiUrl = CONFIG['serverURL']+'/user/public-mentor-details'; 
    this.http.get<any>(`${apiUrl}/${id}`)
      .subscribe(
        (response) => {
          var workExperienceArray = []
          for (const items of response.work_experience){
            workExperienceArray.push(items)
          }
          // console.log(workExperienceArray)
          this.workData = workExperienceArray;
        },
        error => {
          console.error('Error fetching person data:', error);
        }
      );
  }

  showPersonDetails(personId: number): void {
    this.router.navigate(['/tru/book', personId]);
  }

  redirectToLogin(){
    if (getAccessToken() == 'no'){
      this.router.navigate(['/signup'])
    }
  }

}