// GridView.js - Renders and manages the user grid/table

class GridView {
    constructor() {
        this.tableBody = document.getElementById('user-table-body');
        this.emptyState = document.getElementById('empty-state');
        this.table = document.getElementById('user-table');
    }

    /**
     * Render the user table with data
     * @param {Array} users - Array of user objects
     */
    render(users) {
        // Clear existing rows
        this.tableBody.innerHTML = '';

        // Show/hide empty state
        if (users.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.table.classList.add('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');
        this.table.classList.remove('hidden');

        // Create rows for each user
        users.forEach(user => {
            const row = this.createRow(user);
            this.tableBody.appendChild(row);
        });
    }

    /**
     * Create a table row for a user
     * @param {Object} user - User object
     * @returns {HTMLElement} Table row element
     */
    createRow(user) {
        const row = document.createElement('tr');
        row.dataset.userId = user.id;

        row.innerHTML = `
            <td>${this.escapeHtml(user.name)}</td>
            <td>${this.escapeHtml(user.email || '-')}</td>
            <td>${this.escapeHtml(user.phone || '-')}</td>
            <td class="actions-cell">
                <button class="btn btn-edit" data-action="edit" data-id="${user.id}">
                    ✏️ Open
                </button>
                <button class="btn btn-danger" data-action="delete" data-id="${user.id}">
                    🗑️ Delete
                </button>
            </td>
        `;

        return row;
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

    /**
     * Set up event delegation for table actions
     * @param {Function} onEdit - Callback when edit button is clicked
     * @param {Function} onDelete - Callback when delete button is clicked
     */
    bindEvents(onEdit, onDelete) {
        this.tableBody.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;

            const action = button.dataset.action;
            const userId = button.dataset.id;

            if (action === 'edit' && onEdit) {
                onEdit(userId);
            } else if (action === 'delete' && onDelete) {
                // Show confirmation before deleting
                if (confirm('Are you sure you want to delete this user?')) {
                    onDelete(userId);
                }
            }
        });
    }
}

export default GridView;