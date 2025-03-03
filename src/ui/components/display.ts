/**
 * Module contenant les fonctions d'affichage pour l'interface console
 */
import * as readline from "readline-sync";
import { CabinetService } from "../../services/CabinetService.js";

/**
 * Affiche le message de bienvenue
 */
export const bienvenue = (): void => {
    console.log("Bienvenue dans l'application de gestion de cabinet medical.\n");
};

/**
 * Affiche le menu principal
 * @param service Le service de cabinet médical
 * @returns Le choix de l'utilisateur
 */
export const afficherMenu = (service: CabinetService): string => {
    console.clear();
    console.log("=== MENU PRINCIPAL ===");
    console.log("1. Ajouter un patient");
    console.log("2. Ajouter un medecin");
    console.log("3. Ajouter un rendez-vous");
    console.log("4. Afficher les patients");
    console.log("5. Afficher les medecins");
    console.log("6. Afficher les rendez-vous");
    console.log("7. Quitter");
    
    const choix = readline.question("\nVotre choix : ");
    return choix;
};

/**
 * Affiche la liste des patients
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 */
export const afficherPatients = (service: CabinetService, retourMenu: () => void): void => {
    console.clear();
    console.log("\n=== Liste des patients ===");
    const patients = service.getPatients();
    if (patients.length === 0) {
        console.log("Aucun patient enregistre.");
    } else {
        patients.forEach(patient => {
            console.log(`ID: ${patient.id} | Nom: ${patient.nom} | Prenom: ${patient.prenom} | Telephone: ${patient.telephone} | Adresse: ${patient.adresse}`);
        });
    }
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    retourMenu();
};

/**
 * Affiche la liste des médecins
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 */
export const afficherMedecins = (service: CabinetService, retourMenu: () => void): void => {
    console.clear();
    console.log("\n=== Liste des medecins ===");
    const medecins = service.getMedecins();
    if (medecins.length === 0) {
        console.log("Aucun medecin enregistre.");
    } else {
        medecins.forEach(medecin => {
            console.log(`ID: ${medecin.id} | Nom: ${medecin.nom} | Prenom: ${medecin.prenom} | Specialite: ${medecin.specialite}`);
        });
    }
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    retourMenu();
};

/**
 * Affiche la liste des rendez-vous
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 */
export const afficherRendezVous = (service: CabinetService, retourMenu: () => void): void => {
    console.clear();
    console.log("\n=== Liste des rendez-vous ===");
    const rendezVous = service.getRendezVous();
    if (rendezVous.length === 0) {
        console.log("Aucun rendez-vous enregistre.");
    } else {
        const rendezVousTries = [...rendezVous].sort((a, b) => {
            if (a.date.getTime() !== b.date.getTime()) {
                return a.date.getTime() - b.date.getTime();
            }
            return a.heure.localeCompare(b.heure);
        });

        rendezVousTries.forEach(rdv => {
            const dateFormatee = rdv.date.toLocaleDateString('fr-FR');
            console.log(`Patient: ${rdv.patient.nom} ${rdv.patient.prenom} | Medecin: ${rdv.medecin.nom} ${rdv.medecin.prenom} (${rdv.medecin.specialite}) | Date: ${dateFormatee} | Heure: ${rdv.heure}`);
        });
    }
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    retourMenu();
};

/**
 * Fonction pour quitter l'application
 * @param service Le service de cabinet médical
 */
export const quitter = (service: CabinetService): void => {
    console.clear();
    console.log("\n=== Au revoir ===");
    console.log("Merci d'avoir utilise notre application de gestion de cabinet medical.");
    console.log("Sauvegarde des donnees en cours...");
    
    // Sauvegarder les donnees avant de quitter
    service.sauvegarderDonnees();
    
    console.log("Donnees sauvegardees avec succes !");
    console.log("A bientot !");
    process.exit(0);
};
