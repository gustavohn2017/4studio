#!/bin/bash

echo "Instalando dependências do projeto VoiceTel..."

# Verifica se o ambiente virtual existe
if [ ! -d "venv" ]; then
    echo "Criando ambiente virtual..."
    python -m venv venv
fi

# Ativa o ambiente virtual
source venv/bin/activate

# Atualiza pip e ferramentas básicas
echo "Atualizando pip..."
python -m pip install --upgrade pip setuptools wheel

# Instala dependências do projeto
echo "Instalando dependências do projeto..."
pip install -r requirements.txt

# Copia arquivo .env de exemplo se não existir
if [ ! -f ".env" ]; then
    echo "Criando arquivo .env a partir do exemplo..."
    cp .env.example .env
fi

echo ""
echo "Instalação concluída! Ambiente pronto para uso."
echo "Para ativar o ambiente virtual, execute: source venv/bin/activate"
echo ""
