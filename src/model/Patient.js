"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
var Patient = /** @class */ (function () {
    function Patient(_id, _nom, _prenom, _telephone, _adresse) {
        this._id = _id;
        this._nom = _nom;
        this._prenom = _prenom;
        this._telephone = _telephone;
        this._adresse = _adresse;
    }
    Object.defineProperty(Patient.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Patient.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (value) {
            this._nom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Patient.prototype, "prenom", {
        get: function () {
            return this._prenom;
        },
        set: function (value) {
            this._prenom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Patient.prototype, "telephone", {
        get: function () {
            return this._telephone;
        },
        set: function (value) {
            this._telephone = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Patient.prototype, "adresse", {
        get: function () {
            return this._adresse;
        },
        set: function (value) {
            this._adresse = value;
        },
        enumerable: false,
        configurable: true
    });
    return Patient;
}());
exports.Patient = Patient;
