# Feature Catalog API

## Présentation

Ce projet est un backend Node.js permettant de gérer un catalogue de fonctionnalités (modules), leurs versions, la compatibilité, et la génération automatique de structures de projet (README, CI/CD, etc.).

## Prérequis

- Node.js v18+ recommandé
- MySQL (ou XAMPP/WAMP)
- npm

## Installation

```bash
git clone <url-du-repo>
cd backend
npm install
```

Configurer la base de données dans `src/config/db.config.js` avec vos identifiants MySQL.

## Lancement du backend

```bash
npm start
```

Le serveur démarre sur le port 3000 par défaut (ou le port défini dans `.env`).

## Structure du projet

```
backend/
├── server.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/

## Schéma de la base de données

Voici le schéma relationnel de la base de données utilisé pour le Feature Catalog :

![Schéma de la base de données](C:\Users\Lou\Desktop\PROJET LOULOU PFE)
```

## Endpoints principaux

### Fonctionnalités (Features)

- `GET /api/features` : liste toutes les fonctionnalités
- `POST /api/features` : ajoute une fonctionnalité
- `PUT /api/features/:id` : modifie une fonctionnalité
- `DELETE /api/features/:id` : supprime une fonctionnalité

### Versions

- `GET /api/features/:featureId/versions` : liste les versions d'une fonctionnalité
- `POST /api/features/:featureId/versions` : ajoute une version
- `PUT /api/versions/:id` : modifie une version
- `DELETE /api/versions/:id` : supprime une version

### Projets

- `GET /api/projects` : liste tous les projets
- `POST /api/projects` : crée un projet
- `PUT /api/projects/:id` : modifie un projet
- `DELETE /api/projects/:id` : supprime un projet

### Liaisons projet-fonctionnalité

- `POST /api/projects/:projectId/features` : ajoute une fonctionnalité à un projet
- `GET /api/projects/:projectId/features` : liste les fonctionnalités d'un projet

## Génération automatique

Un service permet de générer automatiquement :

- Un fichier `README.md` dynamique
- Un fichier `.gitlab-ci.yml`
- La structure de dossiers du projet (un dossier par module choisi)

## Automatisation via CI/CD

### Exemple d'appel API depuis un script Bash

Le fichier `add-feature.sh` permet d'ajouter automatiquement une fonctionnalité à votre catalogue via un simple appel cURL, utilisable dans un pipeline CI/CD ou en local :

```bash
bash add-feature.sh
```

### Exemple d'appel API pour ajouter une version

Le fichier `add-version.sh` permet d'ajouter une version à une fonctionnalité existante :

```bash
bash add-version.sh
```

### Exemple d'intégration dans un pipeline GitLab CI

Le fichier `.gitlab-ci.yml` montre comment automatiser l'ajout d'une fonctionnalité via l'API REST dans un pipeline GitLab :

```yaml
add_feature_api:
  stage: api
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST http://backend:3000/api/features \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Module CI/CD",
          "description": "Ajouté automatiquement depuis le pipeline GitLab"
        }'
```

> **Remarque** :
>
> - Adapte l'URL (`http://backend:3000`) selon ton environnement (localhost, Docker, etc.).
> - Tu peux ajouter d'autres étapes pour automatiser la génération de projet, l'ajout de versions, etc.

## Exemples de requêtes (Postman)

### Ajouter une fonctionnalité

```json
POST /api/features
{
  "name": "Authentification",
  "description": "Gestion de l'authentification"
}
```

### Ajouter une version

```json
POST /api/features/1/versions
{
  "version_number": "1.0.0",
  "description": "Première version",
  "status": "active",
  "release_date": "2024-01-01"
}
```

### Créer un projet

```json
POST /api/projects
{
  "name": "ProjetDemo",
  "package_name": "com.demo.projet",
  "spring_version": "3.0.0",
  "description": "Projet de démonstration avec modules de base"
}
```

### Ajouter une fonctionnalité à un projet

```json
POST /api/projects/1/features
{
  "featureId": 2,
  "versionId": 4
}
```

## Jeu de données de test (SQL)

Voir le dossier `src/config/` pour des scripts d'insertion de données de test.

## Auteur

- Loua el jelassi
- Contact : jloua04@gmail.com
