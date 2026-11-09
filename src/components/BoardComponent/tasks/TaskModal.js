import escapeHtml from "../utils/escapeHtml.js";

function TaskModal(task, column, modalId) {
    const priority = task.priority || 'Normal';
    const dueDate = task.dueDate || '';
    const tags = (task.tags || []).map(tag => `<span class="task-tag">${escapeHtml(tag)}</span>`).join('');

    return `
        <dialog class="task-modal" id="${modalId}">
            <form class="task-edit-form" data-board-id="${escapeHtml(column.boardId || '')}" data-column-id="${column.id}" data-task-id="${task.id}">
                <header class="task-modal-header">
                    <input class="task-field task-title-input" name="title" type="text" value="${escapeHtml(task.title)}" aria-label="Task name" readonly required>
                    <button class="btn btn-primary task-edit-btn" type="button">Edit</button>
                </header>
                <div class="task-meta">
                    <label class="task-field-group">
                        <span>Priority</span>
                        <select class="task-field task-priority-input" name="priority" aria-label="Priority" disabled>
                            ${['Low', 'Normal', 'High'].map(level => `<option${priority === level ? ' selected' : ''}>${level}</option>`).join('')}
                        </select>
                    </label>
                    <label class="task-field-group">
                        <span>Due Date</span>
                        <input class="task-field task-due-date-input" name="dueDate" type="date" value="${escapeHtml(dueDate)}" aria-label="Due date" readonly>
                    </label>
                </div>
                <div class="task-tag-section">
                    <span>Tags</span>
                    <div class="task-tags">${tags || '<span class="task-tags-empty">No tags</span>'}</div>
                    <div class="task-tag-editor" hidden>
                        <input class="task-field task-tag-input" type="text" placeholder="Add a tag" aria-label="New tag">
                        <button class="btn btn-secondary add-task-tag" type="button">Add tag</button>
                    </div>
                    <input class="task-tags-value" name="tags" type="hidden" value="${escapeHtml((task.tags || []).join(', '))}">
                </div>
                <label class="task-field-group task-content-group">
                    <span>Content</span>
                    <textarea class="task-field task-content-input" name="content" rows="5" aria-label="Content" readonly placeholder="No content">${escapeHtml(task.content || '')}</textarea>
                </label>
                <footer class="modal-footer">
                    <button class="btn btn-secondary task-exit-btn" type="button">Exit</button>
                    <button class="btn btn-secondary task-edit-cancel" type="button" hidden>Cancel</button>
                    <button class="btn btn-primary task-save-btn" type="submit" hidden>Save changes</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default TaskModal;
