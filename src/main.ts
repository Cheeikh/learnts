import { CabinetService } from "./services/CabinetService.js";
import * as ConsoleUI from "./ui/Console-ui.js";
import * as readline from "readline-sync";

// Classe principale de l'application
class Application {
    private service: CabinetService;
    private actionHandlers: Map<number, () => void>;
    
    constructor() {
        this.service = new CabinetService();
        
        // Initialiser les gestionnaires d'actions avec une Map
        this.actionHandlers = new Map([
            [1, () => this.ajouterPatient()],
            [2, () => this.ajouterMedecin()],
            [3, () => this.ajouterRendezVous()],
            [4, () => ConsoleUI.afficherPatients(this.service, () => this.afficherMenu())],
            [5, () => ConsoleUI.afficherMedecins(this.service, () => this.afficherMenu())],
            [6, () => ConsoleUI.afficherRendezVous(this.service, () => this.afficherMenu())],
            [7, () => ConsoleUI.quitter(this.service)]
        ]);
    }
    
    // Démarrer l'application
    public demarrer(): void {
        ConsoleUI.bienvenue();
        this.afficherMenu();
    }
    
    // Fonction principale pour afficher le menu et traiter les choix
    private afficherMenu(): void {
        const choixStr = ConsoleUI.afficherMenu(this.service);
        const choix = parseInt(choixStr);
        this.traiterChoix(choix);
    }
    
    // Fonction pour traiter le choix de l'utilisateur
    private traiterChoix(choix: number): void {
        // Utiliser la Map pour exécuter l'action correspondante au choix
        const action = this.actionHandlers.get(choix);
        
        if (action) {
            action();
        } else {
            this.gererChoixInvalide();
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