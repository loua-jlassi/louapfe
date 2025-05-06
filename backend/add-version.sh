#!/bin/bash

# Exemple : Ajouter une version à la fonctionnalité 1
curl -X POST http://localhost:3000/api/features/1/versions \
  -H "Content-Type: application/json" \
  -d '{
    "version_number": "2.0.0",
    "description": "Version ajoutée automatiquement",
    "status": "active",
    "release_date": "2024-06-01"
  }' 