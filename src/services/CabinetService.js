"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabinetService = void 0;
var CabinetService = /** @class */ (function () {
    function CabinetService() {
        this.patients = [];
        this.medecins = [];
        this.rendezVous = [];
    }
    // Getters pour accéder aux données
    CabinetService.prototype.getPatients = function () {
        return this.patients;
    };
    CabinetService.prototype.getMedecins = function () {
        return this.medecins;
    };
    CabinetService.prototype.getRendezVous = function () {
        return this.rendezVous;
    };
    // Méthodes pour ajouter des données
    CabinetService.prototype.ajouterPatient = function (patient) {
        this.patients.push(patient);
    };
    CabinetService.prototype.ajouterMedecin = function (medecin) {
        this.medecins.push(medecin);
    };
    CabinetService.prototype.ajouterRendezVous = function (rendezVous) {
        this.rendezVous.push(rendezVous);
    };
    // Méthodes pour générer de nouveaux IDs
    CabinetService.prototype.genererNouvelIdPatient = function () {
        return this.patients.length > 0 ? Math.max.apply(Math, this.patients.map(function (p) { return p.id; })) + 1 : 1;
    };
    CabinetService.prototype.genererNouvelIdMedecin = function () {
        return this.medecins.length > 0 ? Math.max.apply(Math, this.medecins.map(function (m) { return m.id; })) + 1 : 1;
    };
    // Méthodes de validation
    CabinetService.prototype.patientExiste = function (nom, prenom) {
        return this.patients.some(function (p) {
            return p.nom.toLowerCase() === nom.toLowerCase() &&
                p.prenom.toLowerCase() === prenom.toLowerCase();
        });
    };
    CabinetService.prototype.telephoneExiste = function (telephone) {
        return this.patients.some(function (p) { return p.telephone === telephone; });
    };
    CabinetService.prototype.medecinExiste = function (nom, prenom) {
        return this.medecins.some(function (m) {
            return m.nom.toLowerCase() === nom.toLowerCase() &&
                m.prenom.toLowerCase() === prenom.toLowerCase();
        });
    };
    CabinetService.prototype.medecinOccupe = function (medecinId, date, heure) {
        return this.rendezVous.some(function (rdv) {
            return rdv.medecin.id === medecinId &&
                rdv.date.toDateString() === date.toDateString() &&
                rdv.heure.getHours() === heure.getHours() &&
                rdv.heure.getMinutes() === heure.getMinutes();
        });
    };
    CabinetService.prototype.patientOccupe = function (patientId, date, heure) {
        return this.rendezVous.some(function (rdv) {
            return rdv.patient.id === patientId &&
                rdv.date.toDateString() === date.toDateString() &&
                rdv.heure.getHours() === heure.getHours() &&
                rdv.heure.getMinutes() === heure.getMinutes();
        });
    };
    CabinetService.prototype.nombreRendezVousPatientJour = function (patientId, date) {
        return this.rendezVous.filter(function (rdv) {
            return rdv.patient.id === patientId &&
                rdv.date.toDateString() === date.toDateString();
        }).length;
    };
    return CabinetService;
}());
exports.CabinetService = CabinetService;
