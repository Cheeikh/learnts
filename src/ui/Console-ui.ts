import * as readline from "readline-sync";
import { Patient } from "../model/Patient";
import { Medecin } from "../model/Medecin";
import { RendezVous } from "../model/RendezVous";
import { CabinetService } from "../services/CabinetService";

// Fonction pour afficher le menu principal
export const afficherMenu = (service: CabinetService) => {
    console.clear(); // Nettoie la console pour une meilleure lisibilité
    console.log("=== MENU PRINCIPAL ===");
    console.log("1. Ajouter un patient");
    console.log("2. Ajouter un médecin");
    console.log("3. Ajouter un rendez-vous");
    console.log("4. Afficher les patients");
    console.log("5. Afficher les médecins");
    console.log("6. Afficher les rendez-vous");
    console.log("7. Quitter");
    
    return parseInt(readline.question("Que voulez-vous faire ? "));
};

// Fonction pour afficher les patients
export const afficherPatients = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Liste des patients ===");
    const patients = service.getPatients();
    if (patients.length === 0) {
        console.log("Aucun patient enregistré.");
    } else {
        patients.forEach(patient => {
            console.log(`ID: ${patient.id} | Nom: ${patient.nom} | Prénom: ${patient.prenom} | Téléphone: ${patient.telephone} | Adresse: ${patient.adresse}`);
        });
    }
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    retourMenu();
};

// Fonction pour afficher les médecins
export const afficherMedecins = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Liste des médecins ===");
    const medecins = service.getMedecins();
    if (medecins.length === 0) {
        console.log("Aucun médecin enregistré.");
    } else {
        medecins.forEach(medecin => {
            console.log(`ID: ${medecin.id} | Nom: ${medecin.nom} | Prénom: ${medecin.prenom} | Spécialité: ${medecin.specialite}`);
        });
    }
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    retourMenu();
};

// Fonction pour afficher les rendez-vous
export const afficherRendezVous = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Liste des rendez-vous ===");
    const rendezVous = service.getRendezVous();
    if (rendezVous.length === 0) {
        console.log("Aucun rendez-vous enregistré.");
    } else {
        // Trier les rendez-vous par date et heure
        const rendezVousTries = [...rendezVous].sort((a, b) => {
            if (a.date.getTime() !== b.date.getTime()) {
                return a.date.getTime() - b.date.getTime();
            }
            return a.heure.getTime() - b.heure.getTime();
        });

        rendezVousTries.forEach(rdv => {
            const dateFormatee = rdv.date.toLocaleDateString('fr-FR');
            const heureFormatee = rdv.heure.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            console.log(`Patient: ${rdv.patient.nom} ${rdv.patient.prenom} | Médecin: ${rdv.medecin.nom} ${rdv.medecin.prenom} (${rdv.medecin.specialite}) | Date: ${dateFormatee} | Heure: ${heureFormatee}`);
        });
    }
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    retourMenu();
};

// Fonction pour ajouter un patient
export const saisirPatient = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Ajouter un patient ===");
    
    // Générer un nouvel ID
    const nouvelId = service.genererNouvelIdPatient();
    
    // Demander les informations du patient
    const nom = readline.question("Nom : ");
    if (!nom.trim()) {
        console.log("Erreur : Le nom ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const prenom = readline.question("Prénom : ");
    if (!prenom.trim()) {
        console.log("Erreur : Le prénom ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier l'unicité du nom et prénom
    if (service.patientExiste(nom, prenom)) {
        console.log(`Erreur : Un patient avec le nom "${prenom} ${nom}" existe déjà.`);
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const telephone = readline.question("Téléphone : ");
    if (!telephone.trim() || !/^\d{2}( \d{3}){2} \d{2}$/.test(telephone)) {
        console.log("Erreur : Le téléphone doit être au format 'XX XXX XX XX'.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier l'unicité du numéro de téléphone
    if (service.telephoneExiste(telephone)) {
        console.log(`Erreur : Un patient avec le numéro de téléphone "${telephone}" existe déjà.`);
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const adresse = readline.question("Adresse : ");
    if (!adresse.trim()) {
        console.log("Erreur : L'adresse ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Créer et retourner le patient
    const nouveauPatient = new Patient(nouvelId, nom, prenom, telephone, adresse);
    
    console.log(`\nPatient ${prenom} ${nom} ajouté avec succès !`);
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    
    return nouveauPatient;
};

// Fonction pour ajouter un médecin
export const saisirMedecin = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Ajouter un médecin ===");
    
    // Générer un nouvel ID
    const nouvelId = service.genererNouvelIdMedecin();
    
    // Demander les informations du médecin
    const nom = readline.question("Nom : ");
    if (!nom.trim()) {
        console.log("Erreur : Le nom ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const prenom = readline.question("Prénom : ");
    if (!prenom.trim()) {
        console.log("Erreur : Le prénom ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier l'unicité du nom et prénom
    if (service.medecinExiste(nom, prenom)) {
        console.log(`Erreur : Un médecin avec le nom "${prenom} ${nom}" existe déjà.`);
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const specialite = readline.question("Spécialité : ");
    if (!specialite.trim()) {
        console.log("Erreur : La spécialité ne peut pas être vide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Créer et retourner le médecin
    const nouveauMedecin = new Medecin(nouvelId, nom, prenom, specialite);
    
    console.log(`\nMédecin ${prenom} ${nom} (${specialite}) ajouté avec succès !`);
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    
    return nouveauMedecin;
};

// Fonction pour ajouter un rendez-vous
export const saisirRendezVous = (service: CabinetService, retourMenu: () => void) => {
    console.clear();
    console.log("\n=== Ajouter un rendez-vous ===");
    
    const patients = service.getPatients();
    const medecins = service.getMedecins();
    
    // Vérifier s'il y a des patients et des médecins
    if (patients.length === 0) {
        console.log("Erreur : Aucun patient enregistré. Veuillez d'abord ajouter un patient.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    if (medecins.length === 0) {
        console.log("Erreur : Aucun médecin enregistré. Veuillez d'abord ajouter un médecin.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Afficher la liste des patients
    console.log("\nListe des patients :");
    patients.forEach((patient, index) => {
        console.log(`${index + 1}. ${patient.prenom} ${patient.nom}`);
    });
    
    // Sélectionner un patient
    const patientIndex = parseInt(readline.question("\nSélectionnez un patient (numéro) : ")) - 1;
    if (isNaN(patientIndex) || patientIndex < 0 || patientIndex >= patients.length) {
        console.log("Erreur : Sélection de patient invalide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Afficher la liste des médecins
    console.log("\nListe des médecins :");
    medecins.forEach((medecin, index) => {
        console.log(`${index + 1}. ${medecin.prenom} ${medecin.nom} (${medecin.specialite})`);
    });
    
    // Sélectionner un médecin
    const medecinIndex = parseInt(readline.question("\nSélectionnez un médecin (numéro) : ")) - 1;
    if (isNaN(medecinIndex) || medecinIndex < 0 || medecinIndex >= medecins.length) {
        console.log("Erreur : Sélection de médecin invalide.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Demander la date (format JJ/MM/AAAA)
    const dateStr = readline.question("\nDate (JJ/MM/AAAA) : ");
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(dateStr)) {
        console.log("Erreur : Format de date invalide. Utilisez le format JJ/MM/AAAA.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const [, jour, mois, annee] = dateStr.match(dateRegex) || [];
    const date = new Date(parseInt(annee), parseInt(mois) - 1, parseInt(jour));
    
    // Vérifier si la date est valide (pas dans le passé)
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    if (date < aujourdhui) {
        console.log("Erreur : La date ne peut pas être dans le passé.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Demander l'heure (format HH:MM)
    const heureStr = readline.question("Heure (HH:MM) : ");
    const heureRegex = /^(\d{2}):(\d{2})$/;
    if (!heureRegex.test(heureStr)) {
        console.log("Erreur : Format d'heure invalide. Utilisez le format HH:MM.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    const [, heures, minutes] = heureStr.match(heureRegex) || [];
    const heure = new Date(date);
    heure.setHours(parseInt(heures), parseInt(minutes));
    
    // Vérifier si l'heure est valide (entre 8h et 18h)
    if (parseInt(heures) < 8 || parseInt(heures) >= 18) {
        console.log("Erreur : L'heure doit être entre 8h00 et 18h00.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier si le médecin est déjà occupé à cette heure
    if (service.medecinOccupe(medecins[medecinIndex].id, date, heure)) {
        console.log("Erreur : Le médecin est déjà occupé à cette heure.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier si le patient a déjà un rendez-vous à cette heure
    if (service.patientOccupe(patients[patientIndex].id, date, heure)) {
        console.log("Erreur : Le patient a déjà un rendez-vous à cette heure.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Vérifier si le patient a déjà un rendez-vous le même jour
    if (service.nombreRendezVousPatientJour(patients[patientIndex].id, date) >= 2) {
        console.log("Erreur : Le patient a déjà 2 rendez-vous ce jour-là. Maximum 2 rendez-vous par jour.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        retourMenu();
        return null;
    }
    
    // Créer et retourner le rendez-vous
    const nouveauRendezVous = new RendezVous(
        patients[patientIndex],
        medecins[medecinIndex],
        date,
        heure
    );
    
    console.log(`\nRendez-vous ajouté avec succès pour ${patients[patientIndex].prenom} ${patients[patientIndex].nom} avec Dr. ${medecins[medecinIndex].prenom} ${medecins[medecinIndex].nom} le ${date.toLocaleDateString('fr-FR')} à ${heure.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`);
    console.log("\nAppuyez sur Entrée pour continuer...");
    readline.question("");
    
    return nouveauRendezVous;
};

// Fonction pour quitter l'application
export const quitter = () => {
    console.clear();
    console.log("Merci d'avoir utilisé l'application. À bientôt !");
    process.exit(0);
};

// Fonction pour afficher le message de bienvenue
export const bienvenue = () => {
    console.log("Bienvenue dans l'application de gestion de cabinet médical.\n");
};