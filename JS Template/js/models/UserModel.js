// UserModel.js - Manages user data in Local Storage

class UserModel {
    constructor() {
        this.storageKey = 'inensia_users';
    }

    /**
     * Get all users from Local Storage
     * @returns {Array} Array of user objects
     */
    getAll() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from Local Storage:', error);
            return [];
        }
    }

    /**
     * Get a single user by ID
     * @param {string} id - User ID
     * @returns {Object|null} User object or null if not found
     */
    getById(id) {
        const users = this.getAll();
        return users.find(user => user.id === id) || null;
    }

    /**
     * Save a user (create new or update existing)
     * @param {Object} user - User object to save
     * @returns {Object} Saved user object
     */
    save(user) {
        try {
            const users = this.getAll();
            
            if (user.id) {
                // Update existing user
                const index = users.findIndex(u => u.id === user.id);
                if (index !== -1) {
                    users[index] = user;
                }
            } else {
                // Create new user
                user.id = this.generateId();
                users.push(user);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(users));
            return user;
        } catch (error) {
            console.error('Error saving to Local Storage:', error);
            throw new Error('Failed to save user');
        }
    }

    /**
     * Delete a user by ID
     * @param {string} id - User ID to delete
     * @returns {boolean} True if deleted successfully
     */
    delete(id) {
        try {
            const users = this.getAll().filter(u => u.id !== id);
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error deleting from Local Storage:', error);
            return false;
        }
    }

    /**
     * Generate a unique ID for a new user
     * @returns {string} Unique ID
     */
    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Clear all users (useful for testing)
     */
    clearAll() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Error clearing Local Storage:', error);
        }
    }
}

export default UserModel;