import { Athlete } from "./athlete";
import { User } from "./user";

export class Competition
    {
        sport: string;
        disciplina: string;
        pol: string;
        vrsta: string;
        pocetak: string;
        kraj: string;
        lokacija:string;
        delegat: string[];
        takmicari: Athlete[];
        prijavljeni: Athlete[];
        pobednik: string;
        format: string;
        brojTakmicaraMin: number;
        brojTakmicaraMax: number;
        drugi: string;    
        treci: string;
        potvrdjeno: boolean;
        zavrseno: boolean;
        trajanje:string;
    }