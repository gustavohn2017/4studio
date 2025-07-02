@echo off
title 4studio Management Panel
mode con: cols=100 lines=30
color 0A

:menu
cls
echo.
echo  ======================================
echo           4STUDIO PAINEL DE CONTROLE
echo  ======================================
echo.
echo  [1] Iniciar Ambiente de Desenvolvimento
echo  [2] Executar Backend (Django)
echo  [3] Executar Frontend (Next.js)
echo  [4] Criar Migrações
echo  [5] Aplicar Migrações
echo  [6] Criar Superusuário
echo  [7] Verificar Sistema
echo  [8] Sair
echo.
echo  ======================================
echo.

set /p opt="Escolha uma opção: "

if "%opt%"=="1" goto start_dev
if "%opt%"=="2" goto start_backend
if "%opt%"=="3" goto start_frontend
if "%opt%"=="4" goto make_migrations
if "%opt%"=="5" goto apply_migrations
if "%opt%"=="6" goto create_superuser
if "%opt%"=="7" goto check_system
if "%opt%"=="8" goto end

echo Opção inválida!
pause
goto menu

:start_dev
cls
echo Iniciando ambiente de desenvolvimento...
powershell -ExecutionPolicy Bypass -File .\start_development.ps1
pause
goto menu

:start_backend
cls
echo Iniciando backend Django...
cd 4studio-backend
powershell -ExecutionPolicy Bypass -File .\venv\Scripts\Activate.ps1
python manage.py runserver
cd ..
pause
goto menu

:start_frontend
cls
echo Iniciando frontend Next.js...
cd 4studio-frontend
npm run dev
cd ..
pause
goto menu

:make_migrations
cls
echo Criando migrações...
cd 4studio-backend
powershell -ExecutionPolicy Bypass -File .\venv\Scripts\Activate.ps1
python manage.py makemigrations
cd ..
pause
goto menu

:apply_migrations
cls
echo Aplicando migrações...
cd 4studio-backend
powershell -ExecutionPolicy Bypass -File .\venv\Scripts\Activate.ps1
python manage.py migrate
cd ..
pause
goto menu

:create_superuser
cls
echo Criando superusuário...
cd 4studio-backend
powershell -ExecutionPolicy Bypass -File .\venv\Scripts\Activate.ps1
python manage.py createsuperuser
cd ..
pause
goto menu

:check_system
cls
echo Verificando sistema...
python check_system.py
pause
goto menu

:end
exit
