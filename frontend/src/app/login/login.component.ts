import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  username2: string;
  password2: string;
  newpassword: string;
  formatLozinke: string="min 8 karaktera, max 12 karaktera. Min upper caps 1, min lower caps 3, min numerika 2, min specijalnih karaktera 2. Početni karakter slovo. Maksimalan broj uzastopnih karaktera je tri.";


  checkPasswordFormat(passwordstring): boolean{

    let regex=new RegExp("^(?=(.*[a-z]){3,})(?=.*[A-Z])(?=(.*[0-9]){2,})(?=(.*[!@#\$%\^&\*\/]){2,})(?=.{8,12})");
    if(!regex.test(passwordstring)) return false;
    let maxRepetitions=3;
    let currentRepetitions=0;

    let firstLetter=passwordstring[0];
    if(firstLetter!=firstLetter.toUpperCase() && firstLetter!=firstLetter.toLowerCase()) return false;
    for(let i=1; i<passwordstring.length; i++) {
      if(passwordstring[i]==firstLetter) {
        currentRepetitions++;
        if (currentRepetitions>maxRepetitions) return false;
      }
      else {
        firstLetter=passwordstring[i];
      }
    }
    return true;
  }

  logIn() {
    this.userService.logInService(this.username, this.password).subscribe((user:User)=> {
    if(user){
     localStorage.setItem('ulogovan', JSON.stringify(user));
     if(user.type=='organizer') {
      this.router.navigate(['organizator']);
     }
     else if (user.type=='delegat') {
      this.router.navigate(['delegat']);
     }
     else if (user.type=='vodja') {
      this.router.navigate(['vodja']);

     }
     else alert('user not of adequate type');
     
    }
    else {
      alert('ne postoji korisnik u bazi');
    }
  }
    );
  }

  changePassword() {

    if(this.password2==this.newpassword) {
      alert("Uneli ste istu lozinku");
      return;
    }

    if(!this.checkPasswordFormat(this.newpassword)) {
      alert("Lozinka u pogresnom formatu");
      alert("Pravilan format je " + this.formatLozinke);
      return;
    }

    this.userService.logInService(this.username2, this.password2).subscribe(
      (user:User) => {
        if(user) {
          this.userService.changePassword(this.username2, this.password2, this.newpassword).subscribe(
            response=> {
              if(response['message']=='successful change') {
                alert("Uspesno promenjena lozinka!");
              }
              else {
                alert("error!");
              }
            }
          );
        }
        else {
          alert("Korisnik ne postoji!");
        }
      }
    );
  }
}
