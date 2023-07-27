import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    const delayTime_ms = 5000;
    setTimeout(()=>{
      this.router.navigate(['/tru/mentors'])
    },delayTime_ms)
  }

}
