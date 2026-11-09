import { createColumn, deleteColumn, reorderColumn, updateColumn } from "../../services/columnService/index.js";
import renderView from "../../services/router/renderView.js";

export function handleColumnAction(target) {
    const optionsToggle = target.closest('.column-options-toggle');
    if (optionsToggle) {
        const menu = optionsToggle.closest('.column-header')?.querySelector('.column-options-menu');
        if (menu) menu.hidden = !menu.hidden;
        return true;
    }

    const option = target.closest('[class^="column-option-"]');
    if (!option) return false;

    const column = option.closest('.board-column');
    const boardId = document.querySelector('.task-edit-form')?.dataset.boardId;
    const columnId = column?.dataset.id;
    if (!column || !boardId || !columnId) return true;

    const columns = [...column.parentElement.querySelectorAll('.board-column')];
    const index = columns.indexOf(column);

    if (option.classList.contains('column-option-delete')) {
        deleteColumn(boardId, columnId);
        renderView();
    } else if (option.classList.contains('column-option-left') && index > 0) {
        reorderColumn(boardId, columnId, columns[index - 1].dataset.id, 'before');
        renderView();
    } else if (option.classList.contains('column-option-right') && index < columns.length - 1) {
        reorderColumn(boardId, columnId, columns[index + 1].dataset.id, 'after');
        renderView();
    } else if (option.classList.contains('column-option-rename')) {
        openColumnRename(column, boardId, columnId);
    }
    return true;
}

function openColumnRename(column, boardId, columnId) {
    const modal = document.getElementById('renameColumnModal');
    const form = modal?.querySelector('form');
    const input = modal?.querySelector('#renameColumnInput');
    if (modal && form && input) {
        form.dataset.boardId = boardId;
        form.dataset.columnId = columnId;
        input.value = column.querySelector('h3')?.textContent || '';
        modal.showModal();
        input.focus();
    }
}

export function submitColumnCreate(form) {
    const title = form.querySelector('#columnTitleInput')?.value.trim();
    if (!form.dataset.boardId || !title) return false;
    createColumn(form.dataset.boardId, { title });
    renderView();
    return true;
}

export function submitColumnRename(form) {
    const title = form.querySelector('#renameColumnInput')?.value.trim();
    if (!form.dataset.boardId || !form.dataset.columnId || !title) return false;
    updateColumn(form.dataset.boardId, form.dataset.columnId, { title });
    renderView();
    return true;
}
