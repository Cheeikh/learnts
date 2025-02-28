import { CabinetService } from "./services/CabinetService";
import * as ConsoleUI from "./ui/Console-ui";
import * as readline from "readline-sync";

// Classe principale de l'application
class Application {
    private service: CabinetService;
    
    constructor() {
        this.service = new CabinetService();
    }
    
    // Démarrer l'application
    public demarrer(): void {
        ConsoleUI.bienvenue();
        this.afficherMenu();
    }
    
    // Fonction principale pour afficher le menu et traiter les choix
    private afficherMenu(): void {
        const choix = ConsoleUI.afficherMenu(this.service);
        this.traiterChoix(choix);
    }
    
    // Fonction pour traiter le choix de l'utilisateur
    private traiterChoix(choix: number): void {
        switch (choix) {
            case 1: // Ajouter un patient
                this.ajouterPatient();
                break;
            case 2: // Ajouter un médecin
                this.ajouterMedecin();
                break;
            case 3: // Ajouter un rendez-vous
                this.ajouterRendezVous();
                break;
            case 4: // Afficher les patients
                ConsoleUI.afficherPatients(this.service, () => this.afficherMenu());
                break;
            case 5: // Afficher les médecins
                ConsoleUI.afficherMedecins(this.service, () => this.afficherMenu());
                break;
            case 6: // Afficher les rendez-vous
                ConsoleUI.afficherRendezVous(this.service, () => this.afficherMenu());
                break;
            case 7: // Quitter
                ConsoleUI.quitter();
                break;
            default:
                this.gererChoixInvalide();
                break;
        }
    }
    
    // Fonctions d'ajout
    private ajouterPatient(): void {
        const nouveauPatient = ConsoleUI.saisirPatient(this.service, () => this.afficherMenu());
        if (nouveauPatient) {
            this.service.ajouterPatient(nouveauPatient);
        }
        this.afficherMenu();
    }
    
    private ajouterMedecin(): void {
        const nouveauMedecin = ConsoleUI.saisirMedecin(this.service, () => this.afficherMenu());
        if (nouveauMedecin) {
            this.service.ajouterMedecin(nouveauMedecin);
        }
        this.afficherMenu();
    }
    
    private ajouterRendezVous(): void {
        const nouveauRendezVous = ConsoleUI.saisirRendezVous(this.service, () => this.afficherMenu());
        if (nouveauRendezVous) {
            this.service.ajouterRendezVous(nouveauRendezVous);
        }
        this.afficherMenu();
    }
    
    // Gestion des erreurs
    private gererChoixInvalide(): void {
        console.log("Choix invalide. Veuillez réessayer.");
        console.log("\nAppuyez sur Entrée pour continuer...");
        readline.question("");
        this.afficherMenu();
    }
}

// Créer et démarrer l'application
const app = new Application();
app.demarrer();