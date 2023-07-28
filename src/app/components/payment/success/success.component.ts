import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CONFIG } from 'src/app/utilities/config';
import { getAccessToken } from 'src/app/utilities/token-handler';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{
  constructor(private http: HttpClient, 
    private route: ActivatedRoute, private router:Router) {}
  
  sessionID!: string;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.sessionID = params['session_id'];
        console.log(this.sessionID); // price
      }
    );
    const accessToken = getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}`
    });
  
    var formdata={
      "sessionID":this.sessionID,
    }

    this.http.post<any>(CONFIG['serverURL']+'/sessions/payment-success/',formdata, { headers }).subscribe(
      (response:any) => {
        console.log(response)
        const delayTime_ms = 5000;
        setTimeout(()=>{
          this.router.navigate(['/tru/mentee_dashboard'])
        },delayTime_ms)},
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }
  
}
