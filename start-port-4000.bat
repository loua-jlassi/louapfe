@echo off
echo Nettoyage des processus node en cours...
taskkill /f /im node.exe
timeout /t 2 /nobreak

echo Configuration des variables d'environnement...
set NODE_ENV=development
set PORT=4000
set BROWSER=none

echo Lancement du serveur sur le port 4000...
cd /d "%~dp0"
echo L'application sera accessible à l'adresse http://localhost:4000
echo Commande: npx react-scripts start
npx react-scripts start

pause 