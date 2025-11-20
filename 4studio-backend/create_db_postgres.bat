@echo off
REM Script para criar o banco de dados 4studio_db no PostgreSQL
REM Execute este script e digite a senha do PostgreSQL quando solicitado

echo ========================================
echo Criando banco de dados 4studio_db
echo ========================================
echo.

REM Verificar se PostgreSQL está instalado
where psql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: PostgreSQL nao encontrado no PATH
    echo Instale PostgreSQL ou adicione ao PATH
    pause
    exit /b 1
)

REM Criar o banco de dados
echo Criando banco de dados...
psql -U postgres -c "DROP DATABASE IF EXISTS \"4studio_db\";"
psql -U postgres -c "CREATE DATABASE \"4studio_db\" WITH ENCODING 'UTF8' TEMPLATE template0;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Banco criado com sucesso!
    echo ========================================
    echo.
    echo Proximos passos:
    echo 1. Ative o ambiente virtual: venv\Scripts\activate
    echo 2. Execute as migracoes: python manage.py migrate
    echo 3. Crie um superusuario: python manage.py createsuperuser
    echo.
) else (
    echo.
    echo ========================================
    echo ERRO ao criar banco de dados
    echo ========================================
    echo.
    echo Verifique:
    echo 1. PostgreSQL esta rodando
    echo 2. Senha do usuario postgres esta correta
    echo 3. Voce tem permissoes para criar bancos
    echo.
)

pause
