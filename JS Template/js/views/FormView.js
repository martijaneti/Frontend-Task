
class FormView {
    constructor() {
        this.form = document.getElementById('user-form');
        this.formTitle = document.getElementById('form-title');
        this.userIdInput = document.getElementById('user-id');
        this.nameInput = document.getElementById('user-name');
        this.emailInput = document.getElementById('user-email');
        this.phoneInput = document.getElementById('user-phone');
        this.additionalDetailsCheckbox = document.getElementById('additional-details-checkbox');
        this.categoryGroup = document.getElementById('category-group');
        this.categorySelect = document.getElementById('user-category');
        this.nameError = document.getElementById('name-error');

        this.setupCheckboxToggle();
    }

    /**
     * Set up the additional details checkbox to show/hide category dropdown
     */
    setupCheckboxToggle() {
        this.additionalDetailsCheckbox.addEventListener('change', () => {
            if (this.additionalDetailsCheckbox.checked) {
                this.categoryGroup.classList.remove('hidden');
            } else {
                this.categoryGroup.classList.add('hidden');
                this.categorySelect.value = '';
            }
        });
    }

    /**
     * Populate form with user data (for editing)
     * @param {Object} user - User object to populate
     */
    populate(user) {
        this.formTitle.textContent = 'Edit User';
        this.userIdInput.value = user.id || '';
        this.nameInput.value = user.name || '';
        this.emailInput.value = user.email || '';
        this.phoneInput.value = user.phone || '';
        
        if (user.hasAdditionalDetails) {
            this.additionalDetailsCheckbox.checked = true;
            this.categoryGroup.classList.remove('hidden');
            this.categorySelect.value = user.category || '';
        } else {
            this.additionalDetailsCheckbox.checked = false;
            this.categoryGroup.classList.add('hidden');
            this.categorySelect.value = '';
        }

        // Clear any error messages
        this.clearErrors();
    }

    /**
     * Clear the form (for adding new user)
     */
    clear() {
        this.formTitle.textContent = 'Add User';
        this.form.reset();
        this.userIdInput.value = '';
        this.categoryGroup.classList.add('hidden');
        this.clearErrors();
    }

    /**
     * Get form data as an object
     * @returns {Object} User data from form
     */
    getData() {
        const data = {
            id: this.userIdInput.value || null,
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim(),
            hasAdditionalDetails: this.additionalDetailsCheckbox.checked,
            category: this.additionalDetailsCheckbox.checked ? this.categorySelect.value : null
        };

        return data;
    }

    /**
     * Validate form data
     * @returns {boolean} True if valid, false otherwise
     */
    validate() {
        this.clearErrors();
        let isValid = true;

        // Name is required
        if (!this.nameInput.value.trim()) {
            this.showError(this.nameInput, this.nameError, 'Name is required');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Show error message for a field
     * @param {HTMLElement} input - Input element
     * @param {HTMLElement} errorElement - Error message element
     * @param {string} message - Error message
     */
    showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    /**
     * Clear all error messages
     */
    clearErrors() {
        this.nameInput.classList.remove('error');
        this.nameError.textContent = '';
    }

    /**
     * Bind form submit event
     * @param {Function} onSubmit - Callback when form is submitted
     */
    bindSubmit(onSubmit) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.validate()) {
                const data = this.getData();
                onSubmit(data);
            }
        });
    }
}

export default FormView;