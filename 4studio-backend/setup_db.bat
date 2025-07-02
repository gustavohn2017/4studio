@echo off
echo Tentando criar o banco de dados com locale pt_BR.UTF-8...
psql -U postgres -f create_db.sql

if %errorlevel% neq 0 (
    echo Falha ao criar banco com locale pt_BR.UTF-8. Tentando alternativa sem locale...
    psql -U postgres -f create_db_alt.sql
)

echo Ativando o ambiente virtual...
call .\venv\Scripts\activate

echo Executando migrações...
python manage.py migrate

echo Deseja criar um superusuário admin? (s/n)
set /p resposta=
if "%resposta%"=="s" (
    python manage.py createsuperuser
)

echo Configuração concluída. Você pode iniciar o servidor com 'python manage.py runserver'
pause
