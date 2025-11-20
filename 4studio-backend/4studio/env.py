"""
Configurações para carregar variáveis de ambiente do arquivo .env
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(env_path)