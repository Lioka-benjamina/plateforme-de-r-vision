-- ============================================================
-- Schema complet de la plateforme éducative
-- PostgreSQL
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'professor', 'student', 'parent');
CREATE TYPE user_status AS ENUM ('active', 'pending', 'suspended');
CREATE TYPE course_status AS ENUM ('draft', 'pending', 'published', 'rejected', 'archived');
CREATE TYPE lesson_type AS ENUM ('video', 'pdf', 'image', 'text', 'embed');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'single_choice', 'true_false', 'text');
CREATE TYPE signal_status AS ENUM ('pending', 'approved', 'rejected', 'escalated');
CREATE TYPE signal_target AS ENUM ('course', 'lesson', 'comment', 'user');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error');

-- ============================================================
-- TABLES
-- ============================================================

-- Utilisateurs
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    nom             VARCHAR(100) NOT NULL,
    prenom          VARCHAR(100) NOT NULL,
    role            user_role NOT NULL DEFAULT 'student',
    status          user_status NOT NULL DEFAULT 'pending',
    avatar          VARCHAR(500),
    phone           VARCHAR(50),
    bio             TEXT,
    email_verified  BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Catégories / Matières
CREATE TABLE categories (
    id          SERIAL PRIMARY KEY,
    nom         VARCHAR(150) NOT NULL,
    description TEXT,
    icon        VARCHAR(50),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Cours
CREATE TABLE courses (
    id              SERIAL PRIMARY KEY,
    titre           VARCHAR(255) NOT NULL,
    description     TEXT,
    niveau          VARCHAR(50) DEFAULT 'debutant',
    duree           INTEGER DEFAULT 0, -- en minutes
    prix            DECIMAL(10,2) DEFAULT 0,
    image           VARCHAR(500),
    category_id     INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    professor_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status          course_status NOT NULL DEFAULT 'draft',
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Leçons
CREATE TABLE lessons (
    id          SERIAL PRIMARY KEY,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    titre       VARCHAR(255) NOT NULL,
    contenu     TEXT,
    type        lesson_type NOT NULL DEFAULT 'text',
    ordre       INTEGER NOT NULL DEFAULT 0,
    duree       INTEGER DEFAULT 0, -- en minutes
    url         VARCHAR(500),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Progression des leçons
CREATE TABLE lesson_completions (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id   INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Quiz
CREATE TABLE quizzes (
    id          SERIAL PRIMARY KEY,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id   INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
    titre       VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit  INTEGER DEFAULT 0, -- en minutes, 0 = illimité
    pass_score  INTEGER DEFAULT 50, -- pourcentage pour réussir
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
    id          SERIAL PRIMARY KEY,
    quiz_id     INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question    TEXT NOT NULL,
    type        question_type NOT NULL DEFAULT 'single_choice',
    points      INTEGER DEFAULT 1,
    ordre       INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Options de réponses
CREATE TABLE question_options (
    id          SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct  BOOLEAN NOT NULL DEFAULT false,
    ordre       INTEGER NOT NULL DEFAULT 0
);

-- Tentatives de quiz
CREATE TABLE quiz_attempts (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id     INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score       INTEGER NOT NULL DEFAULT 0,
    total       INTEGER NOT NULL DEFAULT 0,
    passed      BOOLEAN DEFAULT false,
    started_at  TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Inscriptions aux cours
CREATE TABLE enrollments (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    progress    INTEGER DEFAULT 0, -- pourcentage
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- Certificats
CREATE TABLE certificates (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    code        VARCHAR(50) UNIQUE NOT NULL,
    issued_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Signalements
CREATE TABLE signals (
    id              SERIAL PRIMARY KEY,
    target_type     signal_target NOT NULL,
    target_id       INTEGER NOT NULL,
    reported_by     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason          TEXT NOT NULL,
    description     TEXT,
    status          signal_status NOT NULL DEFAULT 'pending',
    handled_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
    handled_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    message     TEXT,
    type        notification_type DEFAULT 'info',
    link        VARCHAR(500),
    is_read     BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Annonces (professeur -> étudiants)
CREATE TABLE announcements (
    id          SERIAL PRIMARY KEY,
    course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    professor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_courses_professor ON courses(professor_id);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_lessons_course ON lessons(course_id);
CREATE INDEX idx_lessons_ordre ON lessons(course_id, ordre);
CREATE INDEX idx_quizzes_course ON quizzes(course_id);
CREATE INDEX idx_questions_quiz ON questions(quiz_id);
CREATE INDEX idx_question_options_question ON question_options(question_id);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id, quiz_id);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_signals_status ON signals(status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_announcements_course ON announcements(course_id);
CREATE INDEX idx_lesson_completions_user ON lesson_completions(user_id);
CREATE INDEX idx_lesson_completions_lesson ON lesson_completions(lesson_id);

-- ============================================================
-- TRIGGERS : updated_at automatique
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
