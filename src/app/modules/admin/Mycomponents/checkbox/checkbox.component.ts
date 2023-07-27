import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CheckboxService } from '../checkbox.service';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CONFIG} from '../../../../utilities/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAccessToken } from 'src/app/utilities/token-handler';
import { setAccessToken } from 'src/app/utilities/token-handler';

interface TimeSlot {
  time: string;
  selected: boolean;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  selectedDate!: string;
  timeSlots: TimeSlot[] = [];
  selectedTimeSlots: TimeSlot[] = [];
  timedateData! :string

  constructor(private http: HttpClient) {}
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
  }




  onDateChange(){
    this.pastSelectedSlots()
  }
  toggleTimeSlot(slot: TimeSlot) {
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
