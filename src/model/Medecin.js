"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medecin = void 0;
var Medecin = /** @class */ (function () {
    function Medecin(_id, _nom, _prenom, _specialite) {
        this._id = _id;
        this._nom = _nom;
        this._prenom = _prenom;
        this._specialite = _specialite;
    }
    Object.defineProperty(Medecin.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Medecin.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (value) {
            this._nom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Medecin.prototype, "prenom", {
        get: function () {
            return this._prenom;
        },
        set: function (value) {
            this._prenom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Medecin.prototype, "specialite", {
        get: function () {
            return this._specialite;
        },
        set: function (value) {
            this._specialite = value;
        },
        enumerable: false,
        configurable: true
    });
    return Medecin;
}());
exports.Medecin = Medecin;
