# 🎨 Guia Rápido - Componentes do Admin Panel

## Uso dos Componentes

### 1. Botões

```html
<!-- Primary Button -->
<button class="btn btn-primary">
    <i class="fas fa-plus"></i>
    Adicionar
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">
    <i class="fas fa-edit"></i>
    Editar
</button>

<!-- Danger Button -->
<button class="btn btn-danger">
    <i class="fas fa-trash"></i>
    Excluir
</button>

<!-- Success Button -->
<button class="btn btn-success">
    <i class="fas fa-save"></i>
    Salvar
</button>
```

### 2. Cards

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Título do Card</h3>
    </div>
    <div class="card-body">
        <p>Conteúdo do card aqui...</p>
    </div>
</div>
```

### 3. Stat Cards (Dashboard)

```html
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-card-header">
            <div class="stat-card-title">Total de Usuários</div>
            <div class="stat-card-icon">
                <i class="fas fa-users"></i>
            </div>
        </div>
        <div class="stat-card-value">1,234</div>
        <div class="stat-card-change positive">
            <i class="fas fa-arrow-up"></i>
            <span>12% este mês</span>
        </div>
    </div>
</div>
```

### 4. Tabelas

```html
<div class="table-container">
    <table class="table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>João Silva</td>
                <td>joao@email.com</td>
                <td><span class="badge badge-success">Ativo</span></td>
                <td>
                    <button class="btn btn-secondary" style="padding: 6px 12px;">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### 5. Formulários

```html
<form>
    <div class="form-group">
        <label class="form-label required">Nome</label>
        <input type="text" class="form-control" placeholder="Digite o nome" required>
        <span class="form-help">Mínimo 3 caracteres</span>
    </div>
    
    <div class="form-group">
        <label class="form-label required">Descrição</label>
        <textarea class="form-control" placeholder="Digite a descrição" required></textarea>
    </div>
    
    <div class="form-group">
        <label class="form-label">Categoria</label>
        <select class="form-select">
            <option>Selecione...</option>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
        </select>
    </div>
    
    <button type="submit" class="btn btn-primary">Salvar</button>
</form>
```

### 6. Alerts

```html
<!-- Success Alert -->
<div class="alert alert-success">
    <div class="alert-icon">
        <i class="fas fa-check-circle"></i>
    </div>
    <div class="alert-content">
        <p>Operação realizada com sucesso!</p>
    </div>
    <button class="alert-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
    </button>
</div>

<!-- Error Alert -->
<div class="alert alert-error">
    <div class="alert-icon">
        <i class="fas fa-exclamation-circle"></i>
    </div>
    <div class="alert-content">
        <p>Erro ao processar a solicitação.</p>
    </div>
    <button class="alert-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
    </button>
</div>
```

### 7. Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Ativo</span>
<span class="badge badge-danger">Inativo</span>
<span class="badge badge-warning">Pendente</span>
<span class="badge badge-info">Info</span>
```

### 8. Modais

```html
<div class="modal-backdrop">
    <div class="modal">
        <div class="modal-header">
            <h3 class="modal-title">Título do Modal</h3>
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <p>Conteúdo do modal aqui...</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary">Cancelar</button>
            <button class="btn btn-primary">Confirmar</button>
        </div>
    </div>
</div>
```

## Funções JavaScript

### Toast Notifications

```javascript
// Success
ToastManager.show('Operação concluída!', 'success', 3000);

// Error
ToastManager.show('Erro ao processar', 'error', 3000);

// Warning
ToastManager.show('Atenção necessária', 'warning', 3000);

// Info
ToastManager.show('Informação importante', 'info', 3000);
```

### Loading Overlay

```javascript
// Mostrar
LoadingOverlay.show('Processando...');

// Esconder
LoadingOverlay.hide();

// Exemplo de uso
LoadingOverlay.show('Salvando dados...');
setTimeout(() => {
    LoadingOverlay.hide();
    ToastManager.show('Dados salvos!', 'success');
}, 2000);
```

### Validação de Formulário

```javascript
// HTML
<form id="meuForm" onsubmit="return handleSubmit(event)">
    <!-- campos do formulário -->
</form>

// JavaScript
function handleSubmit(event) {
    event.preventDefault();
    
    if (validateForm('meuForm')) {
        LoadingOverlay.show('Salvando...');
        // Processar formulário
        // ...
        LoadingOverlay.hide();
        ToastManager.show('Salvo com sucesso!', 'success');
    }
    
    return false;
}
```

### Confirmação de Exclusão

```javascript
// HTML
<button onclick="handleDelete(123)">
    <i class="fas fa-trash"></i> Excluir
</button>

// JavaScript
function handleDelete(id) {
    if (confirmDelete('Deseja realmente excluir este item?')) {
        LoadingOverlay.show('Excluindo...');
        // Fazer requisição de exclusão
        // ...
        LoadingOverlay.hide();
        ToastManager.show('Item excluído!', 'success');
    }
}
```

### Preview de Arquivo

```javascript
// HTML
<input type="file" id="fileInput" accept="image/*">
<div id="preview"></div>

// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setupFilePreview('fileInput', 'preview');
});
```

### Busca em Tabela

```javascript
// HTML
<input type="text" id="searchInput" placeholder="Buscar...">
<table id="dataTable">
    <!-- conteúdo da tabela -->
</table>

// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    searchTable('searchInput', 'dataTable');
});
```

### Copiar para Clipboard

```javascript
// HTML
<button onclick="copyToClipboard('Texto para copiar')">
    <i class="fas fa-copy"></i> Copiar
</button>

// JavaScript - já funciona automaticamente
```

## Layouts Comuns

### Grid de 2 Colunas

```html
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
    <div class="card">Coluna 1</div>
    <div class="card">Coluna 2</div>
</div>
```

### Grid de 3 Colunas

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
    <div class="card">Coluna 1</div>
    <div class="card">Coluna 2</div>
    <div class="card">Coluna 3</div>
</div>
```

### Grid Responsivo (Auto-fit)

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
</div>
```

## Dicas de Estilo

### Espaçamentos Comuns

```css
/* Margin bottom */
margin-bottom: 16px;  /* Pequeno */
margin-bottom: 24px;  /* Médio */
margin-bottom: 32px;  /* Grande */

/* Padding */
padding: 16px;        /* Pequeno */
padding: 24px;        /* Médio */
padding: 32px;        /* Grande */

/* Gap (Grid/Flex) */
gap: 12px;            /* Pequeno */
gap: 16px;            /* Médio */
gap: 24px;            /* Grande */
```

### Cores Inline

```html
<!-- Texto roxo -->
<span style="color: #a855f7;">Texto</span>

<!-- Background roxo transparente -->
<div style="background: rgba(168, 85, 247, 0.1);">Conteúdo</div>

<!-- Border roxo -->
<div style="border: 1px solid rgba(168, 85, 247, 0.2);">Conteúdo</div>
```

### Ícones

```html
<!-- Ícone simples -->
<i class="fas fa-home"></i>

<!-- Ícone com tamanho -->
<i class="fas fa-home" style="font-size: 24px;"></i>

<!-- Ícone colorido -->
<i class="fas fa-home" style="color: #a855f7; font-size: 20px;"></i>
```

## Exemplo de Página Completa

```html
{% extends 'admin_panel/base.html' %}

{% block title %}Minha Página - 4Studio Admin{% endblock %}

{% block page_title %}Minha Página{% endblock %}

{% block content %}

<!-- Stats Grid -->
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-card-header">
            <div class="stat-card-title">Total</div>
            <div class="stat-card-icon">
                <i class="fas fa-chart-bar"></i>
            </div>
        </div>
        <div class="stat-card-value">100</div>
    </div>
</div>

<!-- Content -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Dados</h3>
    </div>
    <div class="card-body">
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Item 1</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">
                                <i class="fas fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

{% endblock %}
```

---

**Documento criado para facilitar o desenvolvimento no Admin Panel 4Studio**
