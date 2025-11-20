# 🔐 SECRET_KEY para Produção

**⚠️ IMPORTANTE: Esta chave é confidencial! Nunca compartilhe publicamente.**

## SECRET_KEY gerada:
```
$-afhnh^&@e4e-s+913l2ufba=-9p4bfw7oa*hx*15cbdjz$5r
```

## Como usar:

### No Railway (Backend):
1. Acesse seu projeto no Railway
2. Vá em "Variables"
3. Adicione:
   - **Name**: `SECRET_KEY`
   - **Value**: Cole a chave acima

### Alternativa - Gerar nova chave:
Se preferir gerar uma nova chave:

```bash
cd 4studio-backend
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

**Data de criação**: 2025-11-20  
**Arquivo**: Este arquivo está no .gitignore por segurança
