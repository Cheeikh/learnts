/**
 * Module contenant des utilitaires pour la saisie utilisateur
 */
import * as readline from "readline-sync";
import { 
    isNotEmpty, 
    isValidPhoneNumber, 
    isValidDateFormat, 
    parseDate, 
    isNotPastDate, 
    isValidTimeFormat, 
    isValidOfficeHour, 
    parseTime, 
    handleValidationError 
} from "../../utils/validator.js";

/**
 * Demande une entrée non vide à l'utilisateur
 * @param prompt Le message à afficher
 * @param errorMessage Le message d'erreur en cas d'entrée vide
 * @param retourMenu Fonction de retour au menu
 * @returns La valeur saisie ou null si l'utilisateur quitte
 */
export const demanderEntreeNonVide = (
    prompt: string, 
    errorMessage: string, 
    retourMenu: () => void
): string | null => {
    let valeur = readline.question(prompt);
    while (!isNotEmpty(valeur)) {
        if (!handleValidationError(errorMessage)) {
            retourMenu();
            return null;
        }
        valeur = readline.question(prompt);
    }
    return valeur;
};

/**
 * Demande un numéro de téléphone valide à l'utilisateur
 * @param retourMenu Fonction de retour au menu
 * @returns Le numéro de téléphone ou null si l'utilisateur quitte
 */
export const demanderTelephone = (retourMenu: () => void): string | null => {
    let telephone = readline.question("Telephone : ");
    while (!isValidPhoneNumber(telephone)) {
        if (!handleValidationError("Le telephone doit etre au format 'XX XXX XX XX' ou 'XX XXX XX XX'.")) {
            retourMenu();
            return null;
        }
        telephone = readline.question("Telephone : ");
    }
    return telephone;
};

/**
 * Demande une date valide à l'utilisateur
 * @param retourMenu Fonction de retour au menu
 * @returns Un objet contenant la date et la chaîne de date, ou null si l'utilisateur quitte
 */
export const demanderDate = (
    retourMenu: () => void,
    prefixe: string = ""
): { date: Date, dateStr: string } | null => {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    
    let dateStr: string;
    let date: Date = new Date();
    let dateValide = false;
    
    do {
        dateStr = readline.question(`${prefixe}Date (JJ/MM/AAAA) : `);
        if (!isValidDateFormat(dateStr)) {
            if (!handleValidationError("Format de date invalide. Utilisez le format JJ/MM/AAAA.")) {
                retourMenu();
                return null;
            }
            continue;
        }
        
        date = parseDate(dateStr);
        
        if (!isNotPastDate(date, aujourdhui)) {
            if (!handleValidationError("La date ne peut pas etre dans le passe.")) {
                retourMenu();
                return null;
            }
        } else {
            dateValide = true;
        }
    } while (!dateValide);
    
    return { date, dateStr };
};

/**
 * Demande une heure valide à l'utilisateur
 * @param retourMenu Fonction de retour au menu
 * @returns Un objet contenant l'heure, les heures et les minutes, ou null si l'utilisateur quitte
 */
export const demanderHeure = (
    retourMenu: () => void,
    prefixe: string = ""
): { heureStr: string, heures: string, minutes: string } | null => {
    let heureStr: string;
    let heures: string = "00";
    let minutes: string = "00";
    let heureValide = false;
    
    do {
        heureStr = readline.question(`${prefixe}Heure (HH:MM) : `);
        if (!isValidTimeFormat(heureStr)) {
            if (!handleValidationError("Format d'heure invalide. Utilisez le format HH:MM.")) {
                retourMenu();
                return null;
            }
            continue;
        }
        
        [heures, minutes] = parseTime(heureStr);
        
        if (!isValidOfficeHour(parseInt(heures))) {
            if (!handleValidationError("L'heure doit etre entre 8h00 et 18h00.")) {
                retourMenu();
                return null;
            }
        } else {
            heureValide = true;
        }
    } while (!heureValide);
    
    return { heureStr, heures, minutes };
};

/**
 * Demande à l'utilisateur de sélectionner un élément dans une liste
 * @param items Liste des éléments
 * @param prompt Message à afficher
 * @param errorMessage Message d'erreur
 * @param retourMenu Fonction de retour au menu
 * @returns L'index de l'élément sélectionné ou null si l'utilisateur quitte
 */
export const demanderSelection = <T>(
    items: T[],
    prompt: string,
    errorMessage: string,
    retourMenu: () => void
): number | null => {
    let index: number;
    let selectionValide = false;
    
    do {
        index = parseInt(readline.question(prompt)) - 1;
        if (isNaN(index) || index < 0 || index >= items.length) {
            if (!handleValidationError(errorMessage)) {
                retourMenu();
                return null;
            }
        } else {
            selectionValide = true;
        }
    } while (!selectionValide);
    
    return index;
};
