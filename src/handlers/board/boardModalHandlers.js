import { updateBoard } from "../../services/boardService/index.js";
import renderView from "../../services/router/renderView.js";

export function handleBoardModalAction(target) {
    const renameButton = target.closest('.board-option-rename');
    if (renameButton) {
        const header = renameButton.closest('.board-view-header');
        const modal = document.getElementById('renameBoardModal');
        const form = modal?.querySelector('.rename-form');
        const input = modal?.querySelector('#renameBoardInput');
        if (header && modal && form && input) {
            form.dataset.boardId = header.dataset.boardId;
            input.value = header.querySelector('h2')?.textContent.trim() || '';
            modal.showModal();
            input.focus();
        }
        return true;
    }

    const optionsToggle = target.closest('.board-options-toggle');
    if (optionsToggle) {
        const menu = optionsToggle.closest('.board-options-container')?.querySelector('.board-options-menu');
        if (menu) menu.hidden = !menu.hidden;
        return true;
    }
    return false;
}

export function submitBoardRename(form) {
    const title = form.querySelector('#renameBoardInput')?.value.trim();
    const boardId = form.dataset.boardId || form.closest('.modal-dialog')?.dataset.boardId;
    if (!boardId || !title) return false;

    updateBoard(boardId, { title });
    renderView();
    return true;
}
