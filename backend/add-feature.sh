#!/bin/bash

# Exemple : Ajouter une fonctionnalité via l'API REST
curl -X POST http://localhost:3000/api/features \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Module CI/CD",
    "description": "Ajouté automatiquement depuis un pipeline"
  }' 