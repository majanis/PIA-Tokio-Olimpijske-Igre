import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../models/country';
import { RequestsService } from '../requests.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private countryService: CountryService, 
    private requestService: RequestsService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(
      (data: Country[]) => {
        this.allCountries=data;
      }
    );
  }

  username: string;
  password: string;
  passwordcheck:string;
  imeprezime: string;
  nacionalnost: string;
  email: string;
  type: string;
  allCountries: Country[]=[];
  formatLozinke: string="min 8 karaktera, max 12 karaktera. Min upper caps 1, min lower caps 3, min numerika 2, min specijalnih karaktera 2. Početni karakter slovo. Maksimalan broj uzastopnih karaktera je tri.";

  return() {
    this.router.navigate(['home']);
  }

  gologin() {
    this.router.navigate(['']);
  }

  checkPasswordFormat(): boolean{

    let regex=new RegExp("^(?=(.*[a-z]){3,})(?=.*[A-Z])(?=(.*[0-9]){2,})(?=(.*[!@#\$%\^&\*\/]){2,})(?=.{8,12})"); 
    if(!regex.test(this.password)) return false;
    let maxRepetitions=3;
    let currentRepetitions=1;

    let firstLetter=this.password[0];
    if(firstLetter!=firstLetter.toUpperCase()  && firstLetter!=firstLetter.toLowerCase()) return false;
    let possible:boolean=true;
    for(let i=1; i<this.password.length; i++) {
      if(this.password[i]==firstLetter) {
        console.log(this.password[i]);
        currentRepetitions++;
        console.log(currentRepetitions);
        if (currentRepetitions>maxRepetitions) {
          console.log(currentRepetitions);
          possible=false;
          break;
        }
      }
      else {
        firstLetter=this.password[i];
      }
    }

    console.log(possible);
    return possible;
    return true;
  }

  register() { 

    if(this.username==null || this.password==null || this.imeprezime==null || this.passwordcheck==null || this.nacionalnost==null
      || this.email==null || this.type==null) {
        alert("Unesite adekvatne podatke");
        return;
      }

    let check=this.checkPasswordFormat();
    if(check==false) {
      alert("Pravilan format je " + this.formatLozinke);
      return;
        }

    if(this.password!=this.passwordcheck) {
      alert("Lozinka nije ispravna");
      return;
    }

    this.requestService.checkIfUsernameTaken(this.username).subscribe(
      response=> {
        if(response['message']=='username taken') {
          alert("Zauzet username");
        }
          else {
            if(this.type=='delegat') {
              this.userService.registerUserService(this.username, this.password, this.imeprezime, this.nacionalnost, this.email, this.type).subscribe(
                response=>{
                  if(response['message']=='User added!') {
                    alert("Vas zahtev je poslat organizatoru na odobrenje");
                this.return();
                }
                  else alert("Error in adding");
                }
              );
            }
            else if(this.type=='vodja') {
              console.log("Vodja je");
              this.userService.findCountryLeaderService(this.nacionalnost).subscribe(
                response=>{
                  if (response['message']=='exists') {
                    alert("Country already has delegation leader");
                  console.log("vodja postoji");
                  }
                  else {
                    console.log("vodja ne postoji");
                    this.userService.registerUserService(this.username, this.password, this.imeprezime, this.nacionalnost, this.email, this.type).subscribe(
                      response=>{
                        if(response['message']=='User added!') alert("OK added");
                        else alert("Error in adding");
                      }
                    );
                  }
                }
              );
            }
          }
        }
    );

  }

}
