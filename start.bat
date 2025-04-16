@echo off
echo Nettoyage des processus node en cours...
taskkill /f /im node.exe
timeout /t 2 /nobreak

echo Vérification du port 3000...
netstat -ano | findstr :3000
if %ERRORLEVEL% EQU 0 (
    echo Un processus utilise déjà le port 3000, tentative de fermeture...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo Tentative de fermeture du processus %%a
        taskkill /f /pid %%a
        timeout /t 1 /nobreak
    )
)

echo Configuration des variables d'environnement...
set NODE_ENV=development
set PORT=3000
set BROWSER=none
set FAST_REFRESH=true
set REACT_APP_DISABLE_CACHE=true
set NODE_OPTIONS=--max-old-space-size=4096

echo Nettoyage du cache...
npm cache clean --force

echo Lancement du serveur en mode basique...
cd /d "%~dp0"
echo Commande: npx react-scripts start
npx react-scripts start --no-cache

pause 