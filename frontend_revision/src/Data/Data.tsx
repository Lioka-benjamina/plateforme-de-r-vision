import type { Badge, Classement, Cours, EleveBadge, Matiere, Mission, Notification, Objectif, Option, Question, Quiz, Ressource, ResultatQuiz, services, Temoignage, User } from "../Types/Types";


// Utilisateurs
export const users: User[] = [
    { id: 1, nom: "Alice", role: "PROF" },
    { id: 2, nom: "Bob", role: "ELEVE", parent_id: 4 },
    { id: 3, nom: "Claire", role: "ADMIN" },
    { id: 4, nom: "David", role: "PARENT" }
];

// Matières
export const matieres: Matiere[] = [
    { id: 1, nom: "Mathématiques" },
    { id: 2, nom: "Physique" },
    { id: 3, nom: "S.V.T" },
    { id: 4, nom: "Histoire géographie" },
    { id: 5, nom: "Français" },
    { id: 6, nom: "Develepement web" }
];

// Cours
export const cours: Cours[] = [
    {
        id: 1,
        titre: "Les équations du 1er degré",
        contenu: "Introduction aux équations simples...",
        matiere_id:
        {
            id: 1,
            nom: "Mathématiques"
        },
        auteur_id: {
            id: 1,
            nom: "Alice"
        },
        valide: true,
        date_publication: "2025-08-01"
    },
    {
        id: 2,
        titre: "Les lois de Newton",
        contenu: "Comprendre les forces et le mouvement...",
        matiere_id:
        {
            id: 2,
            nom: "Physiques"
        },
        auteur_id: {
            id: 1,
            nom: "Alice"
        },
        valide: true,
        date_publication: "2025-08-02"
    },
    {
        id: 3,
        titre: "La cellule et ses fonctions",
        contenu: "Découverte des cellules vivantes...",
        matiere_id:
        {
            id: 3,
            nom: "S.V.T"
        },
        auteur_id: {
            id: 1,
            nom: "Alice"
        },
        valide: true,
        date_publication: "2025-08-03"
    },
    {
        id: 4,
        titre: "Les grandes civilisations",
        contenu: "Un voyage à travers l'histoire...",
        matiere_id:
        {
            id: 4,
            nom: "Histoire géographie"
        },
        auteur_id: {
            id: 1,
            nom: "Alice"
        },
        valide: true,
        date_publication: "2025-08-04"
    },
    {
        id: 5,
        titre: "La poésie française",
        contenu: "Analyse des grands poètes...",
        matiere_id:
        {
            id: 5,
            nom: "Français"
        },
        auteur_id: {
            id: 1,
            nom: "Alice"
        },
        valide: true,
        date_publication: "2025-08-05"
    }
];

// Ressources
export const ressources: Ressource[] = [
    {
        id: 1,
        type: "pdf",
        url: "/docs/equations.pdf",
        description: "Support de cours en PDF",
        cours_id: 1,
        auteur_id: 1
    }
];

// Quiz
export const quiz: Quiz[] = [
    {
        id: 1,
        titre: "Quiz équations",
        description: "Petit test sur les équations",
        type: "entrainement",
        temps_limite: 15,
        cours_id: 1,
        auteur_id: 1
    }
];

// Questions
export const questions: Question[] = [
    { id: 1, intitule: "Résoudre x + 2 = 5", quiz_id: 1 }
];

// Options
export const options: Option[] = [
    { id: 1, texte: "x = 3", est_correct: true, question_id: 1 },
    { id: 2, texte: "x = 5", est_correct: false, question_id: 1 }
];

// Résultats quiz
export const resultats: ResultatQuiz[] = [
    { id: 1, eleve_id: 2, quiz_id: 1, score: 100, date_passage: "2025-08-15" }
];

// Badges
export const badges: Badge[] = [
    { id: 1, nom: "Math Genius", description: "Score > 90% sur 5 quiz", condition: "score > 90% sur 5 quiz" }
];

export const eleveBadges: EleveBadge[] = [
    { eleve_id: 2, badge_id: 1, date_obtention: "2025-08-16" }
];

// Classement
export const classements: Classement[] = [
    { id: 1, matiere_id: 1, eleve_id: 2, score_total: 250, rang: 1 }
];

// Missions
export const missions: Mission[] = [
    { id: 1, description: "Faire 3 quiz de math", matiere_id: 1, date: "2025-08-18" }
];

// Objectifs
export const objectifs: Objectif[] = [
    { id: 1, parent_id: 4, eleve_id: 2, description: "Atteindre 80% en math", atteint: false }
];

// Notifications
export const Notifications: Notification[] = [
    { id: 1, enfant_id: 2, parent_id: 4, message: "Nouvel examen disponible", date: "2025-08-17" }
];

//Services
export const ServicesDetails: services[] = [
    {
        id: 1,
        titre: "Cours Interactifs",
        description: "Apprenez avec des leçons engageantes, des exercices pratiques et des retours immédiats pour maîtriser chaque concept.",
        
    },
    {
        id: 2,
        titre: "Leçons Complètes",
        description: "Accédez à des leçons détaillées couvrant tous les aspects de chaque matière, avec des exemples et des exercices.",
       
    },
    {
        id: 3,
        titre: "Exercices chronometré",
        description: "Testez vos connaissances avec des exercices chronométrés pour améliorer votre rapidité et votre précision.",
        
    }
];

// Temoignages
export const Temoignages: Temoignage[] = [
    {
        id: 1,
        image : "../assets/images/banner-1.png",
        nom: "Jean R.",
        message: "MyRévision a transformé ma façon d'apprendre. Les cours sont clairs et accessibles."
    },
    {
        id: 2,
        image : "../assets/images/banner-2.png",
        nom: "Marie L.",
        message: "Grâce à MyRévision, j'ai pu améliorer mes compétences et réussir mes examens avec confiance."
    },
    {
        id: 3,
        image : "../assets/images/banner-3.png",
        nom: "Paul D.",
        message: "La flexibilité des cours en ligne m'a permis d'apprendre à mon propre rythme, où que je sois."
    }
]