import { Patient } from "../model/Patient.js";
import { Medecin } from "../model/Medecin.js";
import { RendezVous } from "../model/RendezVous.js";
import * as fs from 'fs';
import * as path from 'path';

export class CabinetService {
    private patients: Patient[] = [];
    private medecins: Medecin[] = [];
    private rendezVous: RendezVous[] = [];
    private dataDir: string = './data';
    private patientsFile: string = path.join(this.dataDir, 'patients.json');
    private medecinsFile: string = path.join(this.dataDir, 'medecins.json');
    private rendezVousFile: string = path.join(this.dataDir, 'rendezVous.json');

    constructor() {
        this.initDataDirectory();
        this.chargerDonnees();
    }

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
        this.sauvegarderPatients();
    }

    ajouterMedecin(medecin: Medecin): void {
        this.medecins.push(medecin);
        this.sauvegarderMedecins();
    }

    ajouterRendezVous(rendezVous: RendezVous): void {
        this.rendezVous.push(rendezVous);
        this.sauvegarderRendezVous();
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

    // Méthodes pour la gestion des rendez-vous
    rendezVousExiste(patientId: number, medecinId: number, date: Date, heure: string): boolean {
        return this.rendezVous.some(rv => 
            rv.patient.id === patientId && 
            rv.medecin.id === medecinId && 
            rv.date.toDateString() === date.toDateString() && 
            rv.heure === heure
        );
    }

    medecinDisponible(medecinId: number, date: Date, heure: string): boolean {
        return !this.rendezVous.some(rv => 
            rv.medecin.id === medecinId && 
            rv.date.toDateString() === date.toDateString() && 
            rv.heure === heure
        );
    }

    nombreRendezVousPatientParJour(patientId: number, date: Date): number {
        return this.rendezVous.filter(rv => 
            rv.patient.id === patientId && 
            rv.date.toDateString() === date.toDateString()
        ).length;
    }

    // Méthodes pour la persistance des données
    private initDataDirectory(): void {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    private sauvegarderPatients(): void {
        const data = JSON.stringify(this.patients, null, 2);
        fs.writeFileSync(this.patientsFile, data);
    }

    private sauvegarderMedecins(): void {
        const data = JSON.stringify(this.medecins, null, 2);
        fs.writeFileSync(this.medecinsFile, data);
    }

    private sauvegarderRendezVous(): void {
        // Convertir les dates en chaînes pour la sérialisation
        const rendezVousSerializable = this.rendezVous.map(rv => ({
            patient: rv.patient,
            medecin: rv.medecin,
            date: rv.date.toISOString(),
            heure: rv.heure
        }));
        const data = JSON.stringify(rendezVousSerializable, null, 2);
        fs.writeFileSync(this.rendezVousFile, data);
    }

    private chargerPatients(): void {
        if (fs.existsSync(this.patientsFile)) {
            const data = fs.readFileSync(this.patientsFile, 'utf8');
            const patientsData = JSON.parse(data);
            
            this.patients = patientsData.map((p: any) => 
                new Patient(p._id, p._nom, p._prenom, p._telephone, p._adresse)
            );
        }
    }

    private chargerMedecins(): void {
        if (fs.existsSync(this.medecinsFile)) {
            const data = fs.readFileSync(this.medecinsFile, 'utf8');
            const medecinsData = JSON.parse(data);
            
            this.medecins = medecinsData.map((m: any) => 
                new Medecin(m._id, m._nom, m._prenom, m._specialite)
            );
        }
    }

    private chargerRendezVous(): void {
        if (fs.existsSync(this.rendezVousFile)) {
            const data = fs.readFileSync(this.rendezVousFile, 'utf8');
            const rendezVousData = JSON.parse(data);
            
            this.rendezVous = rendezVousData.map((rv: any) => {
                // Trouver le patient et le médecin correspondants
                const patient = this.patients.find(p => p.id === rv.patient._id);
                const medecin = this.medecins.find(m => m.id === rv.medecin._id);
                
                if (patient && medecin) {
                    return new RendezVous(
                        patient,
                        medecin,
                        new Date(rv.date),
                        rv.heure
                    );
                }
                return null;
            }).filter((rv: RendezVous | null): rv is RendezVous => rv !== null);
        }
    }

    chargerDonnees(): void {
        this.chargerPatients();
        this.chargerMedecins();
        this.chargerRendezVous();
    }

    sauvegarderDonnees(): void {
        this.sauvegarderPatients();
        this.sauvegarderMedecins();
        this.sauvegarderRendezVous();
    }
}
