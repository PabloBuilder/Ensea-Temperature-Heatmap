@echo off
setlocal
cd /d "%~dp0" || exit /b 1

where npm.cmd >nul 2>&1
if errorlevel 1 (
    echo npm est introuvable. Installez Node.js LTS, puis relancez ce fichier.
    pause
    exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
    echo Installation des dependances...
    call npm.cmd ci
    if errorlevel 1 (
        echo L'installation a echoue.
        pause
        exit /b 1
    )
)

echo Ouverture de l'Atlas thermique dans le navigateur...
call npm.cmd run dev -- --open
if errorlevel 1 (
    echo Le serveur n'a pas pu demarrer.
    pause
    exit /b 1
)
