# Notas sobre a Estrutura do 4Studio

## Estrutura do Projeto e Inconsistências Resolvidas

O projeto 4Studio tem algumas inconsistências estruturais que foram identificadas e tratadas:

### Duplicação de Módulos de Configuração

O backend possui dois diretórios com arquivos de configuração Django:
- `4studio/` - Diretório principal de configuração, referenciado no arquivo manage.py
- `voicetel/` - Diretório secundário com configurações duplicadas

**Solução**: Os arquivos em `voicetel/` foram marcados como redundantes através de comentários explicativos, indicando que os arquivos em `4studio/` são os que devem ser usados e atualizados.

### Padronização de Nomenclatura

Em alguns lugares, o nome do projeto aparece como "4studio" e em outros como "4Studio".

**Solução**: Adotamos o padrão "4Studio" (com o "S" maiúsculo) em todas as referências ao nome do projeto.

## Estrutura Correta para Desenvolvimento

Para desenvolvimento, sempre utilize:
- O diretório `4studio/` para configurações Django
- Referências a "4Studio" com o "S" maiúsculo para o nome do projeto

## Notas sobre Scripts de Inicialização

Os scripts `start_development.ps1` e `start_development.bat` iniciam corretamente o ambiente, usando as configurações no diretório `4studio/`.

## Próximas Etapas Recomendadas

Para uma limpeza mais completa da estrutura do projeto, considere:
1. Migrar qualquer funcionalidade específica de `voicetel/` para `4studio/`
2. Remover o diretório `voicetel/` após migração
3. Atualizar quaisquer referências a `voicetel` em outros arquivos
