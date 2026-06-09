#!/bin/bash
# ============================================================
# Script d'initialisation de la base de données PostgreSQL
# Crée la base si elle n'existe pas, puis applique le schéma
# ============================================================
set -e

DB_NAME="${DB_NAME:-plateforme_revision}"
DB_USER="${DB_USER:-postgres}"
DB_PASS="${DB_PASS:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
SCHEMA_FILE="${SCHEMA_FILE:-./schema.sql}"
SEED_FILE="${SEED_FILE:-./seed.sql}"

echo "=== Initialisation de la base de données : $DB_NAME ==="

# Attendre que PostgreSQL soit prêt
export PGPASSWORD="$DB_PASS"

echo "→ Vérification de la connexion à PostgreSQL..."
until psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c '\q' 2>/dev/null; do
  echo "   PostgreSQL n'est pas encore prêt, attente..."
  sleep 2
done
echo "   PostgreSQL est prêt."

# Créer la base si elle n'existe pas
echo "→ Création de la base '$DB_NAME' si elle n'existe pas..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -tc \
  "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 \
  || psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c \
     "CREATE DATABASE $DB_NAME"

echo "→ Application du schéma..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SCHEMA_FILE"

if [ -f "$SEED_FILE" ]; then
  echo "→ Insertion des données initiales..."
  psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SEED_FILE"
fi

echo ""
echo "=== Base de données initialisée avec succès ! ==="
