import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthleteService } from '../athlete.service';
import { CountryService } from '../country.service';
import { Athlete } from '../models/athlete';
import { Competition } from '../models/competition';
import { User } from '../models/user';
import { SportsandcompetitionsService } from '../sportsandcompetitions.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css'],
})
export class DelegatComponent implements OnInit {

  constructor(private router: Router, private sportcompService: SportsandcompetitionsService, private athleteService: AthleteService,
    private countryService: CountryService) {
   }

   //supervises a maximum of three competitions
   //tennis works differently from everything else, it is tiered

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('ulogovan'));
    this.sportcompService.getCompetitionByDelegate(this.user.imeprezime).subscribe(
      (data: Competition[]) => {
        this.allMyCompetitions=data;
        this.allMyCompetitions.forEach(
          element=>{
            element.trajanje=element.pocetak.slice(0,-5).replace('T', ' ')
            +"UTC - "+element.kraj.slice(0,-5).replace('T', ' ') +"UTC";
          }
        );  
    }
    );
    this.trcanje100m=this.trcanje800m=this.skokuvis=this.maraton=this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  user: User;
  myCompetition: Competition; 
  myCompetitionString: string;
  athletesformycompetition: Athlete[];

  showingCompetitions: Competition[]=[];

  location: String;
  time2: String;
  time3: String;
  allMyCompetitions: Competition[];
  resultsInSeveralInstances: number[]=[]; //notes best scores in round
  beginning: Date=new Date('2021-07-23T00:00:00');
  end: Date=new Date('2021-08-08T23:59:59');
  datumPocetka: string;
  datumKraja:string;
  vremePocetka: string;
  vremeKraja: string;

  godinaPocetka:number;
  mesecPocetka:number;
  danPocetka: number;
  satPocetka:number;
  minutPocetka:number;

  godinaKraja:number;
  mesecKraja:number;
  danKraja: number;
  satKraja:number;
  minutKraja:number;

  pocetak: Date;
  kraj: Date;
  stringPocetka: String;
  datesValid: boolean=true;

  enterRes: boolean=false;
  enterTennisSchedule: boolean=false;
  disciplinazarez: string;
  trcanje100m: boolean=false;
  trcanje800m: boolean=false;
  skokuvis: boolean=false;
  maraton: boolean=false;
  drumskatrka: boolean=false;
  trostav: boolean=false;
  tenissingl4: boolean=false;
  tenissingl8: boolean=false;
  tenissingl16: boolean=false;

  tenissingl14: Athlete[]=[];
  tenissingl23: Athlete[]=[];
  tenissingl12: Athlete[]=[];
  tenissingl34: Athlete[]=[];

  tenissingl18: Athlete[]=[];
  tenissingl27: Athlete[]=[];
  tenissingl36: Athlete[]=[];
  tenissingl45: Athlete[]=[];

  tenissingl116: Athlete[]=[];
  tenissingl215: Athlete[]=[];
  tenissingl314: Athlete[]=[];
  tenissingl413: Athlete[]=[];
  tenissingl512: Athlete[]=[];
  tenissingl611: Athlete[]=[];
  tenissingl710: Athlete[]=[];
  tenissingl89: Athlete[]=[];

  athletesformycompetition14ts: string;
  athletesformycompetition23ts: string;
  athletesformycompetition12ts: string;
  athletesformycompetition34ts: string;

  athletesformycompetition18ts: string;
  athletesformycompetition27ts: string;
  athletesformycompetition36ts: string;
  athletesformycompetition45ts: string;

  athletesformycompetition116ts: string;
  athletesformycompetition215ts: string;
  athletesformycompetition314ts: string;
  athletesformycompetition413ts: string;
  athletesformycompetition512ts: string;
  athletesformycompetition611ts: string;
  athletesformycompetition710ts: string;
  athletesformycompetition89ts: string;

  tenisfinale:boolean=false;
  tenispolufinale: boolean=false;

  poslednjipokusaj: boolean=false; //dodati ovo ako stignes
  poslednjipokusajigraci: Athlete[]=[];
  gotovo: boolean=false;

  
  formatirajDatum(str, vremestr): string {
    this.datesValid=true;
    let pocetak=str.split('.');
    let danPocetka=parseInt(pocetak[0]);
    let mesecPocetka=parseInt(pocetak[1])-1;
    let godinaPocetka=parseInt(pocetak[2]);
    let vreme=vremestr.split(':');
    let satPocetka=parseInt(vreme[0]);
    let minutPocetka=parseInt(vreme[1]);

    if(godinaPocetka!=2021 || danPocetka<1 || danPocetka>31 
      || mesecPocetka<6 || mesecPocetka>7 || minutPocetka<0 || satPocetka<0 || minutPocetka>59 || satPocetka>23) {
        this.datesValid=false;
        alert("Netacan format datuma");
        return "netacno";
      }
      let datum=new Date(godinaPocetka, mesecPocetka, danPocetka, satPocetka, minutPocetka, 0);
      let datstr=datum.toISOString();
    return datstr;
  }


  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  pickPlayers(c) { 
    this.myCompetition=c;
    if(this.myCompetition.potvrdjeno==false) { 
      alert("Nije odobreno takmicenje!");
      return;
    }

    if(this.myCompetition.zavrseno==true) {
      alert("Takmicenje je zavrseno!");
      return;
    }

    console.log(this.myCompetition.takmicari);

    let max=this.myCompetition.brojTakmicaraMax;
    if(this.myCompetition.takmicari.length>max) {
      this.shuffleArray(this.myCompetition.takmicari); 
      this.myCompetition.takmicari=this.myCompetition.takmicari.slice(0, max); //can't add more players than allowed
      console.log(this.myCompetition.takmicari);
    }
    else if (this.myCompetition.disciplina=='singl') { // tennis singles
      if(this.myCompetition.takmicari.length>=this.myCompetition.brojTakmicaraMin) { //at least four players required
          if(this.myCompetition.takmicari.length<8) { //4-8
            this.shuffleArray(this.myCompetition.takmicari); 
            this.myCompetition.takmicari=this.myCompetition.takmicari.slice(0, 4); //half finals and finals only
            this.athletesformycompetition=this.myCompetition.takmicari;
            console.log(this.athletesformycompetition);
            this.sortTennisPlayersByRanking();
            console.log(this.athletesformycompetition);
            console.log(this.myCompetition.takmicari);
            this.tenissingl4=true;
            if(!this.tenissingl14.includes(this.athletesformycompetition[0]))this.tenissingl14.push(this.athletesformycompetition[0]);
            if(!this.tenissingl14.includes(this.athletesformycompetition[3]))this.tenissingl14.push(this.athletesformycompetition[3]);
            if(!this.tenissingl23.includes(this.athletesformycompetition[1]))this.tenissingl23.push(this.athletesformycompetition[1]);
            if(!this.tenissingl23.includes(this.athletesformycompetition[2]))this.tenissingl23.push(this.athletesformycompetition[2]);
            console.log(this.tenissingl14);
            console.log(this.tenissingl23);
            this.tenispolufinale=true;

          }
          else { //8-16 players
            this.shuffleArray(this.myCompetition.takmicari); 
            this.myCompetition.takmicari=this.myCompetition.takmicari.slice(0, 8); //quarter finals to finals
            this.athletesformycompetition=this.myCompetition.takmicari;
            this.sortTennisPlayersByRanking();
            console.log(this.athletesformycompetition);
            this.tenissingl8=true;
            this.tenissingl18.push(this.athletesformycompetition[0]);
            this.tenissingl18.push(this.athletesformycompetition[7]);
            this.tenissingl27.push(this.athletesformycompetition[1]);
            this.tenissingl27.push(this.athletesformycompetition[6]);
            this.tenissingl36.push(this.athletesformycompetition[2]);
            this.tenissingl36.push(this.athletesformycompetition[5]);
            this.tenissingl45.push(this.athletesformycompetition[3]);
            this.tenissingl45.push(this.athletesformycompetition[4]);
          }
      }
      else { //exactly 16 players
        this.athletesformycompetition=this.myCompetition.takmicari;
        this.sortTennisPlayersByRanking();
          this.tenissingl116.push(this.athletesformycompetition[0]);
          this.tenissingl116.push(this.athletesformycompetition[15]);
          this.tenissingl215.push(this.athletesformycompetition[1]);
          this.tenissingl215.push(this.athletesformycompetition[14]);
          this.tenissingl314.push(this.athletesformycompetition[2]);
          this.tenissingl314.push(this.athletesformycompetition[13]);
          this.tenissingl413.push(this.athletesformycompetition[3]);
          this.tenissingl413.push(this.athletesformycompetition[12]);
          this.tenissingl512.push(this.athletesformycompetition[4]);
          this.tenissingl512.push(this.athletesformycompetition[11]);
          this.tenissingl611.push(this.athletesformycompetition[5]);
          this.tenissingl611.push(this.athletesformycompetition[10]);
          this.tenissingl710.push(this.athletesformycompetition[6]);
          this.tenissingl710.push(this.athletesformycompetition[9]);
          this.tenissingl89.push(this.athletesformycompetition[7]);
          this.tenissingl89.push(this.athletesformycompetition[8]);
          
          
        this.tenissingl16=true;
       }
    }
    this.athletesformycompetition=this.myCompetition.takmicari;
  }


  verifyDates() {
    this.datesValid=true;
    let d1=this.beginning.toISOString();
    let d2=this.end.toISOString();
    console.log(this.datumPocetka);
    let pocetak=this.datumPocetka.split('.');
    this.danPocetka=parseInt(pocetak[0]);
    this.mesecPocetka=parseInt(pocetak[1])-1;
    this.godinaPocetka=parseInt(pocetak[2]);
    let vreme=this.vremePocetka.split(':');
    this.satPocetka=parseInt(vreme[0]);
    this.minutPocetka=parseInt(vreme[1]);
    
    let kraj=this.datumKraja.split('.');
    this.danKraja=parseInt(kraj[0]);
    this.mesecKraja=parseInt(kraj[1])-1;
    this.godinaKraja=parseInt(kraj[2]);
    let vr=this.vremeKraja.split(':');
    this.satKraja=parseInt(vr[0]);
    this.minutKraja=parseInt(vr[1]);

    if(this.godinaKraja!=2021 || this.godinaPocetka!=2021 || this.danPocetka<1 || this.danPocetka>31 ||
      this.danKraja<1 || this.danKraja>31 || this.mesecPocetka<6 || this.mesecPocetka>7 || this.mesecKraja<6 || this.mesecKraja>7
      || this.satPocetka>23 || this.satPocetka<0 || this.satKraja<0 || this.satKraja>23 || this.minutPocetka<0 || this.minutPocetka>59
      || this.minutKraja<0 || this.minutKraja>59) {
        this.datesValid=false;
        alert("Netacan format datuma");
        return;
      }

    this.pocetak=new Date(this.godinaPocetka, this.mesecPocetka, this.danPocetka, this.satPocetka, this.minutPocetka, 0);
    this.kraj=new Date(this.godinaKraja, this.mesecKraja, this.danKraja, this.satKraja, this.minutKraja, 0);
    console.log(this.beginning + " " + this.pocetak);
    console.log(this.end + " " + this.kraj);

    if(this.pocetak.getTime()-this.kraj.getTime()>0) {
      alert("Ne moze biti pocetak posle kraja");
      this.datesValid=false;    
    }

    if(this.beginning.getTime()-this.pocetak.getTime()>0) {
      alert("Najraniji datum je 23.7.2021.");
      this.datesValid=false;
    }
    if(this.kraj.getTime()-this.end.getTime()>0) {
      alert("Najkasniji datum je 8.8.2021.");
      this.datesValid=false;
    }
  }

  setTimeAndLocation() {
    this.verifyDates();
    if(this.datesValid==false) return;
    this.time2=this.pocetak.toISOString();
    this.time3=this.kraj.toISOString();
    console.log(this.time2);
    
    console.log(this.myCompetitionString);

    let comp=this.myCompetitionString.split(", ");
    let sport=comp[0];
    let disciplina=comp[1];
    let pol=comp[2];
    let vrsta=comp[3];
    console.log(sport + disciplina+ pol+ vrsta);

    this.sportcompService.getCompetitionByData(sport, disciplina, pol, vrsta).subscribe(
        (competition:Competition)=> {
         this.myCompetition=competition;
      }
    );

    this.sportcompService.checkTimeAndLocation(this.time2, this.location).subscribe(
      response=> {
        if(response['message']=='free') {
            this.sportcompService.setTimeAndLocation(this.myCompetition.sport, this.myCompetition.disciplina, this.myCompetition.pol,
              this.myCompetition.vrsta, this.time2, this.kraj, this.location).subscribe(
                response=> {
                  if(response['message']=='set time and location'){
                      alert("Uspesno postavljeno vreme i lokacija!");
                  }
                  else alert("Error in DB");
                }
              );
        }
        else {
          alert("Ta sala je zauzeta u tom periodu"); //space unavailable
        }
      }
    );
  }

  showEnterResults(c) {
    this.enterRes=false;
   this.pickPlayers(c);
   if(this.myCompetition.potvrdjeno==false) { 
    return;
  }

  if(this.myCompetition.zavrseno==true) {
    return;
  }
    if(this.myCompetition.pocetak=="" ||this.myCompetition.pocetak==null || 
    this.myCompetition.kraj=="" ||this.myCompetition.kraj==null || this.myCompetition.lokacija=="" || 
    this.myCompetition.lokacija==null) {
      alert("Ne mogu se uneti podaci za takmicenje ciji je raspored nepoznat");
      return;
    }
    
      this.enterRes=true;
      this.disciplinazarez=this.myCompetition.disciplina;
      this.trcanje100m=this.trcanje800m=this.skokuvis=this.maraton=this.trostav=this.drumskatrka=false;
      if(this.disciplinazarez=='100m trcanje' || this.disciplinazarez=='200m trcanje' || this.disciplinazarez=='400m trcanje' ||
      this.disciplinazarez=='100m leptir' || this.disciplinazarez=='200m slobodno') { //all use same competition format
        this.trcanje100m=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
       this.athletesformycompetition=this.myCompetition.takmicari;
       console.log(this.athletesformycompetition);
      }

      if(this.disciplinazarez=='800m trcanje' || this.disciplinazarez=='5000m trcanje' || this.disciplinazarez=='10000m trcanje') {
        this.trcanje800m=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
        this.athletesformycompetition=this.myCompetition.takmicari;
      }

      if(this.disciplinazarez=='skok u vis' || this.disciplinazarez=='skok u dalj' || this.disciplinazarez=='troskok' ||
      this.disciplinazarez=='skok s motkom' || this.disciplinazarez=='bacanje kugle' || this.disciplinazarez=='bacanje diska'
      || this.disciplinazarez=='bacanje kladiva' || this.disciplinazarez=='bacanje koplja'
      ) {
        this.skokuvis=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
        this.athletesformycompetition=this.myCompetition.takmicari;
      }

      if(this.disciplinazarez=='50m trostav' || this.disciplinazarez=='10m vazdusna puska' || this.disciplinazarez=='25m malokalib. pistolj' ||
       this.disciplinazarez=='10m vazdusni pistolj') {
        this.trostav=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
        this.athletesformycompetition=this.myCompetition.takmicari;
      }

      if(this.disciplinazarez=='maraton' || this.disciplinazarez=='20km brzo hodanje' || this.disciplinazarez=='50km brzo hodanje') {
        this.maraton=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
        this.athletesformycompetition=this.myCompetition.takmicari;
      }

      if(this.disciplinazarez=='drumska trka 225m') {
        this.drumskatrka=true;
        this.tenissingl4=this.tenissingl8=this.tenissingl16=false;
        this.athletesformycompetition=this.myCompetition.takmicari;
      }
      
  }

  dvaimajuistuvrednost(array): boolean { //check if tie
    return (new Set(array)).size !== array.length;
  }

  kojadva(array): Athlete[]{
    let dva: Athlete[]=[];
    for(let i=0; i<array.length; i++) {
      let rezElementa=array[i].rezultat;
      for(let j=0; j<array.length; j++) {
        if(rezElementa==array[j].rezultat && i!=j) {
          dva.push(array[i]);
          dva.push(array[j]);
          break;
        }
      }
    }
    let set=new Set(dva);
    dva=Array.from(set);
    return dva;
  }

  tenisfinalerez() {

    if(this.checkFormatOfTennisResults(this.athletesformycompetition12ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition34ts)==false) {
      alert("nemoguc rezultat");
      return;
    }

    let rez12=this.athletesformycompetition12ts.split(':');
    if(rez12[0]=='2' || rez12[0]=='3') {
      this.athletesformycompetition[0]=this.tenissingl12[0];
      this.athletesformycompetition[1]=this.tenissingl12[1];
    }
    else {
      this.athletesformycompetition[0]=this.tenissingl12[1];
      this.athletesformycompetition[1]=this.tenissingl12[0];
    }

    let rez34=this.athletesformycompetition34ts.split(':');
    if(rez34[0]=='2' || rez34[0]=='3') {
      this.athletesformycompetition[2]=this.tenissingl34[0];
        }
    else {
      this.athletesformycompetition[2]=this.tenissingl34[1];
    }

    this.setMedalists();
  }

  tenis4polufinale() { //sorts according to ATP ranking
    //1 & 4, 2 & 3, 1 & 2, 3 & 4

    if(this.checkFormatOfTennisResults(this.athletesformycompetition14ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition23ts)==false) {
      alert("nemoguc rezultat");
      return;
    }

    let rez14=this.athletesformycompetition14ts.split(':');
    if(rez14[0]=='2' || rez14[0]=='3') {
      this.tenissingl12.push(this.tenissingl14[0]);
      this.tenissingl34.push(this.tenissingl14[1]);
    }
    else {
      this.tenissingl12.push(this.tenissingl14[1]);
      this.tenissingl34.push(this.tenissingl14[0]);
    }

    let rez23=this.athletesformycompetition23ts.split(':');
    if(rez23[0]=='2' || rez23[0]=='3') {
      this.tenissingl12.push(this.tenissingl23[0]);
      this.tenissingl34.push(this.tenissingl23[1]);
    }
    else {
      this.tenissingl12.push(this.tenissingl23[1]);
      this.tenissingl34.push(this.tenissingl23[0]);
    }

    this.tenisfinale=true;
  }

  tenis8cetvrtfinale(){ //quarterfinals
    //1 & 8, 2 & 7, 3 & 6, 2 & 5

    if(this.checkFormatOfTennisResults(this.athletesformycompetition18ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition27ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition36ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition45ts)==false) {
      alert("nemoguc rezultat");
      return;
    }

    let rez18=this.athletesformycompetition18ts.split(':');
    if(rez18[0]=='2' || rez18[0]=='3') {
      this.tenissingl14.push(this.tenissingl18[0]);
    }
    else {
      this.tenissingl14.push(this.tenissingl18[1]);
    }

    let rez27=this.athletesformycompetition27ts.split(':');
    if(rez27[0]=='2' || rez27[0]=='3') {
      this.tenissingl14.push(this.tenissingl27[0]);
    }
    else {
      this.tenissingl14.push(this.tenissingl27[1]);
    }


    let rez36=this.athletesformycompetition36ts.split(':');
    if(rez36[0]=='2' || rez36[0]=='3') {
      this.tenissingl23.push(this.tenissingl36[0]);
    }
    else {
      this.tenissingl23.push(this.tenissingl36[1]);
    }

    let rez45=this.athletesformycompetition45ts.split(':');
    if(rez45[0]=='2' || rez45[0]=='3') {
      this.tenissingl23.push(this.tenissingl45[0]);
    }
    else {
      this.tenissingl23.push(this.tenissingl45[1]);
    }

    this.tenissingl4=true; //opens halffinals form in html page
  }

  tenis16osminafinala() { //eight-finals
    //1 16, 2 15, 3 14, 4 13, 5 12, 6 11, 7 10, 8 9

    if(this.checkFormatOfTennisResults(this.athletesformycompetition116ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition215ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition314ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition413ts)==false ||
    this.checkFormatOfTennisResults(this.athletesformycompetition512ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition611ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition710ts)==false || 
    this.checkFormatOfTennisResults(this.athletesformycompetition89ts)==false
    ) {
      alert("nemoguc rezultat");
      return;
    }

    let rez116=this.athletesformycompetition116ts.split(':');
    if(rez116[0]=='2' || rez116[0]=='3') {
      this.tenissingl18.push(this.tenissingl116[0]);
    }
    else {
      this.tenissingl18.push(this.tenissingl116[1]);
    }

    let rez215=this.athletesformycompetition215ts.split(':');
    if(rez215[0]=='2' || rez215[0]=='3') {
      this.tenissingl18.push(this.tenissingl215[0]);
    }
    else {
      this.tenissingl18.push(this.tenissingl215[1]);
    }


    let rez314=this.athletesformycompetition314ts.split(':');
    if(rez314[0]=='2' || rez314[0]=='3') {
      this.tenissingl27.push(this.tenissingl314[0]);
    }
    else {
      this.tenissingl27.push(this.tenissingl314[1]);
    }

    let rez413=this.athletesformycompetition413ts.split(':');
    if(rez413[0]=='2' || rez413[0]=='3') {
      this.tenissingl27.push(this.tenissingl413[0]);
    }
    else {
      this.tenissingl27.push(this.tenissingl413[1]);
    }

    let rez512=this.athletesformycompetition512ts.split(':');
    if(rez512[0]=='2' || rez512[0]=='3') {
      this.tenissingl36.push(this.tenissingl512[0]);
    }
    else {
      this.tenissingl36.push(this.tenissingl512[1]);
    }

    let rez611=this.athletesformycompetition611ts.split(':');
    if(rez611[0]=='2' || rez611[0]=='3') {
      this.tenissingl36.push(this.tenissingl611[0]);
    }
    else {
      this.tenissingl36.push(this.tenissingl611[1]);
    }


    let rez710=this.athletesformycompetition710ts.split(':');
    if(rez710[0]=='2' || rez710[0]=='3') {
      this.tenissingl45.push(this.tenissingl710[0]);
    }
    else {
      this.tenissingl45.push(this.tenissingl710[1]);
    }

    let rez89=this.athletesformycompetition89ts.split(':');
    if(rez89[0]=='2' || rez89[0]=='3') {
      this.tenissingl45.push(this.tenissingl89[0]);
    }
    else {
      this.tenissingl45.push(this.tenissingl89[1]);
    }

    this.tenissingl8=true; //opens html form for quarterfinals
  }


  skokuvisrez() {
    let possible:number=1;
    let results=[];
    this.athletesformycompetition.forEach(
      element=>{
        if(isNaN(parseFloat(element.rezultat))) {
          possible=0;
          return;
        }
        console.log(element.rezultat);
        results.push(element.rezultat);
      }
    );
    
    if(possible==0) {
      alert("Netacan format");
      return;
    }

    this.athletesformycompetition.sort(
      (a, b)=> parseFloat(b.rezultat)-parseFloat(a.rezultat)     
        );

    if(this.dvaimajuistuvrednost(results)) { //in case of tie, tie-breaker
      alert("Uneti rezultate sledeceg pokusaja");
      this.poslednjipokusajigraci=this.kojadva(this.athletesformycompetition);
      this.poslednjipokusaj=true;
      return;
    }

    console.log(this.athletesformycompetition);
    this.setMedalists();
  }

  unesiPrviPokusajStreljastvo() { //first attempt
    this.athletesformycompetition.forEach(
      element=>{
        if(element.rezultat==null) {
          alert("pogresan format!");
          return;
        }
        let krugovi=element.rezultat;
        if(isNaN(parseFloat(krugovi))) {
          alert("pogresan format!");
          return;
        }
        let index=this.athletesformycompetition.indexOf(element);
        this.resultsInSeveralInstances[index]=parseFloat(krugovi);
        element.rezultat=(parseFloat(krugovi)).toString();
        console.log(element.rezultat);
      }
    );
  }

  unesiNaredniPokusajStreljastvo() { //attempts 2-6
    for(let i=0; i<this.athletesformycompetition.length; i++) {
      if(this.athletesformycompetition[i].rezultat==null) {
        alert("pogresan format");
        break;
      }
      let krugovi=this.athletesformycompetition[i].rezultat;
        if(isNaN(parseFloat(krugovi))) {
          alert("pogresan format");
          break;
        }
        let index=i;
        let ovaVrednost=parseFloat(krugovi);
        if(ovaVrednost>this.resultsInSeveralInstances[index]) {
        this.resultsInSeveralInstances[index]=ovaVrednost;
        this.athletesformycompetition[i].rezultat=(ovaVrednost).toString();
        }
        else {
          this.athletesformycompetition[i].rezultat=this.resultsInSeveralInstances[index].toString();
        }
      }
      console.log(this.athletesformycompetition);
  }

  unesiPrviPokusaj() {
    this.athletesformycompetition.forEach(
      element=>{
        if(element.rezultat==null) {
          alert("pogresan format");
          return;
        }
        let vreme=element.rezultat.split(",");
        if(vreme.length!=2) {
          alert("pogresan format");
          return;
        }
        let metri=vreme[0];
        let centimetri=vreme[1];
        if(isNaN(parseFloat(metri)) || isNaN(parseFloat(centimetri))) {
          alert("pogresan format");
          return;
        }
        if(parseFloat(metri)<0 || parseFloat(centimetri)<0 || parseFloat(centimetri)>99) {
          alert("pogresan format");
          return;
        }
        console.log(metri+ " " + centimetri);
        let index=this.athletesformycompetition.indexOf(element);
        this.resultsInSeveralInstances[index]=parseFloat(metri)*100 + parseFloat(centimetri);
        element.rezultat=(parseFloat(metri)*100 + parseFloat(centimetri)).toString();
        console.log(element.rezultat);
      }
    );
  }

  unesiDrugiPokusaj() { //second attempt
    let possible:number=1;
    this.athletesformycompetition.forEach(
      element=>{
        if(element.rezultat==null) {
          alert("pogresan format");
          return;
        }
        let vreme=element.rezultat.split(",");
        if(vreme.length!=2) {
          alert("pogresan format");
          return;
        }
        let metri=vreme[0];
        let centimetri=vreme[1];
        if(isNaN(parseFloat(metri)) || isNaN(parseFloat(centimetri))) {
          alert("pogresan format");
          return;
        }
        if(parseFloat(metri)<0 || parseFloat(centimetri)<0 || parseFloat(centimetri)>99) {
          alert("pogresan format");
          return;
        }
        console.log(metri+ " " + centimetri);
        let index=this.athletesformycompetition.indexOf(element);
        let ovaVrednost=parseFloat(metri)*100 + parseFloat(centimetri);
        if(ovaVrednost>this.resultsInSeveralInstances[index]) {
        this.resultsInSeveralInstances[index]=parseFloat(metri)*100 + parseFloat(centimetri);
        element.rezultat=(parseFloat(metri)*100 + parseFloat(centimetri)).toString();
        console.log(element.rezultat);
        }
        else {
          element.rezultat=this.resultsInSeveralInstances[index].toString();
        }
      }
    );
  }

  unesiTreciPokusaj() {
    this.unesiDrugiPokusaj(); //same format
  }

  drumskatrkarez() {
    this.maratonrez(); //same format
  }

  maratonrez() { // testirano!
    let moguce:number=1;
    
    this.athletesformycompetition.forEach( 
      element=>{
        if(element.rezultat==null) {
          moguce=0;
        }
        let vreme=element.rezultat.split(":");
        if(vreme.length!=3) {
          moguce=0;
        }
        let sati=vreme[0];
        let minuti=vreme[1];
        let sekunde=vreme[2];
        if(isNaN(parseFloat(sati)) || isNaN(parseFloat(minuti)) || isNaN(parseFloat(sekunde))) {
          moguce=0;
        }
        if(parseFloat(minuti)<0 || parseFloat(minuti)>59 || parseFloat(sekunde)<0 || parseFloat(sekunde)>59) {
          moguce=0;
                }
        console.log(sati+ " " + minuti + " " + sekunde);
        element.rezultat=(parseFloat(sati)*3600 + parseFloat(minuti)*60+parseFloat(sekunde)).toString();
        console.log(element.rezultat);
      }
    );

    if(moguce==0) {
      alert("pogresan format");
      return;
    }

    this.athletesformycompetition.sort(
      (a, b)=> parseFloat(a.rezultat)-parseFloat(b.rezultat)     
        );

    let results=[];
    this.athletesformycompetition.forEach(
    element=>{
    console.log(element.rezultat);
    results.push(element.rezultat);
    }
    );
    
    if(this.dvaimajuistuvrednost(results)) {
    alert("Uneti rezultate sledeceg pokusaja"); //tie breaker
    this.poslednjipokusajigraci=this.kojadva(this.athletesformycompetition);
          this.poslednjipokusaj=true;
          return;
    }

    console.log(this.athletesformycompetition);
    this.setMedalists();
  }

  trcanje800mrez() {
    let possible:number=1;

    this.athletesformycompetition.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
          return;
        }
        let vreme=element.rezultat.split(":");
        if(vreme.length!=2) {
          possible=0;
          return;
        }
        let minuti=vreme[0];
        let vreme2=vreme[1].split(",");
        if(vreme2.length!=2) {
          possible=0;
          return;
        }
        let sekunde=vreme2[0];
        let stotinke=vreme2[1];
        if(isNaN(parseFloat(minuti)) || isNaN(parseFloat(sekunde)) || isNaN(parseFloat(stotinke))) {
          possible=0;
          return;
        }
        if(parseFloat(minuti)<0 || parseFloat(sekunde)<0 || parseFloat(sekunde)>59 || parseFloat(stotinke)<0 || parseFloat(stotinke)>99) {
          possible=0;
          return;
        }
        console.log(minuti+ " " + sekunde + " " + stotinke);
        element.rezultat=(parseFloat(minuti)*6000 + parseFloat(sekunde)*100+parseFloat(stotinke)).toString(); //nije testirano
        console.log(element.rezultat);
      }
    );
    if(possible==0) {
      alert("nije adekvatan format rezultata");
      return;
    }

    this.athletesformycompetition.sort(
      (a, b)=> parseFloat(a.rezultat)-parseFloat(b.rezultat)     
        );

        let results=[];
        this.athletesformycompetition.forEach(
          element=>{
            console.log(element.rezultat);
            results.push(element.rezultat);
          }
        );
    
        if(this.dvaimajuistuvrednost(results)) {
          alert("Uneti rezultate sledeceg pokusaja");
          this.poslednjipokusajigraci=this.kojadva(this.athletesformycompetition);
          this.poslednjipokusaj=true;
          return;
        }

    console.log(this.athletesformycompetition);
    this.setMedalists();  
  }


  trcanje100mrez() {
    let moguce:number=1;

    this.athletesformycompetition.forEach(
      element=>{
        if(element.rezultat==null) {
          alert("pogresan format");
          return;   
        }
        let vreme=element.rezultat.split(",");
        let sekunde=vreme[0];
        let stotinke=vreme[1];
        if(sekunde==null || stotinke==null) {
          moguce=0;
        }
        if(isNaN(parseFloat(sekunde)) ||isNaN(parseFloat(stotinke))) {
          moguce=0;
        }
        console.log(sekunde + " " + stotinke);
        if(parseFloat(sekunde)>59 || parseFloat(sekunde)<0 || parseFloat(stotinke)<0 || parseFloat(stotinke)>99) {
          moguce=0;
        }
        element.rezultat=(parseFloat(sekunde)*100+parseFloat(stotinke)).toString();
        console.log(element.rezultat);
      }
    );

    if(moguce==0) {
      alert("pogresan format");
      return;
    }

    this.athletesformycompetition.sort(
      (a, b)=> parseFloat(a.rezultat)-parseFloat(b.rezultat)    
        );

        let results=[];
        this.athletesformycompetition.forEach(
          element=>{
            console.log(element.rezultat);
            results.push(element.rezultat);
          }
        );
    
        if(this.dvaimajuistuvrednost(results)) {
          alert("Uneti rezultate poslednjeg pokusaja");
          this.poslednjipokusajigraci=this.kojadva(this.athletesformycompetition);
          this.poslednjipokusaj=true;
          return; //avoids setting medalists because the results arent final
        }

    this.setMedalists();
  }

  resortArrayForStreljastvo(dva) { //in this impementation a tie is between only two players
    let possible:number=1;
    dva.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
        }
        let krugovi=element.rezultat;
        if(isNaN(parseFloat(krugovi))) {
          possible=0;
        }
        let ovaVrednost=parseFloat(krugovi);
        element.rezultat=(ovaVrednost).toString();
      }
    );

    if(possible==0) {
      alert("neispravan format");
      return;
    }

    let index1=this.athletesformycompetition.indexOf(dva[0]);
    let index2=this.athletesformycompetition.indexOf(dva[1]);

    if(index1<index2 && dva[0].rezultat<dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    } 
    else if(index1>index2 && dva[0].rezultat>dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    this.setMedalists();
  }

  resortArrayFor100m(dva) {
    let possible:number=1;
    dva.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
        }
        let vreme=element.rezultat.split(",");
        if(vreme.length!=2) {
          possible=0;
        }
        let sekunde=vreme[0];
        let stotinke=vreme[1];
        if(isNaN(parseFloat(sekunde)) || isNaN(parseFloat(stotinke))) {
          possible=0;
        }
        if(parseFloat(sekunde)<0 || parseFloat(sekunde)>59 || parseFloat(stotinke)<0 || parseFloat(stotinke)>99) {
          possible=0;
        }
        console.log(sekunde + " " + stotinke);
        element.rezultat=(parseFloat(sekunde)*100+parseFloat(stotinke)).toString(); //nije testirano
        console.log(element.rezultat);
      }
    );

    if(possible==0) {
      alert("pogresan format");
      return;
    }

    let index1=this.athletesformycompetition.indexOf(dva[0]);
    let index2=this.athletesformycompetition.indexOf(dva[1]);

    if(index1<index2 && dva[0].rezultat>dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    else if(index1>index2 && dva[0].rezultat<dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    this.setMedalists();
  }

  resortArrayForMaraton(dva) {
    let possible:number=1;
    dva.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
        }
        let vreme=element.rezultat.split(":");
        if(vreme.length!=3) {
          possible=0;
        }
        let sati=vreme[0];
        let minuti=vreme[1];
        let sekunde=vreme[2];
        if(isNaN(parseFloat(sati)) || isNaN(parseFloat(minuti)) || isNaN(parseFloat(sekunde))) {
          possible=0;
        }
        if(parseFloat(sati)<0 || parseFloat(minuti)<0 || parseFloat(minuti)>59 || parseFloat(sekunde)<0 || parseFloat(sekunde)>59){
          possible=0;
        }
        console.log(sati+ " " + minuti + " " + sekunde);
        element.rezultat=(parseFloat(sati)*3600 + parseFloat(minuti)*60+parseFloat(sekunde)).toString();
        console.log(element.rezultat);
      }
    );

      if(possible==0) {
        alert("pogresan format");
        return;  
      }

    let index1=this.athletesformycompetition.indexOf(dva[0]);
    let index2=this.athletesformycompetition.indexOf(dva[1]);

    if(index1<index2 && dva[0].rezultat>dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    else if(index1>index2 && dva[0].rezultat<dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    this.setMedalists();
  }

  resortArrayForSkokUVis(dva) {
    let possible:number=1;
    dva.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
        }
        let vreme=element.rezultat.split(",");
        if(vreme.length!=2) {          
          possible=0;
        }
        let metri=vreme[0];
        let centimetri=vreme[1];
        if(isNaN(parseFloat(metri)) || isNaN(parseFloat(centimetri))) {
          possible=0;
        }
        if(parseFloat(metri)<0 || parseFloat(centimetri)<0 || parseFloat(centimetri)>99) {
          possible=0;
        }
        console.log(metri+ " " + centimetri);
        element.rezultat=(parseFloat(metri)*100 + parseFloat(centimetri)).toString();
        console.log(element.rezultat);
      }
    );
    
    if(possible==0) {
      alert("pogresan format");
      return;  
    }
    let index1=this.athletesformycompetition.indexOf(dva[0]);
    let index2=this.athletesformycompetition.indexOf(dva[1]);

    if(index1<index2 && dva[0].rezultat<dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    else if(index1>index2 && dva[0].rezultat>dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    this.setMedalists();
  }

  resortArrayFor800m(dva) {
    let possible:number=1;
    dva.forEach(
      element=>{
        if(element.rezultat==null) {
          possible=0;
        }
        let vreme=element.rezultat.split(":");
        if(vreme.length!=2) {
          possible=0;
        }
        let minuti=vreme[0];
        let vreme2=vreme[1].split(",");
        if(vreme2.length!=2) {
          possible=0;
        }
        let sekunde=vreme2[0];
        let stotinke=vreme2[1];
        if(isNaN(parseFloat(minuti)) || isNaN(parseFloat(sekunde)) || isNaN(parseFloat(sekunde))) {
          possible=0;
        }
        if(parseFloat(minuti)<0 || parseFloat(sekunde)<0 || parseFloat(sekunde)>59 || parseFloat(stotinke)<0 || parseFloat(stotinke)>99) {
          possible=0;
        }
        console.log(minuti+ " " + sekunde + " " + stotinke);
        element.rezultat=(parseFloat(minuti)*6000 + parseFloat(sekunde)*100+parseFloat(stotinke)).toString();
        console.log(element.rezultat);
      }
    );
    if(possible==0) {
      alert("pogresan format");
      return;
    }
    let index1=this.athletesformycompetition.indexOf(dva[0]);
    let index2=this.athletesformycompetition.indexOf(dva[1]);

    if(index1<index2 && dva[0].rezultat>dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    else if(index1>index2 && dva[0].rezultat<dva[1].rezultat){
      this.athletesformycompetition[index1]=dva[1];
      this.athletesformycompetition[index2]=dva[0];
    }
    this.setMedalists();
  }

  sortTennisPlayersByRanking() { 
    console.log("pozvana sort by ranking");
    this.athletesformycompetition.sort(
      (a, b)=> parseFloat(a.rezultat)-parseFloat(b.rezultat)   
        );
  }

  setMedalists() {
    this.athleteService.addGoldMedal(this.athletesformycompetition[0].imeprezime, this.athletesformycompetition[0].nacionalnost).subscribe(
      response=> {
        if(response['message']=='added gold medal') {
          alert("Zlato " + this.athletesformycompetition[0].imeprezime);
          this.myCompetition.pobednik=this.athletesformycompetition[0].imeprezime;
          this.countryService.addGoldMedal(this.athletesformycompetition[0].nacionalnost).subscribe( 
            response=>{
              if(response['message']=='added gold medal') {
                //alert("Gold medal for " + this.athletesformycompetition[0].nacionalnost);
              }
              else alert("error");
             }
          );
        }
        else alert("error");
      }
    );

    this.athleteService.addSilverMedal(this.athletesformycompetition[1].imeprezime, this.athletesformycompetition[1].nacionalnost).subscribe(
      response=> {
        if(response['message']=='added silver medal') {
          alert("Srebro " + this.athletesformycompetition[1].imeprezime);
          this.myCompetition.drugi=this.athletesformycompetition[1].imeprezime;
          this.countryService.addSilverMedal(this.athletesformycompetition[1].nacionalnost).subscribe( 
            response=>{
              if(response['message']=='added silver medal') {
                //alert("Silver medal for " + this.athletesformycompetition[1].nacionalnost);
              }
              else alert("error");
             }
          );
        }
        else alert("error");
      }
    );

    this.athleteService.addBronzeMedal(this.athletesformycompetition[2].imeprezime, this.athletesformycompetition[2].nacionalnost).subscribe(
      response=> {
        if(response['message']=='added bronze medal') {
          this.myCompetition.treci=this.athletesformycompetition[2].imeprezime;
          alert("Bronza " + this.athletesformycompetition[2].imeprezime);
          this.countryService.addBronzeMedal(this.athletesformycompetition[2].nacionalnost).subscribe( 
            response=>{
              if(response['message']=='added bronze medal') {
                //alert("Bronze medal for " + this.athletesformycompetition[2].nacionalnost);
              }
              else alert("error");
             }
          );
        }
        else alert("error");
      }
    );

    this.sportcompService.endCompetition(this.myCompetition.sport, this.myCompetition.disciplina,
      this.myCompetition.pol, this.myCompetition.vrsta, this.athletesformycompetition[0].imeprezime, this.athletesformycompetition[1].imeprezime,
      this.athletesformycompetition[2].imeprezime).subscribe(
        response=>{
          if(response['message']=='ended competition') alert("Takmicenje je zavrseno!");
          else alert('error ending competition');
        }
      );
      this.gotovo=true;
  }

  checkFormatOfTennisResults(rez):boolean {
    if(rez!=='2:1' && rez!='1:2' && rez!='2:0' && rez!='0:2') return false;
    return true;
  }


  ISOStringToDate(str) {
    str=str.slice(0,-1);
    console.log(str);
    let date=new Date(str);
    console.log(date);
    let year=date.getFullYear().toString();
    let month=date.getMonth().toString();
    let day=date.getDay().toString();
    let hour=date.getHours().toString();
    let minute=date.getMinutes().toString();

    let retval=""+day+"."+month+"."+year+". "+hour+":"+minute;
    return retval;
  }
}
