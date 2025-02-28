import { Patient } from "./Patient";
import { Medecin } from "./Medecin";

export class RendezVous {
    constructor(
        private _patient: Patient,
        private _medecin: Medecin,
        private _date: Date,
        private _heure: Date,
    ) {}

    get patient(): Patient {
        return this._patient;
    }

    set patient(value: Patient) {
        this._patient = value;
    }

    get medecin(): Medecin {
        return this._medecin;
    }

    set medecin(value: Medecin) {
        this._medecin = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get heure(): Date {
        return this._heure;
    }

    set heure(value: Date) {
        this._heure = value;
    }
}