import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { InfoModel } from 'src/app/utilities/models/workData';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mentor-info',
  templateUrl: './mentor-info.component.html',
  styleUrls: ['./mentor-info.component.css']
})
export class MentorInfoComponent implements OnInit {
  person!: InfoModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const personId = +params['id']; // Get the person ID from the route parameter
      this.getPersonData(personId);
    });
  }

  getPersonData(id: number) {
    const apiUrl = CONFIG['serverURL']+'/user/public-mentor-details'; 
    this.http.get<InfoModel>(`${apiUrl}/${id}`)
      .subscribe(
        (response: InfoModel) => {
         this.person = response;
         console.log(response)
        },
        error => {
          console.error('Error fetching person data:', error);
        }
      );
  }

  showPersonDetails(personId: number): void {
    this.router.navigate(['/tru/book', personId]);
  }

}