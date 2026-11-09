import { deleteTask, moveTask, reorderTask, updateTask } from "../../services/taskService/index.js";
import renderView from "../../services/router/renderView.js";

export function handleTaskAction(target) {
    const emptyPlaceholder = target.closest('.empty-task-placeholder');
    if (emptyPlaceholder) {
        const modal = document.getElementById('createTaskModal');
        const select = modal?.querySelector('#taskColumnInput');
        if (modal && select) {
            select.value = emptyPlaceholder.dataset.columnId;
            modal.showModal();
            modal.querySelector('#taskTitleInput')?.focus();
        }
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
            form.reset();
            renderTaskTags(form, form.querySelector('.task-tags-value').value);
            setTaskEditMode(form, false);
        }
        return true;
    }

    const exitButton = target.closest('.task-exit-btn');
    if (exitButton) {
        exitButton.closest('.task-modal')?.close();
        return true;
    }

    const addTagButton = target.closest('.add-task-tag');
    if (addTagButton) return addTask(addTagButton);

    const removeTagButton = target.closest('.remove-task-tag');
    if (removeTagButton) return removeTaskTag(removeTagButton);

    const taskTile = target.closest('.task-tile');
    if (taskTile && !target.closest('button')) {
        document.getElementById(taskTile.dataset.modalId)?.showModal();
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
        document.getElementById(tile.dataset.modalId)?.showModal();
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

function openMoveTask(tile, columnId, taskId) {
    const modal = document.getElementById('moveTaskModal');
    const form = modal?.querySelector('.move-task-form');
    const select = modal?.querySelector('#moveTaskColumnInput');
    if (!modal || !form || !select) return;

    form.elements.sourceColumnId.value = columnId;
    form.elements.taskId.value = taskId;
    select.value = [...select.options].find(option => String(option.value) !== String(columnId))?.value || '';
    modal.showModal();
    select.focus();
}

function addTask(button) {
    const form = button.closest('.task-edit-form');
    const input = form?.querySelector('.task-tag-input');
    if (!form || !input?.value.trim()) return true;
    const tags = parseTags(form.querySelector('.task-tags-value').value);
    tags.push(input.value.trim());
    renderTaskTags(form, tags.join(','));
    input.value = '';
    input.focus();
    return true;
}

function removeTaskTag(button) {
    const form = button.closest('.task-edit-form');
    const tags = parseTags(form.querySelector('.task-tags-value').value);
    tags.splice(Number(button.dataset.tagIndex), 1);
    renderTaskTags(form, tags.join(','));
    return true;
}

function setTaskEditMode(form, editing) {
    form.classList.toggle('is-editing', editing);
    if (editing) renderTaskTags(form, form.querySelector('.task-tags-value').value);
    form.querySelector('.task-title-input').readOnly = !editing;
    form.querySelector('.task-content-input').readOnly = !editing;
    form.querySelector('.task-due-date-input').readOnly = !editing;
    form.querySelector('.task-priority-input').disabled = !editing;
    form.querySelector('.task-tag-editor').hidden = !editing;
    form.querySelector('.task-edit-btn').hidden = editing;
    form.querySelector('.task-exit-btn').hidden = editing;
    form.querySelector('.task-edit-cancel').hidden = !editing;
    form.querySelector('.task-save-btn').hidden = !editing;
}

function renderTaskTags(form, value) {
    const tags = parseTags(value);
    form.querySelector('.task-tags-value').value = tags.join(',');
    form.querySelector('.task-tags').innerHTML = tags.length
        ? tags.map((tag, index) => `<span class="task-tag">${escapeHtml(tag)}<button class="remove-task-tag" type="button" data-tag-index="${index}" aria-label="Remove ${escapeHtml(tag)}">x</button></span>`).join('')
        : '<span class="task-tags-empty">No tags</span>';
}

function parseTags(value) {
    return [...new Set(value.split(',').map(tag => tag.trim()).filter(Boolean))];
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}

export function submitTaskEdit(form) {
    const title = form.elements.title.value.trim();
    const boardId = form.dataset.boardId;
    if (!boardId || !form.dataset.columnId || !form.dataset.taskId || !title) return false;
    updateTask(boardId, form.dataset.columnId, form.dataset.taskId, {
        title,
        content: form.elements.content.value.trim(),
        tags: parseTags(form.elements.tags.value),
        priority: form.elements.priority.value,
        dueDate: form.elements.dueDate.value
    });
    renderView();
    return true;
}

export function submitTaskMove(form) {
    const targetColumnId = form.querySelector('#moveTaskColumnInput')?.value;
    const sourceColumnId = form.elements.sourceColumnId.value;
    if (!form.dataset.boardId || !sourceColumnId || !form.elements.taskId.value || !targetColumnId ||
        String(sourceColumnId) === String(targetColumnId)) return false;
    if (moveTask(form.dataset.boardId, sourceColumnId, targetColumnId, form.elements.taskId.value)) {
        renderView();
        return true;
    }
    return false;
}
