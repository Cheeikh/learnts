export class Patient {
    constructor(
      private _id: number,
       private _nom: string,
       private _prenom: string,
       private _telephone: string,
       private _adresse: string,
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

    get telephone(): string {
        return this._telephone;
    }

    set telephone(value: string) {
        this._telephone = value;
    }

    get adresse(): string {
        return this._adresse;
    }

    set adresse(value: string) {
        this._adresse = value;
    }
}