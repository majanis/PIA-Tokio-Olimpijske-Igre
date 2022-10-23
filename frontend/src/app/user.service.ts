import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  logInService(username, password) {

    const data={
      username: username,
      password: password
    }

return this.http.post(`${this.uri}/users/login`, data);

  }
  
  findCountryLeaderService(nacionalnost) {
    const data={
      nacionalnost: nacionalnost
    }
    return this.http.post(`${this.uri}/users/finddelegate`, data);
  }

  registerUserService(username, password, imeprezime, nacionalnost, email, type) {
    const data={
      username: username,
      password: password,
      imeprezime: imeprezime,
      nacionalnost: nacionalnost,
      email: email,
      type: type
    }

    return this.http.post(`${this.uri}/request/register`, data);

  }

  approveUserService(username, password, imeprezime, nacionalnost, email, type) {
    
    const data={
      username: username,
      password: password,
      imeprezime: imeprezime,
      nacionalnost: nacionalnost,
      email: email,
      type: type
    }

    return this.http.post(`${this.uri}/request/approve`, data);

  }

  getAllDelegates() {
    return this.http.get(`${this.uri}/users/getalldelegates`);

  }

  changePassword(username, password, newpassword) {
    const data={
      username: username,
      password: password,
      newpassword: newpassword
    }
    return this.http.post(`${this.uri}/users/changepassword`, data);
  }

}
