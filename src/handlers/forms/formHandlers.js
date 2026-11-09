import { createBoard } from "../../services/boardService/index.js";
import { loadColumn } from "../../services/storageService/index.js";
import { createTask } from "../../services/taskService/index.js";
import renderView from "../../services/router/renderView.js";
import { submitBoardRename } from "../board/index.js";
import { submitColumnCreate, submitColumnRename } from "../column/index.js";
import { submitTaskEdit, submitTaskMove } from "../task/index.js";

document.addEventListener('submit', (e) => {
    const form = e.target.closest('form');
    if (!form) return;
    e.preventDefault();

    const handlers = {
        'board-form': submitBoard,
        'rename-form': submitBoardRename,
        'column-form': submitColumnCreate,
        'column-rename-form': submitColumnRename,
        'task-form': submitTaskCreateForm,
        'task-edit-form': submitTaskEdit,
        'move-task-form': submitTaskMove
    };
    const handler = Object.entries(handlers).find(([className]) => form.classList.contains(className))?.[1];
    if (handler) handler(form);

    form.reset();
    form.closest('dialog')?.close();
});

function submitBoard(form) {
    createBoard({ title: form.querySelector('#boardNameInput')?.value.trim() || 'Blank board' });
    renderView();
    return true;
}

function submitTaskCreateForm(form) {
    const boardId = form.dataset.boardId;
    const title = form.querySelector('#taskTitleInput')?.value.trim();
    const selectedColumnId = form.querySelector('#taskColumnInput')?.value;
    const column = boardId && selectedColumnId
        ? loadColumn(boardId, selectedColumnId) || loadColumn(boardId, Number(selectedColumnId))
        : null;
    if (!boardId || !column || !title) return false;
    submitTaskCreateData(form, boardId, column.id, title);
    renderView();
    return true;
}

function submitTaskCreateData(form, boardId, columnId, title) {
    const content = form.querySelector('#taskContentInput')?.value.trim() || '';
    const tags = [...new Set((form.querySelector('#taskTagsInput')?.value || '').split(',').map(tag => tag.trim()).filter(Boolean))];
    const task = { title, content, tags, priority: 'Normal', dueDate: '' };
    createTask(boardId, columnId, task);
}
