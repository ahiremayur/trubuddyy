import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { SearchModel } from 'src/app/utilities/models/workData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: SearchModel[]=[];

  name!: string ;
  job!: string ;
  degree!: string ;
  company!: string;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchData()
      

  }

  fetchData() {
    this.route.queryParams.subscribe(params => {
 
      const url = CONFIG['serverURL']+'/search/'; 
      this.http.get<SearchModel[]>(url+`?name=${this.name??""}&degree=${this.degree??""}&profession=${this.job??""}&company=${this.company??""}`).subscribe(
        (response:SearchModel[]) => {
          this.items = response;
          console.log(response)
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
