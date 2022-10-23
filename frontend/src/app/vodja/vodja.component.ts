import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthleteService } from '../athlete.service';
import { CountryService } from '../country.service';
import { Athlete } from '../models/athlete';
import { Competition } from '../models/competition';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { RegisterComponent } from '../register/register.component';
import { SportsandcompetitionsService } from '../sportsandcompetitions.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private router: Router, private athleteService: AthleteService, private sportscompService: SportsandcompetitionsService,
    private countryService: CountryService) { }

  ngOnInit(): void {
    this.allDisciplines=[];
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.getAllCompetitions();
    this.getAthletesByCountry();
    this.athletesForDiscipline=[];
    this.sportscompService.getAllSports().subscribe((data: Sport[])=>{
      this.allSports=data;
      this.allSports.forEach(
        element=>{
          if(element.discipline!=null)
          if(element.discipline.length>0)
          this.allDisciplines=this.allDisciplines.concat(element.discipline);
        }
      );
      });
  }

  
  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  user: User;
  athletesForDiscipline: Athlete[];
  disciplinazapretragu: string;
  sportzapretragu: string;

  allCompetitions: Competition[];
  pickedCompetition: Competition;
  picked: boolean;
  imeprezime: String;

  athletesForSport: Athlete[];
  myAthletes: Athlete[];
  allSportsIHave: string[]=[];
  allSports:Sport[]=[];
  allDisciplines: string[]=[];
  allDisciplinesForSport: string[]=[];
  athletesBreadcrumb: Athlete[]=[];

  imeiprezimenovog: String;
  sportnovog: String;
  disciplinenovog: String;
  disciplinenovogniz: String[];
  polnovog: String;
  nacionalnostnovog: String;
  showSports: boolean=false;
  showDisciplines: boolean=false;

  addNewAthlete() {

    let possible=this.allCompetitions;
    possible=possible.filter(element=> element.sport==this.sportnovog);
    if(possible!=[] && possible!=null) {
      possible=possible.filter(element=> element.pol==this.polnovog);
      possible=possible.filter(element=> element.potvrdjeno==false);
    }
    if(possible!=[] && possible!=null) {
      let p2:number=0;
      possible.forEach(
        element=>{
          if(this.disciplinenovog!="" && this.disciplinenovog!=null) {
          if(this.disciplinenovog.includes(element.disciplina) && element.zavrseno==false && element.potvrdjeno==false) p2=1;
        }
        }
      );
      if(p2==0) {
        alert("Ne mozete dodati sportistu jer ne postoji takmicenje u kom bi se on takmicio");
        return;  
      }
    }

    if(possible==[] || possible==null) {
      alert("Ne mozete dodati sportistu jer ne postoji takmicenje u kom bi se on takmicio");
      return;
    }

    this.nacionalnostnovog=this.user.nacionalnost;
    console.log(this.nacionalnostnovog);

    if(this.disciplinenovog=='bez discipline') this.disciplinenovog="";

    this.athleteService.addAthlete(this.imeiprezimenovog, this.polnovog, this.sportnovog, this.disciplinenovog, this.nacionalnostnovog,
      0, 0, 0, "").subscribe(
      response=>{
        if(response['message']=='Athlete added!') {
          alert("Dodat sportista!");
          this.countryService.addAthlete(this.nacionalnostnovog).subscribe( 
              response=> {
                if(response['message']=='added total athletes') {
                    //alert("Country athletes incremented");
                }
              }
          );
      }
        else alert("Error in adding");
      }
    );
  }

  checkCompetition(sport, disciplina, pol, vrsta): boolean {
    let retComp: boolean=false;
    this.sportscompService.getCompetitionByData(sport, disciplina, pol, vrsta).subscribe(
      (data: Competition[])=>{
        if(data) return true;
      }
    );
    return retComp;
  }

  getAllCompetitions() {
    this.sportscompService.getAllCompetitions().subscribe((data: Competition[])=> {
      this.allCompetitions=data;
    });
  }

  getAthletesByDiscipline(disciplina) {
    this.athleteService.getAthleteByDiscipline(disciplina).subscribe(
      (data: Athlete[])=> {
        this.athletesForDiscipline=data;
        this.athletesForDiscipline=this.athletesForDiscipline.filter(athlete=> athlete.nacionalnost==this.user.nacionalnost);
        this.athletesForDiscipline=this.athletesForDiscipline.filter(athlete=> athlete.pol==this.pickedCompetition.pol);
        console.log(this.athletesForDiscipline);
      }
    );
  }

  getAthletesBySport() {
    this.athleteService.getAthleteBySport(this.disciplinazapretragu).subscribe(
      (data: Athlete[])=> {
        this.athletesForSport=data;
        this.athletesForSport.filter(athlete=> athlete.nacionalnost==this.user.nacionalnost);
      }
    );
  }

  izaberiTakmicenje(t) {
    this.getAthletesByDiscipline(t.disciplina);
    this.pickedCompetition=t;
    this.picked=false;
    if(this.pickedCompetition.potvrdjeno==true) {
      alert("organizator je odobrio takmicenje, prijava je zavrsena");
      return;
    }
    else if(this.pickedCompetition.zavrseno==true) {
      alert("delegat je uneo podatke, takmicenje je zavrseno");
      return;
    }
    else this.picked=true;
  }

  addAthleteToCompetition(a) { 

    let namesOfNominated=[];
    this.pickedCompetition.prijavljeni.forEach(
      element=>{
        namesOfNominated.push(element.imeprezime);
      }
    );

    let namesOfCompeting=[];
    this.pickedCompetition.takmicari.forEach(
      element=>{
        namesOfCompeting.push(element.imeprezime);
      }
    );


    if(namesOfNominated.includes(a.imeprezime)) {
      alert("vec je prijavljen");
      return;
    }

    if(namesOfCompeting.includes(a.imeprezime)) {
      alert("vec je prijavljen i odobren za takmicenje");
      return;
    }


    this.sportscompService.addCandidate(this.pickedCompetition.sport, this.pickedCompetition.disciplina,
      this.pickedCompetition.pol, this.pickedCompetition.vrsta, a
      ).subscribe(
      response=>{
        if(response['message']=='added request') {
          alert("Poslat zahtev organizatoru!");
          this.pickedCompetition.prijavljeni.push(a);
      }
        else alert("Error in adding");
      }
      ); 
  }

  getAthletesByCountry() {
    this.athleteService.getAthleteByCountry(this.user.nacionalnost).subscribe(
      (data: Athlete[])=> {
        this.myAthletes=data;
      }
    );
  }

  getAllSports() {
    this.showSports=true;
    this.myAthletes.forEach(
      element=>{
        if(!this.allSportsIHave.includes(element.sport)) {
          let string=element.sport;
          string=string+ " [";
          let athletes=this.getAthletesByMySport(element.sport);
          let length=athletes.length.toString();
          string=string+length+"]";
          this.allSportsIHave.push(string);
        }
      }
    );
    
    let unique=new Set(this.allSportsIHave);
    this.allSportsIHave=Array.from(unique);
    console.log(this.allSportsIHave);
  }

  getAllDisciplines(sport) {
    this.showDisciplines=true;
    this.allDisciplinesForSport=this.getAllDisciplinesForSport(sport);
    this.allDisciplinesForSport.forEach(
      disciplina=>{
        this.athletesForDiscipline=[];
        this.myAthletes.forEach(
          sportista=>{
            if(sportista.discipline.includes(disciplina)) this.athletesForDiscipline.push(sportista);
          }
        );
        disciplina=disciplina+' ['+this.athletesForDiscipline.length+']';
            }
    );
  }

  getAllDisciplinesForSport(sport): string[]{
    console.log(sport);
    sport=sport.slice(0, -4);
    let mySport=this.allSports.filter(element=> element.ime=sport);
    return mySport[0].discipline;
  }

  getAthletesByMySport(sport): Athlete[] {
    let array: Athlete[]=[];
    array=this.myAthletes.filter(element=> element.sport==sport);
    return array;
  }

  getAthletesByMyDiscipline(disciplina): Athlete[]{
    let array: Athlete[]=[];
    disciplina=disciplina.slice(0, -4);
    array=this.myAthletes.filter(element=> element.discipline.includes(disciplina));
    console.log(array);
    return array;
  }
  
}
