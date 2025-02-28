import { Patient } from "./Patient.js";
import { Medecin } from "./Medecin.js";

export class RendezVous {
    constructor(
        private _patient: Patient,
        private _medecin: Medecin,
        private _date: Date,
        private _heure: string,
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

    get heure(): string {
        return this._heure;
    }

    set heure(value: string) {
        this._heure = value;
    }
}