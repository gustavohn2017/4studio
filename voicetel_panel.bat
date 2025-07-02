@echo off
echo ===============================================
echo =         VoiceTel - Painel de Controle       =
echo ===============================================
echo.

:menu
echo Escolha uma opcao:
echo.
echo 1. Iniciar ambiente completo (backend + frontend)
echo 2. Iniciar apenas o backend (Django)
echo 3. Iniciar apenas o frontend (Next.js)
echo 4. Criar superusuario admin
echo 5. Criar dados de exemplo
echo 6. Abrir painel Django Admin no navegador
echo 7. Abrir site no navegador
echo 8. Verificar status das migracoes
echo 9. Verificar estado do sistema
echo 10. Sair
echo.

set /p escolha="Digite o numero da opcao desejada: "

if "%escolha%"=="1" goto iniciar_completo
if "%escolha%"=="2" goto iniciar_backend
if "%escolha%"=="3" goto iniciar_frontend
if "%escolha%"=="4" goto criar_superuser
if "%escolha%"=="5" goto criar_dados
if "%escolha%"=="6" goto abrir_admin
if "%escolha%"=="7" goto abrir_site
if "%escolha%"=="8" goto verificar_migracoes
if "%escolha%"=="9" goto verificar_sistema
if "%escolha%"=="10" goto sair

echo.
echo Opcao invalida! Por favor, tente novamente.
echo.
goto menu

:iniciar_completo
echo.
echo Iniciando ambiente completo...
start powershell -ExecutionPolicy Bypass -File .\start_development.ps1
goto fim

:iniciar_backend
echo.
echo Iniciando servidor Django...
start cmd /k "cd voicetel-backend && .\venv\Scripts\activate.bat && python manage.py runserver"
goto fim

:iniciar_frontend
echo.
echo Iniciando servidor Next.js...
start cmd /k "cd voicetel-frontend && npm run dev"
goto fim

:criar_superuser
echo.
echo Criando superusuario para o Django Admin...
cd voicetel-backend
.\venv\Scripts\activate.bat
python manage.py createsuperuser
cd ..
pause
goto menu

:criar_dados
echo.
echo Criando dados de exemplo...
cd voicetel-backend
.\venv\Scripts\activate.bat
python create_sample_data.py
cd ..
pause
goto menu

:abrir_admin
echo.
echo Abrindo painel de administracao Django...
start http://localhost:8000/admin
goto menu

:abrir_site
echo.
echo Abrindo o site VoiceTel...
start http://localhost:3000
goto menu

:verificar_migracoes
echo.
echo Verificando status das migracoes...
cd voicetel-backend
.\venv\Scripts\activate.bat
python manage.py showmigrations
cd ..
pause
goto menu

:verificar_sistema
echo.
echo Verificando o estado do sistema...
cd voicetel-backend
.\venv\Scripts\activate.bat
pip install requests
cd ..
python check_system.py
pause
goto menu

:sair
echo.
echo Encerrando o painel de controle...
exit

:fim
echo.
echo Comando executado com sucesso!
echo Pressione qualquer tecla para voltar ao menu...
pause >nul
goto menu
