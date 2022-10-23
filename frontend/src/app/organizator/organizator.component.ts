import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../models/user'
import { RequestsService } from '../requests.service';
import { Request } from '../models/request';
import { UserService } from '../user.service';
import { Sport } from '../models/sport';
import { SportsandcompetitionsService } from '../sportsandcompetitions.service';
import { Competition } from '../models/competition';
import { Athlete } from '../models/athlete';
import { AthleteService } from '../athlete.service';
import { RekordiService } from '../rekordi.service';
import { Record } from '../models/record';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private router: Router, private requestService: RequestsService, private userService: UserService,
    private sportscompService: SportsandcompetitionsService, private athleteService: AthleteService, private recordService: RekordiService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.allDisciplines=[];
    this.requestService.getAllUnapprovedRequests().subscribe((data: Request[]) => {
      this.requests=data;
  })
  this.sportscompService.getAllSports().subscribe((data: Sport[]) => {
    this.allSports=data;
    this.allSports.forEach(
      element=>{
        console.log(element.discipline);
        if(element.discipline!=null)
        if(element.discipline.length>0)
        this.allDisciplines=this.allDisciplines.concat(element.discipline);
        console.log(this.allDisciplines);
      }
    );
    this.allDisciplines.push('bez discipline');
})

this.userService.getAllDelegates().subscribe((data: User[]) => {
  this.allDelegates=data;
  console.log(this.allDelegates);
})

  this.sportscompService.getAllCompetitions().subscribe((data: Competition[])=> {
    this.allCompetitions=data;
  });

  this.recordService.getAllRecords().subscribe((data: Record[]) => {
    this.allRecords=data;
    console.log(this.allRecords);
})


  }

  user: User;
  requests: Request[];
  allSports: Sport[];
  allCompetitions: Competition[];
  allDelegates: User[]=[];
  allDisciplines: string[]=[];

  pickedCompetition: Competition;
  athleteSelection: Athlete[];
  picked: boolean;
  pickedAthlete: Athlete;
  allRecords: Record[]=[];

  sport: Sport;
  ime: String;
  disciplinestr: String;
  discipline: String[];
  vrsta: String;
  maxIgraca: number;
  minIgraca: number;
  novadisciplina: String;
  sportnovediscipline: String;
  vrstanovediscipline: String;
  maxIgracanovediscipline: number;
  minIgracanovediscipline: number;

  sporttakmicenja: string; //input
  disciplinatakmicenja: string;
  poltakmicenja: string;
  vrstatakmicenja: string;
  pocetaktakmicenja: string;
  krajtakmicenja: string;
  lokacijatakmicenja:string="";
  takmicaritakmicenja: string[];
  prijavljenitakmicenja: string[];
  pobedniktakmicenja: string;
  formattakmicenja: string;
  brojtakmicaramintakmicenja: number;
  brojtakmicaramaxtakmicenja: number;

  delegatiIzbor: User[]=[];
  isTennis: boolean=false;
  possible: number=1;
  showDelegates: boolean=false;

  itemsPerPage: number=15; //default
  p: number=1;


  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  prikaziDodavanje(t) {
  console.log("prikazi dodavanje za " + t.sport + " " + t.pol);
    this.athleteSelection=[];
    this.pickedCompetition=t;
    this.athleteSelection=this.pickedCompetition.prijavljeni;
    if(this.pickedCompetition.sport=='tenis') {
      this.isTennis=true;
    }
    this.picked=true;
  }

  prikaziDelegate(t) {
    if(t.zavrseno==true) {
      alert("Takmicenje je zavrseno");
      return;
    }
    this.pickedCompetition=t;
    this.showDelegates=true;
  }

  addDelegateToCompetition(a) {
    let namesOfNominated=[];
    this.pickedCompetition.delegat.forEach(
      element=>{
        namesOfNominated.push(element);
      }
    );

    if(namesOfNominated.includes(a.imeprezime)) {
      alert("vec je dodat delegat");
      return;
    }

    let goOn=this.delegatePossible(a);

    console.log(goOn);
    if(goOn==0) {
      alert("Delegat vec ima 3 takmicenja, izaberite drugog delegata!");
      return;
    }
    console.log(goOn);

    this.sportscompService.addDelegate(this.pickedCompetition.sport, this.pickedCompetition.disciplina,
      this.pickedCompetition.pol, this.pickedCompetition.vrsta, a.imeprezime).subscribe(
        response=> {
          if(response['message']=='changed delegate') {
            alert("Uspesno dodat delegat");
            this.pickedCompetition.delegat.push(a.imeprezime);
            console.log(this.pickedCompetition.delegat);
          }
          else alert("failed");
        }
      );
  }

  potvrdiTakmicenje(t) {
    this.sportscompService.getAllCompetitions().subscribe((data: Competition[])=> {
      this.allCompetitions=data; 
    });
  

    this.pickedCompetition=t;
    console.log("Takmicenje ima " + t.takmicari.length + " takmicara a minimum je " + JSON.stringify(t.brojTakmicaraMin));
    if(t.takmicari.length<t.brojTakmicaraMin) { 
      alert("Nema dovoljan broj takmicara");
      return;
    }
    if(t.delegat=="" || t.delegat==null) {
      alert("Ne mozete odobriti takmicenje koje nema delegata");
      return;
    }

    this.sportscompService.confirmCompetition(t.sport, t.disciplina, t.pol, t.vrsta).subscribe(
      response=> {
        if(response['message']=='approved competition') {
          alert("Odobreno takmicenje!");
          this.pickedCompetition.potvrdjeno=true;
        }
        else alert("error in approving");
      }
    );
  }

  addAthleteToCompetition(a) {
    this.pickedAthlete=a;
    this.sportscompService.addCompetitor(this.pickedCompetition.sport, this.pickedCompetition.disciplina, this.pickedCompetition.pol,
      this.pickedCompetition.vrsta, this.pickedAthlete).subscribe(
        response => {
          if(response['message']=='added competitor') {
              this.sportscompService.removeRequest(this.pickedCompetition.sport, this.pickedCompetition.disciplina, this.pickedCompetition.pol,
                this.pickedCompetition.vrsta, this.pickedAthlete).subscribe(
                  response=> {
                  if(response['message']=='removed request') {
                    this.pickedCompetition.takmicari.push(a);
                    alert("Success!");
                }
                  else alert("error");
                  }
                );
          }
          else alert("error");
        }
      );

        if(this.pickedAthlete.sport=='tenis') {
          this.athleteService.setRankingForTennisPlayers(this.pickedAthlete.imeprezime, this.pickedAthlete.nacionalnost,
             this.pickedAthlete.rezultat).subscribe(
               response=> {
                 if(response['message']=='ranking set') {}
                 else alert("error");
               }
             );
        }

  }

  delegatePossible(d):number{
    let retval=1;
    let numberOfComps=0;
    this.allCompetitions.forEach(
      element=>{
        if(element.delegat.includes(d.imeprezime)) numberOfComps++;
        if(numberOfComps>=3) {
          retval=0;
        }
      }
    );

    return retval;
  }

  delegatesPossible():number {
    let retval:number=1;

    this.delegatiIzbor.forEach(
      (element)=>{
        let value=this.delegatePossible(element);
        console.log(value);
        if(value==0) retval=0;
        console.log(retval);
        return retval;
      }
    ); 
    return retval;
  }

  addCompetition() {
    if(this.delegatiIzbor!=[]) {
    console.log(this.delegatiIzbor);

    let goOn=this.delegatesPossible();

    console.log(goOn);
    if(goOn==0) return;
    console.log(goOn);
    }
    

    if(this.poltakmicenja==null) this.poltakmicenja="muski";
    if(this.disciplinatakmicenja=='bez discipline') this.disciplinatakmicenja="";
    if(this.delegatiIzbor==null)  this.delegatiIzbor=[];
    if(this.lokacijatakmicenja==null) this.lokacijatakmicenja="";
    this.sportscompService.insertCompetition(this.sporttakmicenja, this.disciplinatakmicenja, this.poltakmicenja, this.vrstatakmicenja, "",
    "", this.lokacijatakmicenja, this.delegatiIzbor, this.takmicaritakmicenja, this.prijavljenitakmicenja, "", this.formattakmicenja,
     this.brojtakmicaramintakmicenja, this.brojtakmicaramaxtakmicenja, "", "", false, false).subscribe(
       response=> {
         if(response['message']=='Competition added!') alert("Uspesno dodato!");
         else alert("error in adding");
       }
     );
  }

  addDiscipline() { 
    this.sportscompService.getSport(this.sportnovediscipline, this.vrstanovediscipline).subscribe(
      response=> {
        if(response['message']=='sport not in db') {
          this.sportscompService.addSport(this.sportnovediscipline, this.novadisciplina,
             this.vrstanovediscipline, this.maxIgracanovediscipline, this.minIgracanovediscipline).subscribe(
            response=>{
              if(response['message']=='Sport added!') {
                alert("Sport dodat!");
              }
              else alert("Error in adding");
            }
          );
        }
        else if(response['message']=='sport in db'){
          alert(this.novadisciplina);
          this.sportscompService.addDisciplineToSport(this.sportnovediscipline, 
            this.novadisciplina, this.vrstanovediscipline).subscribe(
              response=>{
                if(response['message']=='added discipline') alert("Disciplina dodata!");
                else alert("Error adding discipline");
              }
            );
        }
      }
    )
  }

  addSport() {
    if(this.vrsta=='individualni') {this.maxIgraca=1; this.minIgraca=1;}
    if(this.disciplinestr=="" || this.disciplinestr==null) this.discipline=[];
    else
    this.discipline=this.disciplinestr.split(',');
    this.sportscompService.addSport(this.ime, this.discipline, this.vrsta, this.maxIgraca, this.minIgraca).subscribe(
      response=>{
        if(response['message']=='Sport added!') alert("Sport dodat!");
        else alert("Error in adding");
      }
    );
  }

  approveUser(r) {
    this.userService.approveUserService(r.username, r.password, r.imeprezime, r.nacionalnost, r.email, r.type).subscribe(
      response=>{
        if(response['message']=='User added!') {
          this.requestService.removeRequestFromDB(r.username, r.password, r.nacionalnost).subscribe(
            response=> {
              if(response['message']=='deleted!') {} //alert('removed from old DB');
              //else alert('not removed properly');
            }
          );
          
          this.requestService.removeLeaderRequests(r.nacionalnost).subscribe(
            response=> {
              if(response['message']=='deleted!') {
                this.requests.splice(this.requests.indexOf(r),1);
              } //alert("All expired results removed");
            }
          );
          alert("Odobren zahtev za korisnika");
        }
        else alert("Error in adding");
      }
    );
  }

}
