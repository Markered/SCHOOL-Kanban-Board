import { handleModalTriggers } from './modal/modalHandlers.js';
import { handleBoardActions } from './board/index.js';
import './forms/formHandlers.js';
import renderView from '../services/router/renderView.js';

function registerListeners() {
    const app = document.getElementById('app');

    app.addEventListener('click', (e) => {
        const openOverlays = getOpenOverlays();
        closeActiveOverlays(e);
        if (handleModalTriggers(e)) {
            enforceSingleOverlay(openOverlays, e.target);
            return;
        }
        if (handleBoardActions(e)) {
            enforceSingleOverlay(openOverlays, e.target);
            return;
        }
        enforceSingleOverlay(openOverlays, e.target);
    });

    window.addEventListener('hashchange', renderView);
    window.addEventListener('DOMContentLoaded', renderView);
    window.addEventListener('addItem', renderView);
}

function closeActiveOverlays(e) {
    const clickedDialog = e.target.closest('dialog');
    if (clickedDialog && e.target === clickedDialog) {
        clickedDialog.close();
    }

    document.querySelectorAll('dialog[open]').forEach(dialog => {
        if (!dialog.contains(e.target)) {
            dialog.close();
        }
    });

    document.querySelectorAll('.task-options-menu:not([hidden]), .column-options-menu:not([hidden]), .board-options-menu:not([hidden])')
        .forEach(menu => {
            if (!menu.contains(e.target) && !menu.previousElementSibling?.contains(e.target)) {
                menu.hidden = true;
            }
        });

    document.querySelectorAll('details[open]').forEach(details => {
        if (!details.contains(e.target)) {
            details.removeAttribute('open');
        }
    });
}

function getOpenOverlays() {
    return [
        ...document.querySelectorAll('dialog[open], details[open], .task-options-menu:not([hidden]), .column-options-menu:not([hidden]), .board-options-menu:not([hidden])')
    ];
}

function enforceSingleOverlay(previousOverlays, target) {
    const openOverlays = getOpenOverlays();
    if (openOverlays.length <= 1) return;

    const newOverlay = openOverlays.find(overlay => !previousOverlays.includes(overlay));
    const activeOverlay = newOverlay || openOverlays.find(overlay => overlay.contains(target));
    if (!activeOverlay) return;

    openOverlays.forEach(overlay => {
        if (overlay !== activeOverlay) {
            if (overlay.matches('dialog')) {
                overlay.close();
            } else if (overlay.matches('details')) {
                overlay.removeAttribute('open');
            } else {
                overlay.hidden = true;
            }
        }
    });
}

export default registerListeners;