/* =================================================================
   4Studio Admin Panel - JavaScript 2.0
   Moderno, Intuitivo e Performático
   ================================================================= */

// Auto-close alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// File upload preview
function setupFilePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (input && preview) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 8px;">`;
                    } else {
                        preview.innerHTML = `<p style="color: #a855f7;"><i class="fas fa-file"></i> ${file.name}</p>`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Confirm before delete
function confirmDelete(message = 'Tem certeza que deseja excluir este item?') {
    return confirm(message);
}

// Toast notification system
const ToastManager = {
    show: function(message, type = 'info', duration = 3000) {
        const container = this.getContainer();
        const toast = this.createToast(message, type);
        
        container.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    getContainer: function() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 12px;
            `;
            document.body.appendChild(container);
        }
        return container;
    },
    
    createToast: function(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        const colors = {
            success: { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', color: '#34d399', icon: 'check-circle' },
            error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', color: '#f87171', icon: 'exclamation-circle' },
            warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', color: '#fbbf24', icon: 'exclamation-triangle' },
            info: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', color: '#60a5fa', icon: 'info-circle' }
        };
        
        const style = colors[type] || colors.info;
        
        toast.style.cssText = `
            background: ${style.bg};
            border: 1px solid ${style.border};
            border-left: 4px solid ${style.border};
            border-radius: 12px;
            padding: 16px 20px;
            color: ${style.color};
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        toast.innerHTML = `
            <i class="fas fa-${style.icon}" style="font-size: 20px;"></i>
            <span style="flex: 1; font-weight: 500; font-size: 14px;">${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: transparent;
                border: none;
                color: currentColor;
                cursor: pointer;
                padding: 4px;
            ">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        return toast;
    }
};

// Add show class for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .toast.show {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
    </style>
`);

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        ToastManager.show('Copiado para a área de transferência!', 'success');
    }).catch(() => {
        ToastManager.show('Erro ao copiar', 'error');
    });
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ef4444';
            
            // Remove error styling on input
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        ToastManager.show('Por favor, preencha todos os campos obrigatórios', 'warning');
    }
    
    return isValid;
}

// Loading overlay
const LoadingOverlay = {
    show: function(message = 'Carregando...') {
        let overlay = document.getElementById('loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.innerHTML = `
                <div style="
                    background: rgba(15, 15, 26, 0.95);
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    border-radius: 16px;
                    padding: 32px 48px;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                ">
                    <div class="spinner" style="
                        width: 48px;
                        height: 48px;
                        border: 4px solid rgba(168, 85, 247, 0.2);
                        border-top: 4px solid #a855f7;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 16px;
                    "></div>
                    <p style="color: white; font-weight: 600; margin: 0;">${message}</p>
                </div>
            `;
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
            `;
            document.body.appendChild(overlay);
            
            // Add spinner animation
            if (!document.getElementById('spinner-style')) {
                const style = document.createElement('style');
                style.id = 'spinner-style';
                style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }
        }
    },
    
    hide: function() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }
};

// Table search/filter
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    
    if (!input || !table) return;
    
    input.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });
}

// Export functions to global scope
window.ToastManager = ToastManager;
window.LoadingOverlay = LoadingOverlay;
window.confirmDelete = confirmDelete;
window.copyToClipboard = copyToClipboard;
window.validateForm = validateForm;
window.setupFilePreview = setupFilePreview;
window.searchTable = searchTable;

console.log('✨ 4Studio Admin Panel 2.0 - Sistema carregado com sucesso!');
