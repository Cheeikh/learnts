import { Patient } from "../model/Patient.js";
import { Medecin } from "../model/Medecin.js";
import { RendezVous } from "../model/RendezVous.js";

export class CabinetService {
    private patients: Patient[] = [];
    private medecins: Medecin[] = [];
    private rendezVous: RendezVous[] = [];

    // Getters pour accéder aux données
    getPatients(): Patient[] {
        return this.patients;
    }

    getMedecins(): Medecin[] {
        return this.medecins;
    }

    getRendezVous(): RendezVous[] {
        return this.rendezVous;
    }

    // Méthodes pour ajouter des données
    ajouterPatient(patient: Patient): void {
        this.patients.push(patient);
    }

    ajouterMedecin(medecin: Medecin): void {
        this.medecins.push(medecin);
    }

    ajouterRendezVous(rendezVous: RendezVous): void {
        this.rendezVous.push(rendezVous);
    }

    // Méthodes pour générer de nouveaux IDs
    genererNouvelIdPatient(): number {
        return this.patients.length > 0 ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
    }

    genererNouvelIdMedecin(): number {
        return this.medecins.length > 0 ? Math.max(...this.medecins.map(m => m.id)) + 1 : 1;
    }

    // Méthodes de validation
    patientExiste(nom: string, prenom: string): boolean {
        return this.patients.some(p => 
            p.nom.toLowerCase() === nom.toLowerCase() && 
            p.prenom.toLowerCase() === prenom.toLowerCase()
        );
    }

    telephoneExiste(telephone: string): boolean {
        return this.patients.some(p => p.telephone === telephone);
    }

    medecinExiste(nom: string, prenom: string): boolean {
        return this.medecins.some(m => 
            m.nom.toLowerCase() === nom.toLowerCase() && 
            m.prenom.toLowerCase() === prenom.toLowerCase()
        );
    }

    medecinOccupe(medecinId: number, date: Date, heure: Date): boolean {
        return this.rendezVous.some(rdv => {
            return rdv.medecin.id === medecinId &&
                   rdv.date.toDateString() === date.toDateString() &&
                   rdv.heure.getHours() === heure.getHours() &&
                   rdv.heure.getMinutes() === heure.getMinutes();
        });
    }

    patientOccupe(patientId: number, date: Date, heure: Date): boolean {
        return this.rendezVous.some(rdv => {
            return rdv.patient.id === patientId &&
                   rdv.date.toDateString() === date.toDateString() &&
                   rdv.heure.getHours() === heure.getHours() &&
                   rdv.heure.getMinutes() === heure.getMinutes();
        });
    }

    nombreRendezVousPatientJour(patientId: number, date: Date): number {
        return this.rendezVous.filter(rdv => {
            return rdv.patient.id === patientId &&
                   rdv.date.toDateString() === date.toDateString();
        }).length;
    }
}
