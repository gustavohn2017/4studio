-- Script alternativo para criar o banco de dados com codificação UTF-8
DROP DATABASE IF EXISTS voicetel_db;
CREATE DATABASE voicetel_db WITH ENCODING 'UTF8' TEMPLATE=template0;
