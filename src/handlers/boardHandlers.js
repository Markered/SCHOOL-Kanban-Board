import { deleteBoard } from "../services/boardService/index.js";
import renderView from "../services/router/renderView.js";

export function handleBoardActions(e) {
    const renameBtn = e.target.closest('.rename-option');
    const deleteBtn = e.target.closest('.delete-option');
    const optionsMenu = e.target.closest('.options-menu');
    const boardCard = e.target.closest('.boardCard');

    if (renameBtn) {
        const card = renameBtn.closest('.boardCard');
        const boardId = card ? card.dataset.id : null;
        if (boardId) {
            const modal = document.querySelector('#renameBoardModal');
            const input = document.querySelector('#renameBoardInput');

            if (modal && input && card) {
                input.value = card.querySelector('h3')?.textContent.trim() || '';
                modal.dataset.boardId = boardId;
                modal.showModal();
                input.focus();
            }
        }
        return true;
    }

    if (deleteBtn) {
        const card = deleteBtn.closest('.boardCard');
        const boardId = card ? card.dataset.id : null;
        if (boardId) {
            deleteBoard(boardId);
            renderView();
        }
        return true;
    }

    if (optionsMenu) {
        return true;
    }

    if (boardCard) {
        const boardId = boardCard.dataset.id;
        if (boardId) {
            window.location.hash = `#board/${boardId}`;
            renderView();
        }
        
        return true;
    }

    return false;
}