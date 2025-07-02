-- Script para criar o banco de dados com codificação UTF-8
DROP DATABASE IF EXISTS voicetel_db;
CREATE DATABASE voicetel_db WITH ENCODING 'UTF8' LC_COLLATE='pt_BR.UTF-8' LC_CTYPE='pt_BR.UTF-8' TEMPLATE=template0;
