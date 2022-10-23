import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsandcompetitionsService {
  uri='http://localhost:4000'
  
  constructor(private http: HttpClient) { }

  getAllSports() {
     return this.http.get(`${this.uri}/sport/getallsports`);
   }

   addSport(ime, discipline, vrsta, maxIgraca, minIgraca) {

    const data={
      ime: ime,
      discipline: discipline,
      vrsta: vrsta,
      maxIgraca: maxIgraca,
      minIgraca:minIgraca
    }

return this.http.post(`${this.uri}/sport/insertsport`, data);
  }


  addDisciplineToSport(ime, disciplina, vrsta) {
    const data={
      ime: ime,
      disciplina: disciplina,
      vrsta: vrsta
    }
    return this.http.post(`${this.uri}/sport/adddiscipline`, data);
  }

  getSport(ime, vrsta) {
    console.log("get sport called in service");
    const data={
      ime: ime,
      vrsta: vrsta
    }
    return this.http.post(`${this.uri}/sport/getsport`, data);
   
  }

  getAllCompetitions() {
    return this.http.get(`${this.uri}/competition/getallcompetitions`);
  }

  insertCompetition(sport, disciplina, pol, vrsta, pocetak, kraj, lokacija, delegat, takmicari, prijavljeni, pobednik, format, 
    brojTakmicaraMin, brojTakmicaraMax, drugi, treci, potvrdjeno, zavrseno) {
      const data= {
        sport: sport,
        disciplina: disciplina, 
        pol: pol,
        vrsta: vrsta,
        pocetak: pocetak,
        kraj: kraj,
        lokacija: lokacija,
        delegat: delegat,
        takmicari: takmicari,
        prijavljeni: prijavljeni,
        pobednik: pobednik,
        format: format,
        brojTakmicaraMin: brojTakmicaraMin,
        brojTakmicaraMax: brojTakmicaraMax,
        drugi: drugi,
        treci: treci,
        potvrdjeno: potvrdjeno,
        zavrseno:zavrseno
      }
    return this.http.post(`${this.uri}/competition/insertcompetition`, data);
  }

  confirmCompetition(sport, disciplina, pol, vrsta) {
    const data= {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      vrsta: vrsta
    }
    return this.http.post(`${this.uri}/competition/confirmcompetition`, data);
  }

  endCompetition(sport, disciplina, pol, vrsta, pobednik, drugi, treci) {
    const data= {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      vrsta: vrsta,
      pobednik: pobednik,
      drugi: drugi,
      treci: treci
    }
    return this.http.post(`${this.uri}/competition/endcompetition`, data);
  }

  addDelegate(sport, disciplina, pol, vrsta, delegat) {
      const data= {
        sport: sport,
        disciplina: disciplina, 
        pol: pol,
        vrsta: vrsta,
        delegat: delegat
      }
    return this.http.post(`${this.uri}/competition/adddelegate`, data);
  }

  addCandidate(sport, disciplina, pol, vrsta, prijavljen) {
    const data= {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      vrsta: vrsta,
      prijavljen: prijavljen
    }
  return this.http.post(`${this.uri}/competition/addcandidate`, data);
}

  addCompetitor(sport, disciplina, pol, vrsta, takmicar) {
    const data= {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      vrsta: vrsta,
      takmicar: takmicar
    }
  return this.http.post(`${this.uri}/competition/addcompetitor`, data);
}

removeRequest(sport, disciplina, pol, vrsta, prijavljen) {
  const data= {
    sport: sport,
    disciplina: disciplina, 
    pol: pol,
    vrsta: vrsta,
    prijavljen: prijavljen
  }
return this.http.post(`${this.uri}/competition/removerequest`, data);
}

  addFormat(sport, disciplina, pol, vrsta, format) {
    const data= {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      vrsta: vrsta,
      format: format
    }
  return this.http.post(`${this.uri}/competition/adddelegate`, data);
}

checkTimeAndLocation(pocetak, lokacija) {
  const data= {
    pocetak: pocetak,
    lokacija: lokacija
  }
  return this.http.post(`${this.uri}/competition/checktimeandlocation`, data);
}

setTimeAndLocation(sport, disciplina, pol, vrsta, pocetak, kraj, lokacija) {
  const data= {
    sport: sport,
    disciplina: disciplina, 
    pol: pol,
    vrsta: vrsta,
    pocetak: pocetak,
    kraj: kraj,
    lokacija: lokacija
  }
  return this.http.post(`${this.uri}/competition/settimeandlocation`, data);
}


checkTimeAndLocationTennis(pocetak, lokacija) {
  const data= {
    pocetak: pocetak,
    lokacija: lokacija
  }
  return this.http.post(`${this.uri}/competition/checktimeandlocationtennis`, data);
}

setTimeAndLocationTennis(sport, disciplina, pol, vrsta, pocetak, kraj, lokacija) {
  const data= {
    sport: sport,
    disciplina: disciplina, 
    pol: pol,
    vrsta: vrsta,
    pocetak: pocetak,
    kraj: kraj,
    lokacija: lokacija
  }
  return this.http.post(`${this.uri}/competition/settimeandlocationtennis`, data);
}

checkIfCandidateApplied(sport, disciplina, pol, vrsta, candidate) {
  const data= {
    sport: sport,
    disciplina: disciplina, 
    pol: pol,
    vrsta: vrsta,
    candidate:candidate
  }
  return this.http.post(`${this.uri}/competition/settimeandlocation`, data);
}

getCompetitionByDelegate(delegat) {
  const data={
    delegat: delegat
  }
  return this.http.post(`${this.uri}/competition/getcompetitionsbydelegate`, data);
}

getCompetitionByData(sport, disciplina, pol, vrsta) {
  const data= {
    sport: sport,
    disciplina: disciplina, 
    pol: pol,
    vrsta: vrsta
  }
  return this.http.post(`${this.uri}/competition/getcompetitionbydata`, data);
 
}


}
