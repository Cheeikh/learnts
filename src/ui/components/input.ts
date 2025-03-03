/**
 * Module contenant les fonctions de saisie pour l'interface console
 */
import * as readline from "readline-sync";
import { Patient } from "../../model/Patient.js";
import { Medecin } from "../../model/Medecin.js";
import { RendezVous } from "../../model/RendezVous.js";
import { CabinetService } from "../../services/CabinetService.js";
import { handleValidationError } from "../../utils/validator.js";
import { 
    demanderEntreeNonVide, 
    demanderTelephone, 
    demanderDate, 
    demanderHeure,
    demanderSelection
} from "./input-utils.js";

/**
 * Fonction pour ajouter un patient
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 * @returns Le patient créé ou null si l'utilisateur annule
 */
export const saisirPatient = (service: CabinetService, retourMenu: () => void): Patient | null => {
    console.clear();
    console.log("\n=== Ajouter un patient ===");
    
    // Générer un nouvel ID
    const nouvelId = service.genererNouvelIdPatient();
    
    // Demander les informations du patient
    const nom = demanderEntreeNonVide("Nom : ", "Le nom ne peut pas etre vide.", retourMenu);
    if (nom === null) return null;
    
    const prenom = demanderEntreeNonVide("Prenom : ", "Le prenom ne peut pas etre vide.", retourMenu);
    if (prenom === null) return null;
    
    // Vérifier l'unicité du nom et prénom
    if (service.patientExiste(nom, prenom)) {
        if (!handleValidationError(`Un patient avec le nom "${prenom} ${nom}" existe deja.`)) {
            retourMenu();
            return null;
        }
        return saisirPatient(service, retourMenu); // Recommencer la saisie
    }
    
    const telephone = demanderTelephone(retourMenu);
    if (telephone === null) return null;
    
    // Vérifier l'unicité du numéro de téléphone
    if (service.telephoneExiste(telephone)) {
        if (!handleValidationError(`Un patient avec le numero de telephone "${telephone}" existe deja.`)) {
            retourMenu();
            return null;
        }
        return saisirPatient(service, retourMenu); // Recommencer la saisie
    }
    
    const adresse = demanderEntreeNonVide("Adresse : ", "L'adresse ne peut pas etre vide.", retourMenu);
    if (adresse === null) return null;
    
    // Créer et retourner le patient
    const nouveauPatient = new Patient(nouvelId, nom, prenom, telephone, adresse);
    
    console.log(`\nPatient ${prenom} ${nom} ajoute avec succes !`);
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    
    return nouveauPatient;
};

/**
 * Fonction pour ajouter un médecin
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 * @returns Le médecin créé ou null si l'utilisateur annule
 */
export const saisirMedecin = (service: CabinetService, retourMenu: () => void): Medecin | null => {
    console.clear();
    console.log("\n=== Ajouter un medecin ===");
    
    // Générer un nouvel ID
    const nouvelId = service.genererNouvelIdMedecin();
    
    // Demander les informations du médecin
    const nom = demanderEntreeNonVide("Nom : ", "Le nom ne peut pas etre vide.", retourMenu);
    if (nom === null) return null;
    
    const prenom = demanderEntreeNonVide("Prenom : ", "Le prenom ne peut pas etre vide.", retourMenu);
    if (prenom === null) return null;
    
    // Vérifier l'unicité du nom et prénom
    if (service.medecinExiste(nom, prenom)) {
        if (!handleValidationError(`Un medecin avec le nom "${prenom} ${nom}" existe deja.`)) {
            retourMenu();
            return null;
        }
        return saisirMedecin(service, retourMenu); // Recommencer la saisie
    }
    
    const specialite = demanderEntreeNonVide("Specialite : ", "La specialite ne peut pas etre vide.", retourMenu);
    if (specialite === null) return null;
    
    // Créer et retourner le médecin
    const nouveauMedecin = new Medecin(nouvelId, nom, prenom, specialite);
    
    console.log(`\nMedecin ${prenom} ${nom} (${specialite}) ajoute avec succes !`);
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    
    return nouveauMedecin;
};

/**
 * Fonction pour ajouter un rendez-vous
 * @param service Le service de cabinet médical
 * @param retourMenu Fonction de retour au menu
 * @returns Le rendez-vous créé ou null si l'utilisateur annule
 */
export const saisirRendezVous = (service: CabinetService, retourMenu: () => void): RendezVous | null => {
    console.clear();
    console.log("\n=== Ajouter un rendez-vous ===");
    
    const patients = service.getPatients();
    const medecins = service.getMedecins();
    
    // Vérifier s'il y a des patients et des médecins
    if (patients.length === 0) {
        handleValidationError("Aucun patient enregistre. Veuillez d'abord ajouter un patient.");
        retourMenu();
        return null;
    }
    
    if (medecins.length === 0) {
        handleValidationError("Aucun medecin enregistre. Veuillez d'abord ajouter un medecin.");
        retourMenu();
        return null;
    }
    
    // Afficher la liste des patients
    console.log("\nListe des patients :");
    patients.forEach((patient, index) => {
        console.log(`${index + 1}. ${patient.prenom} ${patient.nom}`);
    });
    
    // Sélectionner un patient
    const patientIndex = demanderSelection(
        patients,
        "\nSelectionnez un patient (numero) : ",
        "Selection de patient invalide.",
        retourMenu
    );
    if (patientIndex === null) return null;
    
    // Afficher la liste des médecins
    console.log("\nListe des medecins :");
    medecins.forEach((medecin, index) => {
        console.log(`${index + 1}. ${medecin.prenom} ${medecin.nom} (${medecin.specialite})`);
    });
    
    // Sélectionner un médecin
    const medecinIndex = demanderSelection(
        medecins,
        "\nSelectionnez un medecin (numero) : ",
        "Selection de medecin invalide.",
        retourMenu
    );
    if (medecinIndex === null) return null;
    
    // Processus de sélection de date et heure avec vérification des disponibilités
    let dateHeure = demanderDateHeureDisponible(
        service,
        patients[patientIndex],
        medecins[medecinIndex],
        retourMenu
    );
    if (dateHeure === null) return null;
    
    // Créer et retourner le rendez-vous
    const nouveauRendezVous = new RendezVous(
        patients[patientIndex],
        medecins[medecinIndex],
        dateHeure.date,
        `${dateHeure.heures}:${dateHeure.minutes}`
    );
    
    console.log(`\nRendez-vous ajoute avec succes pour ${patients[patientIndex].prenom} ${patients[patientIndex].nom} avec Dr. ${medecins[medecinIndex].prenom} ${medecins[medecinIndex].nom} le ${dateHeure.date.toLocaleDateString('fr-FR')} a ${dateHeure.heureStr}`);
    console.log("\nAppuyez sur Entree pour continuer...");
    readline.question("");
    
    return nouveauRendezVous;
};

/**
 * Fonction pour demander une date et une heure disponible pour un rendez-vous
 * @param service Le service de cabinet médical
 * @param patient Le patient concerné
 * @param medecin Le médecin concerné
 * @param retourMenu Fonction de retour au menu
 * @returns Les informations de date et heure ou null si l'utilisateur annule
 */
const demanderDateHeureDisponible = (
    service: CabinetService,
    patient: Patient,
    medecin: Medecin,
    retourMenu: () => void
): { date: Date, heureStr: string, heures: string, minutes: string } | null => {
    let disponibiliteValide = false;
    let dateInfo = null;
    let heureInfo = null;
    
    do {
        // Demander la date
        if (dateInfo === null) {
            dateInfo = demanderDate(retourMenu);
            if (dateInfo === null) return null;
        }
        
        // Demander l'heure
        if (heureInfo === null) {
            heureInfo = demanderHeure(retourMenu);
            if (heureInfo === null) return null;
        }
        
        // À ce stade, dateInfo et heureInfo ne peuvent plus être null
        // Vérifier si le médecin est déjà occupé à cette heure
        if (!service.medecinDisponible(medecin.id, dateInfo.date, `${heureInfo.heures}:${heureInfo.minutes}`)) {
            if (!handleValidationError("Le medecin est deja occupe a cette heure.")) {
                retourMenu();
                return null;
            }
            // Demander une nouvelle date et heure
            dateInfo = null;
            heureInfo = null;
            continue;
        }
        
        // Vérifier si le patient a déjà un rendez-vous à cette heure
        if (service.rendezVousExiste(patient.id, medecin.id, dateInfo.date, `${heureInfo.heures}:${heureInfo.minutes}`)) {
            if (!handleValidationError("Le patient a deja un rendez-vous a cette heure.")) {
                retourMenu();
                return null;
            }
            // Demander une nouvelle date et heure
            dateInfo = null;
            heureInfo = null;
            continue;
        }
        
        // Vérifier si le patient a déjà 2 rendez-vous le même jour
        if (service.nombreRendezVousPatientParJour(patient.id, dateInfo.date) >= 2) {
            if (!handleValidationError("Le patient a deja 2 rendez-vous ce jour-la. Maximum 2 rendez-vous par jour.")) {
                retourMenu();
                return null;
            }
            // Demander une nouvelle date
            dateInfo = null;
            continue;
        }
        
        // Si on arrive ici, toutes les vérifications sont passées
        disponibiliteValide = true;
        
    } while (!disponibiliteValide);
    
    // À ce stade, nous savons que dateInfo et heureInfo ne sont pas null
    // TypeScript ne le sait pas, donc nous faisons une vérification explicite
    if (dateInfo === null || heureInfo === null) {
        // Ce cas ne devrait jamais se produire, mais TypeScript l'exige
        return null;
    }
    
    return {
        date: dateInfo.date,
        heureStr: heureInfo.heureStr,
        heures: heureInfo.heures,
        minutes: heureInfo.minutes
    };
};
