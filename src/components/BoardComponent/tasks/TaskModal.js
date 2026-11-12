import escapeHtml from "../utils/escapeHtml.js";
import { getState } from "../../../services/storageService/helpers.js";

function TaskModal(task, column, modalId) {
    const priority = task.priority || 'Normal';
    const dueDate = task.dueDate || '';
    const tags = (task.tags || []).map(tag => `<span class="task-tag">${escapeHtml(tag)}</span>`).join('');

    return `
        <dialog class="task-modal" id="${modalId}">
            <form class="task-edit-form" data-board-id="${escapeHtml(column.boardId || '')}" data-column-id="${column.id}" data-task-id="${task.id}">
                <header class="task-modal-header">
                    <input class="task-field task-title-input" name="title" type="text" value="${escapeHtml(task.title)}" placeholder="Task title" aria-label="Task title" readonly required>
                    <button class="btn btn-primary task-edit-btn" type="button">
                        <span class="menu-icon menu-icon-edit" aria-hidden="true"></span>Edit</button>
                </header>
                <textarea class="task-field task-content-input" name="content" rows="4" aria-label="Task description" readonly placeholder="Add a description">${escapeHtml(task.content || '')}</textarea>
                <div class="task-column-picker">
                    <select class="task-field task-column-input" name="columnId" aria-label="Task column" disabled>
                        ${getColumnOptions(column.boardId, column.id)}
                    </select>
                    <button class="btn btn-secondary task-add-column" type="button" aria-label="Create a new column">+</button>
                    <input class="task-field task-new-column-input" type="text"
                        placeholder="New column name" aria-label="New column name" hidden>
                </div>
                <div class="task-meta">
                    <select class="task-field task-priority-input" name="priority" aria-label="Priority" disabled>
                        ${['Low', 'Normal', 'High'].map(level => `<option${priority === level ? ' selected' : ''}>${level}</option>`).join('')}
                    </select>
                    <input class="task-field task-due-date-input" name="dueDate" type="date" value="${escapeHtml(dueDate)}" aria-label="Due date" readonly>
                </div>
                <div class="task-tag-section">
                    <div class="task-tags" aria-label="Task tags">${tags || '<span class="task-tags-empty">No tags</span>'}</div>
                    <div class="task-tag-editor" hidden>
                        <input class="task-field task-tag-input" type="text" placeholder="Add tags" aria-label="New tag">
                        <button class="btn btn-secondary add-task-tag" type="button" aria-label="Add tag">+</button>
                    </div>
                    <input class="task-tags-value" name="tags" type="hidden" value="${escapeHtml((task.tags || []).join(', '))}">
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary task-exit-btn" type="button">Exit</button>
                    <button class="btn btn-secondary task-edit-cancel" type="button" hidden>Cancel</button>
                    <button class="btn btn-primary task-save-btn" type="submit" hidden>Save changes</button>
                </footer>
            </form>
        </dialog>
    `;
}

function getColumnOptions(boardId, selectedColumnId) {
    const state = getState();
    return (state[boardId]?.columns || [])
        .map(item => `<option value="${escapeHtml(item.id)}"${String(item.id) === String(selectedColumnId) ? ' selected' : ''}>${escapeHtml(item.title)}</option>`)
        .join('');
}

export default TaskModal;
