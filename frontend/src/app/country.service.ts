import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllCountries() {
     return this.http.get(`${this.uri}/country/getallcountries`);
   }

   addGoldMedal(name) {
    const data={
      name:name
    }
   return this.http.post(`${this.uri}/country/addgoldmedal`, data);
   }

   addSilverMedal(name) {
    const data={
      name:name
    }
   return this.http.post(`${this.uri}/country/addsilvermedal`, data);
   }

   addBronzeMedal(name) {
    const data={
      name:name
    }
   return this.http.post(`${this.uri}/country/addbronzemedal`, data);
   }

   addTotalMedal(name) {
    const data={
      name:name
      }
   return this.http.post(`${this.uri}/country/addtotalmedal`, data);
   }

   addAthlete(name) {
    const data={
      name:name
      }
   return this.http.post(`${this.uri}/country/addathlete`, data);
   }

}
