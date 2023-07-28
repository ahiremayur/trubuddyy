import { Component, Input, OnInit  } from '@angular/core';
import {CONFIG} from '../../../../utilities/config';
import { getAccessToken } from 'src/app/utilities/token-handler';
// import { setAccessToken } from 'src/app/utilities/token-handler';
import { InfoModel, timeDataModel } from 'src/app/utilities/models/workData';
import { TimeSlotService } from '../time-slot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface TimeSlot {
  availableSlots: string;
  selected: boolean;
}
@Component({
  selector: 'app-booking-session',
  templateUrl: './booking-session.component.html',
  styleUrls: ['./booking-session.component.css']
})
export class BookingSessionComponent implements OnInit {
  
  selectedDate!: string;
  timeSlots: TimeSlot[] = [];
  // selectedTimeSlots: TimeSlot[] = [];
  timedateData! :string;
  availableTimeSlots: timeDataModel[]=[];
  time!: string;
  id!: number;
  person!: InfoModel;
  selectedSlot!: string;
   
  constructor(private http: HttpClient, 
     private route: ActivatedRoute, ) {}

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

ngOnInit(): void {
  
  this.route.params.subscribe(params => {
    this.id = +params['id']; // Get the person ID from the route parameter
    this.getPersonData(this.id);
    this.getMentorAvailabilitySlots(this.id);
  this.onDateChange(this.id)
  });

  this.selectedDate=this.formatDate(new Date())
  this.getMentorAvailabilitySlots(this.id)

}

getMentorAvailabilitySlots(id: number){
  this.availableTimeSlots=[]

  const accessToken = getAccessToken();
  const headers = new HttpHeaders({
    'Authorization': `Token ${accessToken}`
  });
  const apiUrl = CONFIG['serverURL']+"/sessions/view-mentor-availablility/"+this.id+'/'+this.selectedDate 
  this.http.get<any>(apiUrl,{headers}).subscribe(
    (response) => {
      var availableSlots = response['availableSlots'];
      availableSlots.forEach(
        (        slot: any)=>{
          this.availableTimeSlots.push({time:slot,selected:false})
          
        }
      )

    },
    (error) => {    
      console.error(error);
    }
  )
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

onDateChange(id: number){
  this.getMentorAvailabilitySlots(id)
}

selectSlot(slot:any){
  this.selectedSlot = this.selectedDate+ '-' + slot.time
  console.log(this.selectedSlot)
}

startBookingProcess(){
  if (this.selectedSlot.length<10) return
  const accessToken = getAccessToken();
  const headers = new HttpHeaders({
    'Authorization': `Token ${accessToken}`
  });

  var formdata={
    "mentor_id":this.id,
    "session_date":this.selectedSlot,
    "booking_date":this.formatDate(new Date())
  }
  this.http.post<any>(CONFIG['serverURL']+'/sessions/book/',formdata, { headers }).subscribe(
    (response:any) => {
      // Handle the response here
      window.location.href = response.redirect_url;
     },
    (error) => {
      // Handle errors here
      console.error(error);
    }
  );
}

}
