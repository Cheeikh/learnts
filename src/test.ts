import { Patient } from "./model/Patient";
import { Medecin } from "./model/Medecin";
import { RendezVous } from "./model/RendezVous";

// Fonction pour afficher les données
const afficherDonnees = () => {
    // Créer des médecins
    const medecins: Medecin[] = [
        new Medecin(1, "Dupont", "Jean", "Cardiologue"),
        new Medecin(2, "Martin", "Sophie", "Pédiatre"),
        new Medecin(3, "Dubois", "Pierre", "Généraliste")
    ];

    // Créer des patients
    const patients: Patient[] = [
        new Patient(1, "Traoré", "Mamadou", "77 123 45 67", "Dakar, Sacré-Cœur"),
        new Patient(2, "Diallo", "Fatou", "76 987 65 43", "Dakar, Médina"),
        new Patient(3, "Sow", "Abdoulaye", "70 456 78 90", "Dakar, Yoff")
    ];

    // Créer des rendez-vous
    const rendezVous: RendezVous[] = [
        new RendezVous(
            patients[0],
            medecins[0],
            new Date(2025, 2, 15),
            new Date(2025, 2, 15, 10, 30)
        ),
        new RendezVous(
            patients[1],
            medecins[1],
            new Date(2025, 2, 16),
            new Date(2025, 2, 16, 14, 0)
        )
    ];

    // Afficher les médecins
    console.log("\n=== Liste des médecins ===");
    medecins.forEach(medecin => {
        console.log(`ID: ${medecin.id} | Nom: ${medecin.nom} | Prénom: ${medecin.prenom} | Spécialité: ${medecin.specialite}`);
    });

    // Afficher les patients
    console.log("\n=== Liste des patients ===");
    patients.forEach(patient => {
        console.log(`ID: ${patient.id} | Nom: ${patient.nom} | Prénom: ${patient.prenom} | Téléphone: ${patient.telephone} | Adresse: ${patient.adresse}`);
    });

    // Afficher les rendez-vous
    console.log("\n=== Liste des rendez-vous ===");
    rendezVous.forEach(rdv => {
        const dateFormatee = rdv.date.toLocaleDateString('fr-FR');
        const heureFormatee = rdv.heure.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        console.log(`Patient: ${rdv.patient.nom} ${rdv.patient.prenom} | Médecin: ${rdv.medecin.nom} ${rdv.medecin.prenom} (${rdv.medecin.specialite}) | Date: ${dateFormatee} | Heure: ${heureFormatee}`);
    });
};

// Exécuter la fonction d'affichage
afficherDonnees();
