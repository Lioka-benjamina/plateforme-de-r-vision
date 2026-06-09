-- ============================================================
-- Données initiales (seed)
-- ============================================================

-- Admin par défaut (mot de passe: admin123)
INSERT INTO users (email, password, nom, prenom, role, status, email_verified)
VALUES (
    'admin@edutrack.com',
    '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkfAjkMBcGmY6nF6G7G5n5n5n5n5O', -- bcrypt hash de "admin123"
    'Admin',
    'Super',
    'admin',
    'active',
    true
) ON CONFLICT (email) DO NOTHING;

-- Catégories initiales
INSERT INTO categories (nom, description, icon) VALUES
    ('Mathématiques', 'Cours de mathématiques pour tous les niveaux', 'calculator'),
    ('Français', 'Grammaire, littérature et expression écrite', 'book-open'),
    ('Anglais', 'Apprentissage de la langue anglaise', 'globe'),
    ('Sciences', 'Physique, chimie et biologie', 'flask'),
    ('Histoire-Géo', 'Histoire et géographie', 'map'),
    ('Informatique', 'Programmation et technologies numériques', 'monitor')
ON CONFLICT DO NOTHING;
