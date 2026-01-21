// NotificationView.js - Manages toast notifications

class NotificationView {
    constructor() {
        this.container = document.getElementById('notification-container');
    }

    /**
     * Show a notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification ('success' or 'error')
     * @param {number} duration - Duration in milliseconds (default 3000)
     */
    show(message, type = 'success', duration = 3000) {
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);

        // Auto-dismiss after duration
        setTimeout(() => {
            this.remove(notification);
        }, duration);
    }

    /**
     * Create a notification element
     * @param {string} message - Message to display
     * @param {string} type - Type of notification
     * @returns {HTMLElement} Notification element
     */
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icon = type === 'success' ? '<i class="fas fa-save"></i>' : '<i class="fa-solid fa-x"></i>';
        
        notification.innerHTML = `
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${this.escapeHtml(message)}</span>
        `;

        return notification;
    }

    /**
     * Remove a notification with animation
     * @param {HTMLElement} notification - Notification element to remove
     */
    remove(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    /**
     * Show success notification
     * @param {string} message - Success message
     */
    success(message) {
        this.show(message, 'success');
    }

    /**
     * Show error notification
     * @param {string} message - Error message
     */
    error(message) {
        this.show(message, 'error');
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add slideOutRight animation to CSS if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

export default NotificationView;