import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthleteService } from '../athlete.service';
import { CountryService } from '../country.service';
import { Athlete } from '../models/athlete';
import { Country } from '../models/country';
import { ChangeDetectorRef } from '@angular/core';
import { Sport } from '../models/sport';
import { SportsandcompetitionsService } from '../sportsandcompetitions.service';
import { Competition } from '../models/competition';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private countryService: CountryService, private athleteService: AthleteService, 
    private changeDetection: ChangeDetectorRef, private sportsCompService: SportsandcompetitionsService) { }

  ngOnInit(): void {
    this.allDisciplines=[];
    this.countryService.getAllCountries().subscribe((data: Country[]) => {
      this.allCountries=data;
      this.allCountries=this.allCountries.sort((a,b)=>b.total-a.total);
      console.log(this.allCountries);
     
  });
  this.sportsCompService.getAllSports().subscribe((data: Sport[])=>{
  this.allSports=data;
  console.log(this.allSports);
  this.allSports.forEach(
    element=>{
      console.log(element.discipline);
      if(element.discipline!=null)
      if(element.discipline.length>0)
      this.allDisciplines=this.allDisciplines.concat(element.discipline);
      console.log(this.allDisciplines);
    }
  );
  });

  this.myAthletes=[];
  this.allAthletes=[];
 this.queriedAthletes=[];
 this.athleteByDiscipline=[];
 this.getAllAthletes();
  }

  allCountries: Country[];
  allSports: Sport[];
  allAthletes: Athlete[];
  allDisciplines: string[];
  queriedAthletes: Athlete[]; //filters through
  myAthletes: Athlete[]=[];
  athleteByDiscipline: Athlete[];

  imeprezime: String;
  zemlja: String;
  sport: String;
  disciplina: string;
  nacionalnost: String;
  osvajaci: boolean=false;
  pol: String;

  itemsPerPage: number=20; //default
  p: number=1;


  Pretraga() {
    this.getAthletesByQuery2();
    console.log(this.queriedAthletes);
  }



  getAllAthletes() {
    this.athleteService.getAllAthletes().subscribe((data: Athlete[]) => {
      this.allAthletes=data;
  })
  }

  async getAthleteByName() { //has to be asynchronous because its called in async function

    await this.athleteService.getAthleteByName(this.imeprezime).toPromise().then(
      (data: Athlete[]) => {
        this.myAthletes=data;
        console.log("iz getbyname ");
        console.log(this.myAthletes);
    }  

    );
    console.log("my athletes " + this.myAthletes); 
    }

  getAthleteByDiscipline() {
    this.athleteService.getAthleteByDiscipline(this.disciplina).subscribe(
      (data: Athlete[])=> {
        this.athleteByDiscipline=data;
        console.log(this.athleteByDiscipline);
      }
    );
  }


  /* getAthletesByQuery() { //does not work as a synchronous function because it requires page reload
    console.log(this.osvajaci);
    this.getAllAthletes();
    this.queriedAthletes=this.allAthletes;
    console.log(this.queriedAthletes);
    if(this.disciplina!=null && this.disciplina!='sve') {
      this.getAthleteByDiscipline();
      this.queriedAthletes=this.athleteByDiscipline;
      console.log(this.queriedAthletes);
    }
    if(this.imeprezime!=null && this.imeprezime!='svi') {
      this.queriedAthletes=this.queriedAthletes.filter(athlete=> athlete.imeprezime==this.imeprezime); //nije bas idealno al ajde
    }
    console.log(this.queriedAthletes);
    if(this.pol=='muski') this.queriedAthletes=this.queriedAthletes.filter(athlete=> athlete.pol=='muski');
    else if(this.pol=='zenski') this.queriedAthletes=this.queriedAthletes.filter(athlete=> athlete.pol=='zenski');
    if(this.nacionalnost!=null && this.nacionalnost!='sve')  this.queriedAthletes=this.queriedAthletes.filter(athlete => athlete.nacionalnost==this.nacionalnost);
    if(this.sport!=null && this.sport!='svi')  this.queriedAthletes=this.queriedAthletes.filter(athlete => athlete.sport==this.sport);
    if(this.osvajaci==true) this.queriedAthletes=this.queriedAthletes.filter(athlete=> (athlete.gold+athlete.silver+athlete.bronze>0));
    console.log(this.queriedAthletes);
    this.changeDetection.detectChanges();
  } */

  async getAthletesByQuery2() {
    this.getAllAthletes();
    this.queriedAthletes=this.allAthletes;
    console.log(this.queriedAthletes);
    if(this.imeprezime!=null && this.imeprezime!='svi') {
      await this.getAthleteByName();
      this.queriedAthletes=this.myAthletes;
      console.log(this.queriedAthletes);
    }
    if(this.pol=='muski') this.queriedAthletes=this.queriedAthletes.filter(athlete=> athlete.pol=='muski');
    else if(this.pol=='zenski') this.queriedAthletes=this.queriedAthletes.filter(athlete=> athlete.pol=='zenski');
    if(this.nacionalnost!=null && this.nacionalnost!='sve')  this.queriedAthletes=this.queriedAthletes.filter(athlete => athlete.nacionalnost==this.nacionalnost);
    if(this.sport!=null && this.sport!='svi')  this.queriedAthletes=this.queriedAthletes.filter(athlete => athlete.sport==this.sport);
    if(this.osvajaci==true) this.queriedAthletes=this.queriedAthletes.filter(athlete=> (athlete.gold+athlete.silver+athlete.bronze>0));
    if(this.disciplina!=null && this.disciplina!='sve') {
      this.queriedAthletes=this.queriedAthletes.filter(athlete => (athlete.discipline.includes(this.disciplina)));
    }
    this.changeDetection.detectChanges();
  }

}
