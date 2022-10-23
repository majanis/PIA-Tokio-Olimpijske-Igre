import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllAthletes() {
     return this.http.get(`${this.uri}/athlete/getallathletes`);
   }

   getAthleteByName(pretraga) {
     const data={
       pretraga: pretraga
     }
    return this.http.post(`${this.uri}/athlete/getathletebyname`, data);  
   }

   getAthleteByDiscipline(disciplina) {
     const data={
       disciplina: disciplina
     }
    return this.http.post(`${this.uri}/athlete/getathletebydiscipline`, data);
   }

   getAthleteBySport(sport) {
    const data={
      sport: sport
    }
   return this.http.post(`${this.uri}/athlete/getathletebysport`, data);
   }

   getAthleteByCountry(nacionalnost) {
    const data={
      nacionalnost: nacionalnost
    }
   return this.http.post(`${this.uri}/athlete/getathletebycountry`, data);
   }

   addAthlete(imeprezime, pol, sport, discipline, nacionalnost, gold, silver, bronze, rezultat) {
     const data={
      imeprezime: imeprezime,
      pol: pol,
      sport: sport,
      discipline: discipline,
      nacionalnost: nacionalnost,
      gold: gold,
      silver: silver,
      bronze: bronze,
      rezultat: rezultat
     }
     return this.http.post(`${this.uri}/athlete/addathlete`, data);
   }

   addGoldMedal(imeprezime, nacionalnost) {
    const data={
      imeprezime: imeprezime,
      nacionalnost: nacionalnost
    }
   return this.http.post(`${this.uri}/athlete/addgoldmedal`, data);
   }

   addSilverMedal(imeprezime, nacionalnost) {
    const data={
      imeprezime: imeprezime,
      nacionalnost: nacionalnost
    }
   return this.http.post(`${this.uri}/athlete/addsilvermedal`, data);
   }

   addBronzeMedal(imeprezime, nacionalnost) {
    const data={
      imeprezime: imeprezime,
      nacionalnost: nacionalnost
    }
   return this.http.post(`${this.uri}/athlete/addbronzemedal`, data);
   }
   
   addTotalMedal(imeprezime, nacionalnost) {
    const data={
      imeprezime: imeprezime,
      nacionalnost: nacionalnost
    }
   return this.http.post(`${this.uri}/athlete/addtotalmedal`, data);
   }

   setRankingForTennisPlayers(imeprezime, nacionalnost, rezultat) {
    const data={
      imeprezime: imeprezime,
      nacionalnost: nacionalnost,
      rezultat: rezultat
    }
   return this.http.post(`${this.uri}/athlete/setranking`, data);
   } 

}
