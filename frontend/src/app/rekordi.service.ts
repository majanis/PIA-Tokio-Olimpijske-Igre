import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RekordiService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  getAllRecords() {
    console.log("get all records service called");
     return this.http.get(`${this.uri}/record/getallrecords`);
   }

}
