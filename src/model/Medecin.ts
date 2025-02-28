export class Medecin {

    constructor(
       private _id: number,
       private _nom: string,
        private _prenom: string,
        private _specialite: string,
    ) {}


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get prenom(): string {
        return this._prenom;
    }

    set prenom(value: string) {
        this._prenom = value;
    }

    get specialite(): string {
        return this._specialite;
    }

    set specialite(value: string) {
        this._specialite = value;
    }
}