import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '/api/checkbox-data';

  constructor(private http: HttpClient) {}

  storeCheckboxData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
