import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAccessToken } from 'src/app/utilities/token-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'src/app/utilities/config';
import { MenteeDataModel } from 'src/app/utilities/models/userdata';
import { setAccessToken } from 'src/app/utilities/token-handler';
import { catchError, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { TimeSlotService } from '../time-slot.service';

import { finalize, firstValueFrom } from 'rxjs';
import { timeDataModel } from 'src/app/utilities/models/workData';

interface TimeSlot {
  time: string;
  selected: boolean;
}

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css']
})
export class MentorDashboardComponent implements OnInit {
  isMentor !:string
  constructor(private router:Router, private http: HttpClient, private timeSlotService: TimeSlotService){}
  userData!: MenteeDataModel;



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
        // Handle the response here
        console.log(response);
        this.userData = response
        this.userData.profile_pic = 'data:image/jpeg;base64,' + this.userData.profile_pic
      },
      (error) => {
        // Handle errors here
        console.error(error);
      }
    );
  }

 
  


redirectToLogin(){
  if (getAccessToken() == 'no'){
    this.router.navigate(['/login'])
  }
}


// timeSlots: TimeSlot[] = [];
selectedTimeSlots: TimeSlot[] = [];
timedateData! :string
selectedDate!: string;
timeSlots: timeDataModel[] = [];
id!: number


private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed

  return `${year}-${month}-${day}`;
}

pastSelectedSlots(){
  const accessToken = getAccessToken();
  const headers = new HttpHeaders({
    'Authorization': `Token ${accessToken}`
  });
  const apiUrl = CONFIG['serverURL']+"/sessions/my-mentor-schedule/"+this.selectedDate
  this.http.get<any>(apiUrl,{headers}).subscribe(
    response => {
      var downloadedSelectedSlots = response['selectedSlots']
      console.log(downloadedSelectedSlots)
      this.timeSlotService.updateSlotsData(this.timeSlots);
      var downloadedbookedSlots = response['bookedSlots']
      this.timeSlots.forEach(
        slot =>{
          (downloadedSelectedSlots.includes(slot.time))?slot.selected=true:slot.selected=false;
        }
      )
    }
  )
}

ngOnInit() {
  this.selectedDate = this.formatDate(new Date()); // Set the current date as the default value

  // Generate time slots from 10:00 AM to 10:00 PM
  const startTime = 10;
  const endTime = 22;
  for (let i = startTime; i <= endTime; i++) {
    const time = `${i}:00`;
    this.timeSlots.push({ time, selected: false });
  }
  this.pastSelectedSlots()

  this.redirectToLogin();
  this.getData();


  const token = getAccessToken();
  if (token == "no"){
    this.router.navigate(['/login'])
  }
  this.isMentor = localStorage.getItem('isMentor') || false.toString() ;
  if(JSON.parse(this.isMentor) == false){
    this.router.navigate(['/tru/mentee_dashboard'])
  }
}




onDateChange(){
  this.pastSelectedSlots()
}
toggleTimeSlot(slot: TimeSlot, personId: number) {
  slot.selected = !slot.selected;
  const accessToken = getAccessToken();
  const headers = new HttpHeaders({
    'Authorization': `Token ${accessToken}`
  });
  var requestBody = {"slot":this.selectedDate +'-'+slot.time }
  var apiUrl='';
  if (slot.selected) {
    this.selectedTimeSlots.push(slot);
    apiUrl = CONFIG['serverURL']+"/sessions/my-mentor-schedule/add/"

  } else {
    const index = this.selectedTimeSlots.indexOf(slot);
    if (index !== -1) {
      this.selectedTimeSlots.splice(index, 1);
    }
    apiUrl = CONFIG['serverURL']+"/sessions/my-mentor-schedule/remove/"

  }
  this.http.post<any>(apiUrl, requestBody,  { headers }).subscribe(
    response => {
      // Handle the response if needed
      this.timedateData = response
      console.log('Time slot response sent:', response);
  console.log('Selected Time Slots:', this.selectedTimeSlots);

    },
    error => {
      // Handle any errors that occurred during the request
      console.error('Error sending time slot response:', error);
    }
  );

  this.router.navigate(['/tru/book', personId], {
    queryParams: { slots: JSON.stringify(this.selectedTimeSlots) }
  });
}

sendTimeSlotResponse(time: string, selected: boolean) {
  // Replace the URL below with your actual API endpoint to send the time slot response
  const apiUrl = CONFIG['serverURL']+"/sessions/my-mentor-schedule/add/"

  // Create the request body
  const requestBody = {
    time,
    selected
  };
  const accessToken = getAccessToken();

  const headers = new HttpHeaders({
    'Authorization': `Token ${accessToken}`
  });

  // Send the POST request
  this.http.post<any>(apiUrl, requestBody,  { headers }).subscribe(
    response => {
      // Handle the response if needed
      this.timedateData = response
      console.log('Time slot response sent:', response);
  console.log('Selected Time Slots:', this.selectedTimeSlots);

    },
    error => {
      // Handle any errors that occurred during the request
      console.error('Error sending time slot response:', error);
    }
  );
}

makeRequest() {
  // Send the selected date and time slots to the server

  console.log('Selected Date:', this.selectedDate);
  console.log('Selected Time Slots:', this.selectedTimeSlots);
}


  
}


    // Perform further actions with the submitted data, such as sending it to a server
  
