import { createColumn } from "../../services/columnService/index.js";
import { moveTask, updateTask } from "../../services/taskService/index.js";
import renderView from "../../services/router/renderView.js";

export function setTaskEditMode(form, editing) {
    if (editing) {
        form.dataset.editSnapshot = JSON.stringify({
            title: form.elements.title.value,
            content: form.elements.content.value,
            columnId: form.elements.columnId.value,
            priority: form.elements.priority.value,
            dueDate: form.elements.dueDate.value,
            tags: form.elements.tags.value
        });
    }
    form.classList.toggle('is-editing', editing);
    if (editing) renderTaskTags(form, form.querySelector('.task-tags-value').value);
    form.querySelector('.task-title-input').readOnly = !editing;
    form.querySelector('.task-content-input').readOnly = !editing;
    form.querySelector('.task-due-date-input').readOnly = !editing;
    form.querySelector('.task-column-input').disabled = !editing;
    form.querySelector('.task-priority-input').disabled = !editing;
    form.querySelector('.task-tag-editor').hidden = !editing;
    form.querySelector('.task-edit-btn').hidden = editing;
    form.querySelector('.task-exit-btn').hidden = editing;
    form.querySelector('.task-edit-cancel').hidden = !editing;
    form.querySelector('.task-save-btn').hidden = !editing;
}

export function restoreTaskSnapshot(form) {
    const snapshot = form.dataset.editSnapshot
        ? JSON.parse(form.dataset.editSnapshot)
        : null;
    if (!snapshot) {
        form.reset();
    } else {
        form.elements.title.value = snapshot.title;
        form.elements.content.value = snapshot.content;
        form.elements.columnId.value = snapshot.columnId;
        form.elements.priority.value = snapshot.priority;
        form.elements.dueDate.value = snapshot.dueDate;
        form.elements.tags.value = snapshot.tags;
    }
    renderTaskTags(form, form.elements.tags.value);
    delete form.dataset.editSnapshot;
}

export function renderTaskTags(form, value) {
    const tags = parseTags(value);
    form.querySelector('.task-tags-value').value = tags.join(',');
    form.querySelector('.task-tags').innerHTML = tags.length
        ? tags.map((tag, index) => `<span class="task-tag">${escapeHtml(tag)}<button class="remove-task-tag" type="button" data-tag-index="${index}" aria-label="Remove ${escapeHtml(tag)}">x</button></span>`).join('')
        : '<span class="task-tags-empty">No tags</span>';
}

export function addTaskTag(button) {
    const form = button.closest('.task-form');
    const input = form?.querySelector('.task-tag-input');
    if (!form || !input?.value.trim()) return true;
    const tags = parseTags(form.querySelector('.task-tags-value').value);
    tags.push(input.value.trim());
    renderTaskTags(form, tags.join(','));
    input.value = '';
    input.focus();
    return true;
}

export function removeTaskTag(button) {
    const form = button.closest('.task-form');
    const tags = parseTags(form.querySelector('.task-tags-value').value);
    tags.splice(Number(button.dataset.tagIndex), 1);
    renderTaskTags(form, tags.join(','));
    return true;
}

export function submitTaskEdit(form) {
    const title = form.elements.title.value.trim();
    const boardId = form.dataset.boardId;
    if (!boardId || !form.dataset.columnId || !form.dataset.taskId || !title) return false;
    const newColumnTitle = form.querySelector('.task-new-column-input')?.value.trim();
    const targetColumnId = newColumnTitle
        ? createColumn(boardId, { title: newColumnTitle }).id
        : form.elements.columnId.value;
    updateTask(boardId, form.dataset.columnId, form.dataset.taskId, {
        title,
        content: form.elements.content.value.trim(),
        tags: parseTags(form.elements.tags.value),
        priority: form.elements.priority.value,
        dueDate: form.elements.dueDate.value
    });
    if (String(targetColumnId) !== String(form.dataset.columnId)) {
        moveTask(boardId, form.dataset.columnId, targetColumnId, form.dataset.taskId);
    }
    renderView();
    return true;
}

export function parseTags(value) {
    return [...new Set(value.split(',').map(tag => tag.trim()).filter(Boolean))];
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}
