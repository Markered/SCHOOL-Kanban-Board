import { getState } from "../../../services/storageService/helpers.js";

function CreateTaskModal(boardId) {
    const columns = getState()[boardId]?.columns || [];
    const columnField = columns.length
        ? `
                    <div class="task-column-picker">
                        <select class="task-field task-column-input" aria-label="Task column" required>
                            ${getColumnOptions(boardId)}
                        </select>
                        <button class="btn btn-secondary task-add-column" type="button" aria-label="Create a new column">+</button>
                        <input class="task-field task-new-column-input" type="text"
                            placeholder="New column name" aria-label="New column name" hidden />
                    </div>`
        : `
                    <input class="task-field task-column-input task-new-column-input" type="text"
                        placeholder="New column name" aria-label="New column name" required />`;

    return `
        <dialog class="task-modal task-create-modal" id="createTaskModal">
            <form class="task-form task-create-form" method="dialog" data-board-id="${boardId}">
                <header class="task-modal-header">
                    <input class="task-field task-title-input" type="text" id="taskTitleInput" placeholder="Task title" aria-label="Task title" required />
                </header>
                <textarea class="task-field task-content-input" id="taskContentInput" rows="4" aria-label="Task description" placeholder="Add a description"></textarea>
                ${columnField}
                <div class="task-meta">
                    <select class="task-field task-priority-input" id="taskPriorityInput" aria-label="Task priority">
                        ${['Low', 'Normal', 'High'].map(level => `<option${level === 'Normal' ? ' selected' : ''}>${level}</option>`).join('')}
                    </select>
                    <input class="task-field task-due-date-input" id="taskDueDateInput" type="date" aria-label="Task due date">
                </div>
                <div class="task-tag-section">
                    <div class="task-tags" aria-label="Task tags">
                        <span class="task-tags-empty">No tags</span>
                    </div>
                    <div class="task-tag-editor">
                        <input class="task-field task-tag-input" type="text" id="taskTagsInput" placeholder="Add tags separated by commas" aria-label="Task tags" />
                    </div>
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary task-create-cancel" type="button">Cancel</button>
                    <button class="btn btn-primary" type="submit">
                        <span class="menu-icon menu-icon-add-task" aria-hidden="true"></span>Create Task</button>
                </footer>
            </form>
        </dialog>
    `;
}

function getColumnOptions(boardId) {
    const state = getState();
    return (state[boardId]?.columns || [])
        .map(column => `<option value="${column.id}">${column.title}</option>`)
        .join('');
}

export default CreateTaskModal;
