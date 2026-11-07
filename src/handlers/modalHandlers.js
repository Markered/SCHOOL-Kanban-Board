import { createBoard, updateBoard } from "../services/boardService/index.js";
import renderView from "../services/router/renderView.js";

export function handleModalTriggers(e) {
    const openModalBtn = e.target.closest('.openCreateBoardModalBtn');
    const cancelBtn = e.target.closest('button[type="reset"]');

    if (openModalBtn) {
        const modal = document.querySelector('.modal-dialog');
        if (modal) modal.showModal();
        return true; 
    }

    if (cancelBtn) {
        const modal = e.target.closest('.modal-dialog');
        if (modal) modal.close();
        return true; 
    }

    return false;
}

function handleAddBoard(title) {
    const boardTitle = title ? title : 'Blank board';
    createBoard({title: boardTitle});
}

document.addEventListener('submit', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    e.preventDefault();

    if (form.classList.contains('board-form')) {
        const input = form.querySelector('#boardNameInput');
        handleAddBoard(input ? input.value.trim() : '');
        renderView();
    } else if (form.classList.contains('rename-form')) {
        const modal = form.closest('.modal-dialog');
        const input = form.querySelector('#renameBoardInput');
        const title = input ? input.value.trim() : '';
        const boardId = modal ? modal.dataset.boardId : '';

        if (boardId && title) {
            updateBoard(boardId, { title });
            renderView();
        }
    }

    form.reset();
    const modal = form.closest('dialog');
    if (modal) modal.close();
});