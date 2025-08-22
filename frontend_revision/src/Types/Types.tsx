
export interface User {
  id: number;
  nom: string;
  role: "ELEVE" | "PROF" | "ADMIN" | "PARENT";
  parent_id?: number; // si rôle = ELEVE, lien vers parent
}

export interface Matiere {
  id: number;
  nom: string;
}

export interface Cours {
  id: number;
  titre: string;
  contenu: string;
  matiere_id: number;
  auteur_id: number; // Prof
  valide: boolean;
  date_publication: string;
}

export interface Ressource {
  id: number;
  type: "pdf" | "video" | "image" | "audio" | "doc";
  url: string;
  description: string;
  cours_id: number;
  auteur_id: number;
}

export interface Quiz {
  id: number;
  titre: string;
  description: string;
  type: "entrainement" | "examen";
  temps_limite: number;
  cours_id: number;
  auteur_id: number;
}

export interface Question {
  id: number;
  intitule: string;
  quiz_id: number;
}

export interface Option {
  id: number;
  texte: string;
  est_correct: boolean;
  question_id: number;
}

export interface ResultatQuiz {
  id: number;
  eleve_id: number;
  quiz_id: number;
  score: number;
  date_passage: string;
}

export interface Badge {
  id: number;
  nom: string;
  description: string;
  condition: string;
}

export interface EleveBadge {
  eleve_id: number;
  badge_id: number;
  date_obtention: string;
}

export interface Classement {
  id: number;
  matiere_id: number;
  eleve_id: number;
  score_total: number;
  rang: number;
}

export interface Mission {
  id: number;
  description: string;
  matiere_id?: number;
  date: string;
}

export interface Objectif {
  id: number;
  parent_id: number;
  eleve_id: number;
  description: string;
  atteint: boolean;
}

export interface Notification {
  id: number;
  enfant_id: number;
  parent_id: number;
  message: string;
  date: string;
}

//Services
export interface services {
  id: number,
  titre: string
  description: string
}
