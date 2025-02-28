"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVous = void 0;
var RendezVous = /** @class */ (function () {
    function RendezVous(_patient, _medecin, _date, _heure) {
        this._patient = _patient;
        this._medecin = _medecin;
        this._date = _date;
        this._heure = _heure;
    }
    Object.defineProperty(RendezVous.prototype, "patient", {
        get: function () {
            return this._patient;
        },
        set: function (value) {
            this._patient = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RendezVous.prototype, "medecin", {
        get: function () {
            return this._medecin;
        },
        set: function (value) {
            this._medecin = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RendezVous.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RendezVous.prototype, "heure", {
        get: function () {
            return this._heure;
        },
        set: function (value) {
            this._heure = value;
        },
        enumerable: false,
        configurable: true
    });
    return RendezVous;
}());
exports.RendezVous = RendezVous;
