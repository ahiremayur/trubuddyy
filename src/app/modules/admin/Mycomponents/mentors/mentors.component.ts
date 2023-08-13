import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { SearchModel } from 'src/app/utilities/models/workData';


@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {
  items: SearchModel[]=[];
  searchQuery: string = '';
  // filteredItems: SearchModel[] = [];
  name!: string ;
  job!: string ;
  degree!: string ;
  company!: string;
school!:string;
university!: string
board!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

ngOnInit(): void {
      this.fetchData()

      this.http.get<SearchModel[]>(CONFIG['serverURL']+'/search/').subscribe(
        (response:SearchModel[]) => {      
          // console.log(response);
          this.items = response
        },
        (error) => {
         
          console.error(error);
        }
      );

}

  fetchData() {
    this.route.queryParams.subscribe(params => {
      
      const url = CONFIG['serverURL']+'/search/'; 
    
      this.http.get<any>(url+`?name=${this.name??""}&degree=${this.degree??""}&job=${this.job??""}&company=${this.company??""}&school=${this.school??""}&board=${this.board??""}`).subscribe(
        (response) => {
          this.items = response;
          // console.log(response)
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }

  onSearchSubmit(): void {
    this.fetchData();
  }

  showPersonDetails(personId: number): void {
    this.router.navigate(['/tru/person', personId]);
  }

  
}
