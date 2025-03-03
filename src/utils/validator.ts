/**
 * Fichier contenant les fonctions de validation pour l'application de gestion de cabinet médical
 */
import * as readline from 'readline-sync';

/**
 * Vérifie si une chaîne de caractères n'est pas vide
 * @param value La valeur à vérifier
 * @returns true si la valeur n'est pas vide, false sinon
 */
export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Vérifie si un numéro de téléphone est au format valide (XX XXX XX XX ou XX XXX XX XX)
 * @param telephone Le numéro de téléphone à vérifier
 * @returns true si le format est valide, false sinon
 */
export const isValidPhoneNumber = (telephone: string): boolean => {
    return telephone.trim().length > 0 && /^\d{2}( \d{3}){1,2}( \d{2}){1,2}$/.test(telephone);
};

/**
 * Vérifie si une date est au format JJ/MM/AAAA
 * @param dateStr La date à vérifier
 * @returns true si le format est valide, false sinon
 */
export const isValidDateFormat = (dateStr: string): boolean => {
    return /^(\d{2})\/(\d{2})\/(\d{4})$/.test(dateStr);
};

/**
 * Convertit une chaîne de caractères au format JJ/MM/AAAA en objet Date
 * @param dateStr La date au format JJ/MM/AAAA
 * @returns Un objet Date
 */
export const parseDate = (dateStr: string): Date => {
    const [, jour, mois, annee] = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/) || [];
    return new Date(parseInt(annee), parseInt(mois) - 1, parseInt(jour));
};

/**
 * Vérifie si une date n'est pas dans le passé
 * @param date La date à vérifier
 * @param aujourdhui Date de référence (aujourd'hui par défaut)
 * @returns true si la date n'est pas dans le passé, false sinon
 */
export const isNotPastDate = (date: Date, aujourdhui?: Date): boolean => {
    const reference = aujourdhui || new Date();
    reference.setHours(0, 0, 0, 0);
    return date >= reference;
};

/**
 * Vérifie si une heure est au format HH:MM
 * @param heureStr L'heure à vérifier
 * @returns true si le format est valide, false sinon
 */
export const isValidTimeFormat = (heureStr: string): boolean => {
    return /^(\d{2}):(\d{2})$/.test(heureStr);
};

/**
 * Vérifie si une heure est dans la plage horaire du cabinet (8h-18h)
 * @param heures L'heure à vérifier (nombre ou chaîne)
 * @returns true si l'heure est valide, false sinon
 */
export const isValidOfficeHour = (heures: number | string): boolean => {
    const heuresNum = typeof heures === 'string' ? parseInt(heures) : heures;
    return heuresNum >= 8 && heuresNum < 18;
};

/**
 * Extrait les heures et minutes d'une chaîne au format HH:MM
 * @param heureStr L'heure au format HH:MM
 * @returns Un tableau contenant les heures et minutes
 */
export const parseTime = (heureStr: string): [string, string] => {
    const [, heures, minutes] = heureStr.match(/^(\d{2}):(\d{2})$/) || [];
    return [heures, minutes];
};

/**
 * Gère l'interaction avec l'utilisateur pour une validation
 * @param message Le message d'erreur à afficher
 * @returns true si l'utilisateur veut réessayer, false s'il veut quitter
 */
export const handleValidationError = (message: string): boolean => {
    console.log(`Erreur : ${message}`);
    console.log("Appuyez sur Entree pour reessayer ou tapez 'q' pour quitter...");
    const reponse = readline.question("");
    return reponse.toLowerCase() !== 'q';
};
