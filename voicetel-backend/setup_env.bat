@echo off
echo Instalando dependencias do projeto VoiceTel...

:: Verifica se o ambiente virtual existe
if not exist venv (
    echo Criando ambiente virtual...
    python -m venv venv
)

:: Ativa o ambiente virtual
call venv\Scripts\activate.bat

:: Atualiza pip e ferramentas básicas
echo Atualizando pip...
python -m pip install --upgrade pip setuptools wheel

:: Instala dependências do projeto
echo Instalando dependencias do projeto...
pip install -r requirements.txt

:: Copia arquivo .env de exemplo se não existir
if not exist .env (
    echo Criando arquivo .env a partir do exemplo...
    copy .env.example .env
)

echo.
echo Instalacao concluida! Ambiente pronto para uso.
echo Para ativar o ambiente virtual, execute: venv\Scripts\activate.bat
echo.
