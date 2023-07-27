import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {timeDataModel} from '../../../utilities/models/workData'

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  private timeSlotsData: BehaviorSubject<timeDataModel[]> = new BehaviorSubject<timeDataModel[]>([]);
  timeSlotsData$: Observable<timeDataModel[]> = this.timeSlotsData.asObservable();

  updateSlotsData(slots: timeDataModel[]) {
    this.timeSlotsData.next(slots);
  }
}
