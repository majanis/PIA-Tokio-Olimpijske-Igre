import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from './models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }


  getAllUnapprovedRequests() {
    return this.http.get(`${this.uri}/request/getrequests`);
  }

  removeRequestFromDB(username, password, nacionalnost) {
    const data={
      username: username,
      password: password,
      nacionalnost: nacionalnost
    }
    return this.http.post(`${this.uri}/request/removerequest`, data);
  }

  removeLeaderRequests(nacionalnost) {
    const data={
      nacionalnost: nacionalnost
    }
    return this.http.post(`${this.uri}/request/removeleaderrequests`, data);
    
  }

  checkIfUsernameTaken(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/users/checkifusernametaken`, data);
  }

}
