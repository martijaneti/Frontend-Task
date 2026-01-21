// AppController.js - Main application controller

class AppController {
    constructor(userModel, modalView, gridView, formView, notificationView) {
        this.userModel = userModel;
        this.modalView = modalView;
        this.gridView = gridView;
        this.formView = formView;
        this.notificationView = notificationView;
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        console.log('Inensia User Manager initialized');
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Logo click - open modal with grid
        const logo = document.getElementById('logo');
        logo.addEventListener('click', () => {
            this.openModal();
        });

        // Add User button - switch to form page
        const addUserBtn = document.getElementById('add-user-btn');
        addUserBtn.addEventListener('click', () => {
            this.showAddUserForm();
        });

        // Close buttons - close modal and return to landing
        const closeGridBtn = document.getElementById('close-grid-btn');
        const closeFormBtn = document.getElementById('close-form-btn');
        
        closeGridBtn.addEventListener('click', () => {
            this.closeModal();
        });

        closeFormBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Grid view events (edit and delete)
        this.gridView.bindEvents(
            (userId) => this.handleEditUser(userId),
            (userId) => this.handleDeleteUser(userId)
        );

        // Form submit event
        this.formView.bindSubmit((data) => {
            this.handleSaveUser(data);
        });

        // Click outside modal to close
        const overlay = document.getElementById('modal-overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
    }

    /**
     * Open modal and show grid page with user data
     */
    openModal() {
        this.modalView.show();
        this.modalView.showGrid();
        this.loadUsers();
    }

    /**
     * Close modal and return to landing page
     */
    closeModal() {
        this.modalView.hide();
    }

    /**
     * Load users from model and render in grid
     */
    loadUsers() {
        const users = this.userModel.getAll();
        this.gridView.render(users);
    }

    /**
     * Show form for adding a new user
     */
    showAddUserForm() {
        this.formView.clear();
        this.modalView.showForm();
    }

    /**
     * Handle editing a user
     * @param {string} userId - ID of user to edit
     */
    handleEditUser(userId) {
        const user = this.userModel.getById(userId);
        if (user) {
            this.formView.populate(user);
            this.modalView.showForm();
        }
    }

    /**
     * Handle deleting a user
     * @param {string} userId - ID of user to delete
     */
    handleDeleteUser(userId) {
        const success = this.userModel.delete(userId);
        
        if (success) {
            this.loadUsers(); // Refresh grid
            this.notificationView.success('User deleted successfully');
        } else {
            this.notificationView.error('Failed to delete user');
        }
    }

    /**
     * Handle saving a user (create or update)
     * @param {Object} userData - User data from form
     */
    handleSaveUser(userData) {
        try {
            const savedUser = this.userModel.save(userData);
            
            // Show success notification
            const message = userData.id ? 'User updated successfully' : 'User created successfully';
            this.notificationView.success(message);

            // Return to grid and refresh
            this.modalView.showGrid();
            this.loadUsers();
            
            // Clear form for next use
            this.formView.clear();
        } catch (error) {
            this.notificationView.error('Failed to save user');
            console.error('Save error:', error);
        }
    }
}

export default AppController;