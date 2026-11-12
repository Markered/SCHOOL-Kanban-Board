import { deleteTask, reorderTask } from "../../services/taskService/index.js";
import renderView from "../../services/router/renderView.js";
import {
    addTaskTag,
    removeTaskTag,
    renderTaskTags,
    restoreTaskSnapshot,
    setTaskEditMode
} from "./taskEditHandlers.js";
import { openMoveTask } from "./taskMoveHandlers.js";

export function handleTaskAction(target) {
    const addColumnButton = target.closest('.task-add-column');
    if (addColumnButton) {
        const form = addColumnButton.closest('form');
        const select = form?.querySelector('.task-column-input');
        const input = form?.querySelector('.task-new-column-input');
        if (select && input) toggleColumnPicker(form);
        return true;
    }

    const createCancelButton = target.closest('.task-create-cancel');
    if (createCancelButton) {
        const form = createCancelButton.closest('.task-form');
        form?.reset();
        resetColumnPicker(form);
        resetCreateTaskForm(form);
        createCancelButton.closest('dialog')?.close();
        return true;
    }

    const addTaskButton = target.closest('.column-add-task');
    if (addTaskButton) {
        openCreateTaskModal(addTaskButton.dataset.columnId);
        return true;
    }

    const emptyPlaceholder = target.closest('.empty-task-placeholder');
    if (emptyPlaceholder) {
        openCreateTaskModal(emptyPlaceholder.dataset.columnId);
        return true;
    }

    const optionsToggle = target.closest('.task-options-toggle');
    if (optionsToggle) {
        const menu = optionsToggle.closest('.task-tile')?.querySelector('.task-options-menu');
        if (menu) menu.hidden = !menu.hidden;
        return true;
    }

    const option = target.closest('[class^="task-option-"]');
    if (option) {
        handleTaskOption(option);
        return true;
    }

    const editButton = target.closest('.task-edit-btn');
    if (editButton) {
        const form = editButton.closest('.task-modal')?.querySelector('.task-edit-form');
        if (form) {
            setTaskEditMode(form, true);
            editButton.hidden = true;
            form.querySelector('.task-title-input').focus();
        }
        return true;
    }

    const cancelButton = target.closest('.task-edit-cancel');
    if (cancelButton) {
        const form = cancelButton.closest('.task-modal')?.querySelector('.task-edit-form');
        if (form) {
            restoreTaskSnapshot(form);
            setTaskEditMode(form, false);
        }
        return true;
    }

    const exitButton = target.closest('.task-exit-btn');
    if (exitButton) {
        const modal = exitButton.closest('.task-modal');
        const form = modal?.querySelector('.task-edit-form');
        if (form) leaveTaskModal(form);
        modal?.close();
        return true;
    }

    const addTagButton = target.closest('.add-task-tag');
    if (addTagButton) return addTaskTag(addTagButton);

    const removeTagButton = target.closest('.remove-task-tag');
    if (removeTagButton) return removeTaskTag(removeTagButton);

    const taskTile = target.closest('.task-tile');
    if (taskTile && !target.closest('button')) {
        openTaskModal(document.getElementById(taskTile.dataset.modalId));
        return true;
    }

    return false;
}

function handleTaskOption(button) {
    const tile = button.closest('.task-tile');
    const form = tile?.parentElement?.querySelector('.task-edit-form');
    if (!tile || !form) return;

    const boardId = form.dataset.boardId;
    const columnId = form.dataset.columnId;
    const taskId = form.dataset.taskId;
    const tasks = [...tile.parentElement.parentElement.querySelectorAll('.task-tile')];
    const index = tasks.indexOf(tile);

    if (button.classList.contains('task-option-edit')) {
        openTaskModal(document.getElementById(tile.dataset.modalId));
        tile.closest('li')?.querySelector('.task-edit-btn')?.click();
    } else if (button.classList.contains('task-option-move')) {
        openMoveTask(tile, columnId, taskId);
    } else if (button.classList.contains('task-option-delete')) {
        deleteTask(boardId, columnId, taskId);
        renderView();
    } else if (button.classList.contains('task-option-up') && index > 0) {
        reorderTask(boardId, columnId, taskId, tasks[index - 1].dataset.taskId, 'before');
        renderView();
    } else if (button.classList.contains('task-option-down') && index < tasks.length - 1) {
        reorderTask(boardId, columnId, taskId, tasks[index + 1].dataset.taskId, 'after');
        renderView();
    }
}

function openTaskModal(modal) {
    const form = modal?.querySelector('.task-edit-form');
    if (!modal || !form) return;
    modal.addEventListener('close', () => leaveTaskModal(form), { once: true });
    modal.showModal();
}

function toggleColumnPicker(form) {
    const select = form.querySelector('.task-column-input');
    const input = form.querySelector('.task-new-column-input');
    if (!select || !input) return;
    if (form.classList.contains('task-edit-form') && !form.classList.contains('is-editing')) {
        setTaskEditMode(form, true);
        form.querySelector('.task-edit-btn').hidden = true;
    }
    const creatingColumn = input.hidden;
    select.hidden = creatingColumn;
    select.required = !creatingColumn;
    input.hidden = !creatingColumn;
    input.required = creatingColumn;
    if (creatingColumn) input.focus();
}

function leaveTaskModal(form) {
    if (form.classList.contains('is-editing')) restoreTaskSnapshot(form);
    resetColumnPicker(form);
    setTaskEditMode(form, false);
}

function resetColumnPicker(form) {
    const select = form?.querySelector('.task-column-input');
    const input = form?.querySelector('.task-new-column-input');
    if (!select || !input) return;
    select.hidden = false;
    select.required = true;
    input.hidden = true;
    input.required = false;
    input.value = '';
}

function openCreateTaskModal(columnId) {
    const modal = document.getElementById('createTaskModal');
    const form = modal?.querySelector('.task-create-form');
    const select = form?.querySelector('.task-column-input');
    if (!modal || !form || !select || select.tagName !== 'SELECT') return;

    form.dataset.columnId = String(columnId);
    select.value = String(columnId);
    select.closest('.task-column-picker').hidden = true;
    select.required = false;
    modal.showModal();
    modal.querySelector('#taskTitleInput')?.focus();
}

function resetCreateTaskForm(form) {
    if (!form) return;
    delete form.dataset.columnId;
    form.querySelector('.task-column-picker')?.removeAttribute('hidden');
    renderTaskTags(form, '');
}
