# Resolução de problemas com PostgreSQL e codificação UTF-8

Se você estiver enfrentando problemas de codificação com o PostgreSQL, como o erro:
```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe7 in position 78: invalid continuation byte
```

Siga estas etapas para resolver:

## 1. Verifique a instalação do PostgreSQL

Certifique-se de que o PostgreSQL está instalado corretamente e que o serviço está em execução.

## 2. Recrie o banco de dados com codificação UTF-8

Execute um dos scripts fornecidos:
- `setup_db.bat` (para prompt de comando)
- `setup_db.ps1` (para PowerShell)

Esses scripts tentarão:
1. Criar o banco de dados com a codificação UTF-8 correta
2. Executar as migrações necessárias
3. Opcionalmente criar um superusuário

## 3. Problemas com Locale (pt_BR.UTF-8)

Se você receber erros relacionados ao locale pt_BR.UTF-8, isso significa que esse locale não está disponível no seu sistema PostgreSQL. O script alternativo será usado automaticamente, criando o banco apenas com codificação UTF-8 sem especificar o locale.

## 4. Verificação da codificação no PostgreSQL

Para verificar a codificação atual do banco de dados, conecte ao PostgreSQL e execute:
```sql
\l
```

Você deve ver `4studio_db` com codificação `UTF8`.

## 5. Redefinindo o banco de dados

Se continuar tendo problemas, experimente:
1. Desconectar todas as conexões do banco
2. Executar o script de configuração novamente

## Configuração manual do banco de dados

Se necessário, você pode criar o banco de dados manualmente:

```sql
DROP DATABASE IF EXISTS 4studio_db;
CREATE DATABASE 4studio_db WITH ENCODING 'UTF8' TEMPLATE=template0;
```

E depois executar as migrações:
```
python manage.py migrate
```
