# Script para recriar o banco de dados e executar migrações

# Parar o servidor Django atual (se estiver rodando)
Write-Host "Parando o servidor Django..." -ForegroundColor Yellow

# Conectar ao PostgreSQL e executar o script de criação do banco de dados
Write-Host "Tentando criar o banco de dados com locale pt_BR.UTF-8..." -ForegroundColor Yellow
try {
    psql -U postgres -f create_db.sql
} catch {
    Write-Host "Falha ao criar banco com locale pt_BR.UTF-8. Tentando alternativa sem locale..." -ForegroundColor Yellow
    psql -U postgres -f create_db_alt.sql
}

# Ativar o ambiente virtual
Write-Host "Ativando o ambiente virtual..." -ForegroundColor Yellow
.\venv\Scripts\Activate

# Executar migrações
Write-Host "Executando migrações..." -ForegroundColor Yellow
python manage.py migrate

# Criar superusuário se necessário
Write-Host "Deseja criar um superusuário admin? (s/n)" -ForegroundColor Green
$resposta = Read-Host
if ($resposta -eq "s") {
    python manage.py createsuperuser
}

Write-Host "Configuração concluída. Você pode iniciar o servidor com 'python manage.py runserver'" -ForegroundColor Green
