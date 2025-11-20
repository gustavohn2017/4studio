# 🔗 Teste de Conexão Backend + Frontend + Banco de Dados

Este documento descreve como testar a comunicação entre o backend Django, o banco de dados e o frontend Next.js.

## ✅ Resultados do Teste Local

```
======================================================================
🔗 TESTE DE CONEXÃO - BACKEND + BANCO DE DADOS
======================================================================

📊 Teste 1: Verificando conexão com banco de dados...
✅ Banco de dados: CONECTADO
   Tipo: sqlite3
   Nome: C:\4studio\4studio-backend\db.sqlite3

📈 Teste 2: Coletando estatísticas...
   Categorias: 6
   Tipos de Voz: 6
   Amostras de Áudio: 0
   Depoimentos: 3
   Solicitações de Contato: 0
   Usuários: 1

📦 Teste 3: Verificando dados de exemplo...
   Categorias encontradas:
      - ID: 3, Nome: Espera Telefônica
      - ID: 4, Nome: Locução para Vídeos
      - ID: 6, Nome: Outro

   Depoimentos encontrados:
      - ID: 3, Cliente: Carlos Mendes, Status: ✅ Ativo
      - ID: 2, Cliente: Maria Oliveira, Status: ✅ Ativo
      - ID: 1, Cliente: João Silva, Status: ✅ Ativo

======================================================================
✅ TESTE CONCLUÍDO COM SUCESSO!
======================================================================
```

## 🚀 Como Executar os Testes

### 1. Teste via Script Python (Recomendado)

Execute o script de teste direto no backend:

```bash
cd 4studio-backend
python test_connection.py
```

**Vantagens:**
- ✅ Não precisa do servidor rodando
- ✅ Teste direto no banco de dados
- ✅ Resultado instantâneo no terminal
- ✅ Exibe estatísticas detalhadas

---

### 2. Teste via Página HTML no Backend

1. Certifique-se que o backend está rodando:
```bash
cd 4studio-backend
python manage.py runserver
```

2. Acesse no navegador:
```
http://localhost:8000/test-connection/
```

**Vantagens:**
- ✅ Interface visual bonita
- ✅ Teste via navegador
- ✅ Exibe dados formatados
- ✅ Botão para testar novamente

---

### 3. Teste via API JSON

1. Backend rodando:
```bash
cd 4studio-backend
python manage.py runserver
```

2. Acesse no navegador ou use curl:
```bash
curl http://localhost:8000/api/test-connection/
```

**Retorno JSON:**
```json
{
    "status": "success",
    "message": "Backend e banco de dados funcionando perfeitamente! ✅",
    "database": {
        "status": "connected",
        "type": "sqlite3"
    },
    "statistics": {
        "categories": 6,
        "voice_types": 6,
        "audio_samples": 0,
        "testimonials": 3,
        "contact_requests": 0,
        "users": 1
    },
    "samples": {
        "categories": [...],
        "testimonials": [...]
    }
}
```

**Vantagens:**
- ✅ Teste via API REST
- ✅ Formato JSON para integração
- ✅ Pode ser chamado pelo frontend

---

### 4. Teste via Frontend Next.js

1. Backend rodando (porta 8000):
```bash
cd 4studio-backend
python manage.py runserver
```

2. Frontend rodando (porta 3000):
```bash
cd 4studio-frontend
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000/test-connection
```

**Vantagens:**
- ✅ Teste completo Frontend → Backend → Database
- ✅ Interface React moderna
- ✅ Verifica comunicação CORS
- ✅ Design responsivo com Tailwind/CSS

---

## 📊 O Que é Testado

### ✅ Conexão com Banco de Dados
- Verifica se o Django consegue conectar ao banco
- Identifica o tipo de banco (SQLite, PostgreSQL, etc)
- Confirma que as queries funcionam

### ✅ Contagem de Registros
Conta quantos registros existem em cada tabela:
- Categorias de Voz
- Tipos de Voz
- Amostras de Áudio
- Depoimentos
- Solicitações de Contato
- Usuários do Sistema

### ✅ Dados de Exemplo
Busca e exibe os primeiros registros de:
- Categorias (ID, Nome)
- Depoimentos (ID, Cliente, Status)

### ✅ API REST (quando via HTTP)
- Testa se o endpoint responde
- Verifica formato JSON
- Confirma status HTTP 200

### ✅ CORS (quando via Frontend)
- Verifica se o frontend consegue fazer requisições
- Testa configuração de CORS
- Confirma comunicação cross-origin

---

## 🛠️ Arquivos Criados

### Backend
1. **`test_connection.py`** - Script Python para teste direto
2. **`templates/test_connection.html`** - Página HTML de teste
3. **`api/views.py`** - Endpoint `test_connection()`
4. **`api/urls.py`** - Rota `/api/test-connection/`
5. **`4studio/views.py`** - View `test_connection_view()`
6. **`4studio/urls.py`** - Rota `/test-connection/`

### Frontend
1. **`app/test-connection/page.tsx`** - Página Next.js de teste

---

## 🔧 Solução de Problemas

### Erro: "Banco de dados desconectado"
- ✅ Verifique se `db.sqlite3` existe
- ✅ Execute `python manage.py migrate`
- ✅ Confira as configurações em `settings.py`

### Erro: "CORS blocked"
- ✅ Verifique `CORS_ALLOWED_ORIGINS` em `settings.py`
- ✅ Certifique-se que `corsheaders` está instalado
- ✅ Middleware `CorsMiddleware` está ativado

### Erro: "Connection refused"
- ✅ Backend está rodando na porta 8000?
- ✅ Frontend está rodando na porta 3000?
- ✅ Use `localhost` ou `127.0.0.1` conforme configurado

### Erro: "Module not found"
- ✅ Ative o ambiente virtual: `venv\Scripts\activate` (Windows)
- ✅ Instale dependências: `pip install -r requirements.txt`

---

## 📝 Notas Importantes

1. **Ambiente de Desenvolvimento**: Estes testes são para desenvolvimento local
2. **DEBUG=True**: Certifique-se que está em modo debug
3. **Banco de Dados**: SQLite é usado por padrão, mas funciona com PostgreSQL também
4. **Portas**: Backend na 8000, Frontend na 3000
5. **CORS**: Já configurado para `localhost:3000`

---

## 🎯 Próximos Passos

Após confirmar que tudo está funcionando:

1. ✅ Adicionar mais dados de teste
2. ✅ Testar upload de arquivos de áudio
3. ✅ Testar formulário de contato
4. ✅ Implementar autenticação JWT
5. ✅ Deploy em produção

---

## 📞 Suporte

Se encontrar problemas, verifique:
- Logs do Django no terminal
- Console do navegador (F12)
- Network tab para requisições HTTP
- Arquivo `db.sqlite3` existe e tem permissões

---

**Data do Teste:** 05/11/2025
**Status:** ✅ Todos os testes passaram com sucesso!
