# Script para iniciar o ambiente de desenvolvimento 4studio

Write-Host "Inicializando ambiente de desenvolvimento 4studio..." -ForegroundColor Green

# Variáveis de configuração
$BackendPath = Join-Path $PSScriptRoot "4studio-backend"
$FrontendPath = Join-Path $PSScriptRoot "4studio-frontend"
$PythonExe = Join-Path $BackendPath "venv\Scripts\python.exe"
$PipExe = Join-Path $BackendPath "venv\Scripts\pip.exe"

# Função para verificar pré-requisitos
function Test-Prerequisites {
    Write-Host "Verificando pré-requisitos..." -ForegroundColor Cyan
    
    # Verificar se Node.js está instalado
    try {
        $nodeVersion = node -v
        Write-Host "Node.js instalado: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "Node.js não encontrado. Por favor, instale Node.js antes de continuar." -ForegroundColor Red
        exit 1
    }
    
    # Verificar se Python está instalado
    try {
        $pythonVersion = python --version
        Write-Host "Python instalado: $pythonVersion" -ForegroundColor Green
    } catch {
        Write-Host "Python não encontrado. Por favor, instale Python antes de continuar." -ForegroundColor Red
        exit 1
    }
}

# Configurar o backend Django
function Initialize-Backend {
    Write-Host "`nConfigurando backend Django..." -ForegroundColor Cyan
    
    # Navegar para o diretório do backend
    Set-Location $BackendPath
    
    # Verificar se o ambiente virtual existe, se não, criar
    if (-not (Test-Path "venv")) {
        Write-Host "Criando ambiente virtual Python..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    # Ativar ambiente virtual
    Write-Host "Ativando ambiente virtual..." -ForegroundColor Yellow
    & "$BackendPath\venv\Scripts\Activate.ps1"
    
    # Instalar dependências
    Write-Host "Instalando dependências do backend..." -ForegroundColor Yellow
    & $PipExe install -r requirements.txt
      # Aplicar migrações
    Write-Host "Aplicando migrações..." -ForegroundColor Yellow
    & $PythonExe manage.py migrate
    
    # Criar dados de exemplo
    Write-Host "Criando dados de exemplo..." -ForegroundColor Yellow
    & $PythonExe create_sample_data.py
    
    Write-Host "Backend configurado com sucesso!" -ForegroundColor Green
}

# Configurar o frontend Next.js
function Initialize-Frontend {
    Write-Host "`nConfigurando frontend Next.js..." -ForegroundColor Cyan
    
    # Navegar para o diretório do frontend
    Set-Location $FrontendPath
    
    # Instalar dependências
    Write-Host "Instalando dependências do frontend..." -ForegroundColor Yellow
    npm install
    
    Write-Host "Frontend configurado com sucesso!" -ForegroundColor Green
}

# Iniciar o backend
function Start-Backend {
    Write-Host "`nIniciando servidor Django..." -ForegroundColor Cyan
    
    # Iniciar em uma nova janela do PowerShell
    Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "Set-Location '$BackendPath'; & '.\venv\Scripts\Activate.ps1'; & '$PythonExe' manage.py runserver"
    
    Write-Host "Servidor Django iniciado em http://localhost:8000" -ForegroundColor Green
    Write-Host "API disponível em http://localhost:8000/api/" -ForegroundColor Green
    Write-Host "Admin Django em http://localhost:8000/admin/" -ForegroundColor Green
}

# Iniciar o frontend
function Start-Frontend {
    Write-Host "`nIniciando aplicação Next.js..." -ForegroundColor Cyan
    
    # Iniciar em uma nova janela do PowerShell
    Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "Set-Location '$FrontendPath'; npm run dev"
    
    Write-Host "Servidor Next.js iniciado em http://localhost:3000" -ForegroundColor Green
}

# Verificar se precisa criar um superusuário Django
function Test-SuperUser {
    Write-Host "`nDeseja criar um superusuário para o Django Admin? (S/N)" -ForegroundColor Yellow
    $createSuperUser = Read-Host
    
    if ($createSuperUser -eq "S" -or $createSuperUser -eq "s") {
        Set-Location $BackendPath
        & "$BackendPath\venv\Scripts\Activate.ps1"
        & $PythonExe manage.py createsuperuser
    }
}

# Executar os passos
try {    Test-Prerequisites
    Initialize-Backend
    Initialize-Frontend
    Test-SuperUser
    Start-Backend
    Start-Frontend
    
    Write-Host "`nAmbiente de desenvolvimento iniciado com sucesso!" -ForegroundColor Green
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Backend API: http://localhost:8000/api/" -ForegroundColor Cyan
    Write-Host "Backend Admin: http://localhost:8000/admin/" -ForegroundColor Cyan
    Write-Host "Pressione Ctrl+C em cada janela para encerrar os servidores" -ForegroundColor Yellow
    
    # Voltar ao diretório original
    Set-Location $PSScriptRoot
} catch {
    Write-Host "`nErro ao iniciar o ambiente de desenvolvimento: $_" -ForegroundColor Red
}
