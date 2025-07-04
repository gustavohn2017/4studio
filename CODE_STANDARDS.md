# Padrões do Projeto 4Studio

Este documento define os padrões e boas práticas adotados no projeto 4Studio para manter consistência no código e facilitar a manutenção.

## Estrutura do Projeto

O projeto está dividido em duas aplicações principais:

- **4studio-backend**: API e painel administrativo desenvolvidos em Django
- **4studio-frontend**: Interface do cliente desenvolvida em Next.js + Tailwind CSS

## Nomenclatura

- Nome do projeto: **4Studio** (com "S" maiúsculo)
- Nomes de variáveis e funções: camelCase
- Nomes de classes: PascalCase
- Nomes de arquivos React/TypeScript: PascalCase
- Nomes de arquivos Python: snake_case

## Backend (Django)

### Estrutura de Arquivos

O diretório principal de configuração é `4studio/`. O diretório `voicetel/` contém arquivos de configuração duplicados que foram mantidos por compatibilidade, mas todas as alterações devem ser feitas nos arquivos dentro do diretório `4studio/`.

### Padrões de Código

- Utilize docstrings para documentar classes e funções
- Siga o PEP 8 para estilo de código Python
- Utilize classes baseadas em viewsets para API REST
- Mantenha os modelos de dados em arquivos `models.py`
- Utilize serializers para transformação de dados

## Frontend (Next.js)

### Estrutura de Arquivos

- `app/`: Rotas e páginas da aplicação
- `components/`: Componentes reutilizáveis
- `hooks/`: Hooks personalizados
- `lib/`: Bibliotecas utilitárias e APIs
- `public/`: Arquivos estáticos

### Padrões de Código

- Utilize TypeScript para todo o código JavaScript
- Utilize componentes funcionais com hooks
- Prefira componentes com estado isolado
- Utilize CSS modules ou Tailwind para estilização
- Mantenha URLs de API em variáveis de ambiente

## Variáveis de Ambiente

- Utilize arquivo `.env.local` (frontend) ou `.env` (backend) para configurações locais
- Nunca comite arquivos `.env` contendo senhas ou chaves de API
- Use arquivos de exemplo `.env.example` para documentar variáveis necessárias

## Commits e Branches

- Utilize branches por feature
- Mensagens de commit devem ser claras e descrever o que foi feito
- Sempre faça pull antes de iniciar o trabalho em uma branch

## Revisão de Código

- Todo código deve ser revisado por pelo menos um outro desenvolvedor
- Certifique-se de que o código segue os padrões definidos
- Verifique se há testes adequados para novas funcionalidades

## Testes

- Todo código deve ser testado
- Utilize testes unitários para funções e componentes
- Utilize testes de integração para API e fluxos completos

## Documentação

- Mantenha a documentação atualizada
- Documente decisões arquiteturais importantes
- Utilize README.md para instruções de instalação e uso
