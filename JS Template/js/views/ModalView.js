// ModalView.js - Manages modal visibility and page switching

class ModalView {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.gridPage = document.getElementById('grid-page');
        this.formPage = document.getElementById('form-page');
    }

    /**
     * Show the modal overlay
     */
    show() {
        this.overlay.classList.remove('hidden');
    }

    /**
     * Hide the modal overlay
     */
    hide() {
        this.overlay.classList.add('hidden');
    }

    /**
     * Show the grid page and hide the form page
     */
    showGrid() {
        this.gridPage.classList.remove('hidden');
        this.formPage.classList.add('hidden');
    }

    /**
     * Show the form page and hide the grid page
     */
    showForm() {
        this.formPage.classList.remove('hidden');
        this.gridPage.classList.add('hidden');
    }

    /**
     * Toggle between grid and form pages
     */
    togglePage() {
        const isGridVisible = !this.gridPage.classList.contains('hidden');
        if (isGridVisible) {
            this.showForm();
        } else {
            this.showGrid();
        }
    }
}

export default ModalView;