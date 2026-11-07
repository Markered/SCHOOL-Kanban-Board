import { handleModalTriggers } from './modalHandlers.js';
import { handleBoardActions } from './boardHandlers.js';
import renderView from '../services/router/renderView.js';

function registerListeners() {
    const app = document.getElementById('app');

    app.addEventListener('click', (e) => {
        if (handleModalTriggers(e)) return;
        if (handleBoardActions(e)) return;
    });

    window.addEventListener('hashchange', renderView);
    window.addEventListener('DOMContentLoaded', renderView);
    window.addEventListener('addItem', renderView);
}

export default registerListeners;