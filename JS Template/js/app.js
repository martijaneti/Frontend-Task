// app.js - Application entry point

import UserModel from './models/UserModel.js';
import ModalView from './views/ModalView.js';
import GridView from './views/GridView.js';
import FormView from './views/FormView.js';
import NotificationView from './views/NotificationView.js';
import AppController from './controllers/AppController.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const userModel = new UserModel();
    const modalView = new ModalView();
    const gridView = new GridView();
    const formView = new FormView();
    const notificationView = new NotificationView();

    // Initialize controller with all dependencies
    const app = new AppController(
        userModel,
        modalView,
        gridView,
        formView,
        notificationView
    );

    // Start the application
    app.init();

    // For debugging purposes (optional - can be removed in production)
    window.inensia = {
        userModel,
        modalView,
        gridView,
        formView,
        notificationView,
        controller: app
    };

    console.log('✨ Inensia User Manager loaded successfully');
});