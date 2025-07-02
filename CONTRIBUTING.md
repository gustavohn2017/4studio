# Guia de Contribuição - 4studio

Agradecemos seu interesse em contribuir para o projeto 4studio! Este documento fornece diretrizes para contribuir com o desenvolvimento do projeto.

## Como Contribuir

### 1. Configuração do Ambiente de Desenvolvimento

Siga as instruções no arquivo [README.md](README.md) para configurar seu ambiente de desenvolvimento local.

### 2. Fluxo de Trabalho com Git

1. **Fork do repositório**
   - Faça um fork do repositório principal para sua conta GitHub

2. **Clone seu fork**
   ```
   git clone https://github.com/seu-usuario/4studio.git
   cd 4studio
   ```

3. **Adicione o repositório original como remote**
   ```
   git remote add upstream https://github.com/gustavohn2017/4studio.git
   ```

4. **Crie uma branch para sua feature**
   ```
   git checkout -b feature/nome-da-feature
   ```

5. **Mantenha sua branch atualizada**
   ```
   git fetch upstream
   git rebase upstream/main
   ```

6. **Faça commits com mensagens claras**
   ```
   git commit -m "Descrição concisa da alteração"
   ```

7. **Envie sua branch para seu fork**
   ```
   git push origin feature/nome-da-feature
   ```

8. **Abra um Pull Request**
   - Navegue até o repositório original
   - Clique em "New Pull Request"
   - Selecione sua branch

### 3. Padrões de Código

#### Python/Django
- Siga o [PEP 8](https://pep8.org/)
- Use docstrings para documentar funções e classes
- Escreva testes unitários para novas funcionalidades

#### JavaScript/React/Next.js
- Use ESLint com a configuração do projeto
- Utilize componentes funcionais e hooks
- Documente componentes com JSDoc

### 4. Diretrizes para Pull Requests

- Um PR deve abordar uma única funcionalidade ou correção
- Inclua uma descrição clara do que foi alterado
- Referencie issues relacionadas usando #numero_da_issue
- Certifique-se de que todos os testes estão passando
- Atualize a documentação, se necessário

### 5. Revisão de Código

- Todas as PRs serão revisadas antes de serem mescladas
- Esteja aberto a feedback e sugestões
- Responda a comentários de revisão de forma oportuna

### 6. Reportando Issues

Ao reportar issues, inclua:

- Descrição clara e concisa do problema
- Passos para reproduzir o problema
- Comportamento esperado vs. comportamento atual
- Screenshots, se aplicável
- Ambiente (sistema operacional, navegador, etc.)

## Estrutura do Projeto

### Backend (Django)

```
4studio-backend/
├── admin_panel/        # Aplicação Django para o painel administrativo
├── api/                # Aplicação Django para a API REST
├── media/              # Arquivos de mídia enviados pelos usuários
├── static/             # Arquivos estáticos
├── templates/          # Templates HTML
└── 4studio/           # Configurações do projeto
```

### Frontend (Next.js)

```
4studio-frontend/
├── public/             # Arquivos estáticos públicos
├── src/
│   ├── app/            # Rotas da aplicação Next.js
│   ├── components/     # Componentes React reutilizáveis
│   ├── hooks/          # Custom React hooks
│   └── styles/         # Arquivos CSS/SCSS
```

## Áreas Prioritárias para Contribuição

1. **Backend**
   - Melhorias na API
   - Testes unitários e de integração
   - Otimização de consultas ao banco de dados

2. **Frontend**
   - Otimização de performance
   - Melhorias de acessibilidade
   - Compatibilidade com diferentes navegadores

3. **Documentação**
   - Melhorias na documentação da API
   - Tutoriais para novos desenvolvedores
   - Tradução para outros idiomas

## Recursos Adicionais

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

## Contato

Se tiver dúvidas sobre como contribuir, entre em contato com os mantenedores do projeto através de issues no GitHub ou pelo e-mail: suporte@4studio.com.br
