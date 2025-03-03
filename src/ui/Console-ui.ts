/**
 * Module principal de l'interface console
 * Ce fichier a été refactorisé pour améliorer la lisibilité et la maintenabilité
 */
import { CabinetService } from "../services/CabinetService.js";
import { 
    afficherMenu, 
    afficherPatients, 
    afficherMedecins, 
    afficherRendezVous,
    bienvenue,
    quitter
} from "./components/display.js";
import {
    saisirPatient,
    saisirMedecin,
    saisirRendezVous
} from "./components/input.js";

// Exporter toutes les fonctions pour maintenir la compatibilité avec le code existant
export {
    afficherMenu,
    afficherPatients,
    afficherMedecins,
    afficherRendezVous,
    saisirPatient,
    saisirMedecin,
    saisirRendezVous,
    quitter,
    bienvenue
};
