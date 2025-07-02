/* =================================================================
   VoiceTel Admin Panel - Main JavaScript
   ================================================================= */

/**
 * Main Admin Panel Alpine.js Component
 * Handles sidebar, notifications, file uploads, and page interactions
 */
function adminPanel() {
    return {
        // State management
        sidebarOpen: false,
        loading: true,
        notifications: [],
        
        /**
         * Initialize the admin panel
         */
        init() {
            // Hide loading screen after initialization
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            
            // Handle window resize for responsive behavior
            this.handleWindowResize();
            
            // Initialize page animations
            this.initAnimations();
            
            // Initialize file upload handlers
            this.initFileUpload();
            
            // Initialize keyboard shortcuts
            this.initKeyboardShortcuts();
            
            // Initialize tooltips
            this.initTooltips();
        },
        
        /**
         * Check if current viewport is mobile
         */
        isMobile() {
            return window.innerWidth < 1024;
        },
        
        /**
         * Close sidebar when in mobile view
         */
        closeSidebarOnMobile() {
            if (this.isMobile()) {
                this.sidebarOpen = false;
            }
        },
        
        /**
         * Handle window resize events
         */
        handleWindowResize() {
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) {
                    this.sidebarOpen = false;
                }
            });
        },
        
        /**
         * Initialize page animations
         */
        initAnimations() {
            // Add staggered animation to cards
            const cards = document.querySelectorAll('.animate-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-slide-up');
                }, index * 100);
            });
            
            // Initialize intersection observer for scroll animations
            this.initScrollAnimations();
        },
        
        /**
         * Initialize scroll-based animations
         */
        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        },
        
        /**
         * Initialize file upload drag and drop functionality
         */
        initFileUpload() {
            const dropZones = document.querySelectorAll('.file-upload-area');
            
            dropZones.forEach(zone => {
                // Prevent default drag behaviors
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    zone.addEventListener(eventName, this.preventDefaults, false);
                    document.body.addEventListener(eventName, this.preventDefaults, false);
                });
                
                // Highlight drop zone when item is dragged over it
                ['dragenter', 'dragover'].forEach(eventName => {
                    zone.addEventListener(eventName, () => this.highlight(zone), false);
                });
                
                ['dragleave', 'drop'].forEach(eventName => {
                    zone.addEventListener(eventName, () => this.unhighlight(zone), false);
                });
                
                // Handle dropped files
                zone.addEventListener('drop', (e) => this.handleDrop(e, zone), false);
            });
        },
        
        /**
         * Prevent default drag behaviors
         */
        preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        
        /**
         * Highlight drop zone
         */
        highlight(zone) {
            zone.classList.add('drag-over');
        },
        
        /**
         * Remove highlight from drop zone
         */
        unhighlight(zone) {
            zone.classList.remove('drag-over');
        },
        
        /**
         * Handle file drop
         */
        handleDrop(e, zone) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            const fileInput = zone.querySelector('input[type="file"]');
            if (fileInput && files.length) {
                fileInput.files = files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
                
                // Show success message
                this.showNotification(`${files.length} arquivo(s) selecionado(s)`, 'success');
            }
        },
        
        /**
         * Initialize keyboard shortcuts
         */
        initKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Toggle sidebar with Ctrl/Cmd + B
                if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                    e.preventDefault();
                    this.sidebarOpen = !this.sidebarOpen;
                }
                
                // Close modal/dropdown with Escape
                if (e.key === 'Escape') {
                    this.closeAllDropdowns();
                    this.closeAllModals();
                }
                
                // Quick search with Ctrl/Cmd + K
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    const searchInput = document.querySelector('input[type="search"]');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            });
        },
        
        /**
         * Initialize tooltips
         */
        initTooltips() {
            const tooltipElements = document.querySelectorAll('[data-tooltip]');
            tooltipElements.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
                });
                
                element.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            });
        },
        
        /**
         * Show tooltip
         */
        showTooltip(element, text) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip fixed z-50 px-2 py-1 text-xs text-white bg-dark-900 border border-dark-600 rounded shadow-lg pointer-events-none';
            tooltip.textContent = text;
            tooltip.id = 'dynamic-tooltip';
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        },
        
        /**
         * Hide tooltip
         */
        hideTooltip() {
            const tooltip = document.getElementById('dynamic-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        },
        
        /**
         * Close all open dropdowns
         */
        closeAllDropdowns() {
            // Trigger click outside for Alpine.js dropdowns
            document.dispatchEvent(new Event('click'));
        },
        
        /**
         * Close all open modals
         */
        closeAllModals() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                const backdrop = modal.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.click();
                }
            });
        },
        
        /**
         * Show notification
         */
        showNotification(message, type = 'info', duration = 5000) {
            const id = Date.now();
            const notification = {
                id,
                message,
                type,
                show: false
            };
            
            // Add to notifications array
            this.notifications.push(notification);
            
            // Create notification element
            this.createNotificationElement(notification);
            
            // Auto remove after duration
            setTimeout(() => {
                this.removeNotification(id);
            }, duration);
        },
        
        /**
         * Create notification DOM element
         */
        createNotificationElement(notification) {
            const container = this.getNotificationContainer();
            
            const notificationEl = document.createElement('div');
            notificationEl.className = `notification fixed top-4 right-4 z-50 p-4 rounded-xl border shadow-lg max-w-sm transition-all duration-300 ${this.getNotificationClasses(notification.type)}`;
            notificationEl.id = `notification-${notification.id}`;
            
            notificationEl.innerHTML = `
                <div class="flex items-start">
                    <i class="${this.getNotificationIcon(notification.type)} mr-3 mt-0.5"></i>
                    <p class="flex-1 text-sm">${notification.message}</p>
                    <button onclick="adminPanel().removeNotification(${notification.id})" 
                            class="ml-2 text-gray-400 hover:text-white transition-colors">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(notificationEl);
            
            // Show notification with animation
            setTimeout(() => {
                notificationEl.classList.add('show');
            }, 100);
        },
        
        /**
         * Get or create notification container
         */
        getNotificationContainer() {
            let container = document.getElementById('notification-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'notification-container';
                container.className = 'fixed top-4 right-4 z-50 space-y-3';
                document.body.appendChild(container);
            }
            return container;
        },
        
        /**
         * Get notification CSS classes based on type
         */
        getNotificationClasses(type) {
            const classes = {
                success: 'bg-green-500/10 border-green-500/20 text-green-300',
                error: 'bg-red-500/10 border-red-500/20 text-red-300',
                warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
                info: 'bg-blue-500/10 border-blue-500/20 text-blue-300'
            };
            return classes[type] || classes.info;
        },
        
        /**
         * Get notification icon based on type
         */
        getNotificationIcon(type) {
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };
            return icons[type] || icons.info;
        },
        
        /**
         * Remove notification
         */
        removeNotification(id) {
            const notificationEl = document.getElementById(`notification-${id}`);
            if (notificationEl) {
                notificationEl.classList.remove('show');
                setTimeout(() => {
                    notificationEl.remove();
                }, 300);
            }
            
            // Remove from notifications array
            this.notifications = this.notifications.filter(n => n.id !== id);
        },
        
        /**
         * Confirm action with user
         */
        confirmAction(message, callback) {
            if (confirm(message)) {
                callback();
            }
        },
        
        /**
         * Copy text to clipboard
         */
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                this.showNotification('Texto copiado para a área de transferência!', 'success');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                this.showNotification('Falha ao copiar texto', 'error');
            }
        },
        
        /**
         * Format file size for display
         */
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        /**
         * Validate file type
         */
        validateFileType(file, allowedTypes) {
            return allowedTypes.includes(file.type);
        },
        
        /**
         * Validate file size
         */
        validateFileSize(file, maxSizeMB) {
            return file.size <= maxSizeMB * 1024 * 1024;
        },
        
        /**
         * Handle form submission with loading state
         */
        async submitForm(formElement, options = {}) {
            const { 
                showLoading = true, 
                successMessage = 'Operação realizada com sucesso!',
                errorMessage = 'Ocorreu um erro. Tente novamente.',
                resetForm = false 
            } = options;
            
            if (showLoading) {
                this.setFormLoading(formElement, true);
            }
            
            try {
                const formData = new FormData(formElement);
                const response = await fetch(formElement.action, {
                    method: formElement.method || 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.ok) {
                    this.showNotification(successMessage, 'success');
                    if (resetForm) {
                        formElement.reset();
                    }
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showNotification(errorMessage, 'error');
            } finally {
                if (showLoading) {
                    this.setFormLoading(formElement, false);
                }
            }
        },
        
        /**
         * Set form loading state
         */
        setFormLoading(formElement, isLoading) {
            const submitButton = formElement.querySelector('button[type="submit"]');
            const inputs = formElement.querySelectorAll('input, select, textarea');
            
            if (submitButton) {
                submitButton.disabled = isLoading;
                const originalText = submitButton.textContent;
                
                if (isLoading) {
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processando...';
                    submitButton.setAttribute('data-original-text', originalText);
                } else {
                    submitButton.textContent = submitButton.getAttribute('data-original-text') || originalText;
                    submitButton.removeAttribute('data-original-text');
                }
            }
            
            inputs.forEach(input => {
                input.disabled = isLoading;
            });
        }
    };
}

/**
 * Utility Functions
 */
window.VoiceTelUtils = {
    /**
     * Debounce function execution
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    /**
     * Throttle function execution
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Format date for display
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return new Intl.DateTimeFormat('pt-BR', { ...defaultOptions, ...options }).format(new Date(date));
    },
    
    /**
     * Generate unique ID
     */
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Alpine.js components
    if (typeof Alpine !== 'undefined') {
        Alpine.start();
    }
    
    // Initialize custom components that don't use Alpine.js
    initializeCustomComponents();
});

/**
 * Initialize custom components
 */
function initializeCustomComponents() {
    // Initialize auto-growing textareas
    const textareas = document.querySelectorAll('textarea.auto-grow');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Initialize copy buttons
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(textToCopy);
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = 'Copiar';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
    
    // Initialize auto-save forms
    const autoSaveForms = document.querySelectorAll('form[data-auto-save]');
    autoSaveForms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        const debounceTime = parseInt(form.getAttribute('data-auto-save')) || 2000;
        
        const autoSave = VoiceTelUtils.debounce(() => {
            // Implementation for auto-save functionality
            console.log('Auto-saving form data...');
        }, debounceTime);
        
        inputs.forEach(input => {
            input.addEventListener('input', autoSave);
        });
    });
}
