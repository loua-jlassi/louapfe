@echo off
echo Installation de serve (si nécessaire)...
npm install -g serve

echo Construction de l'application...
npm run build

echo Lancement du serveur statique sur le port 3000...
echo L'application sera disponible à l'adresse http://localhost:3000
serve -s build -l 3000

pause 