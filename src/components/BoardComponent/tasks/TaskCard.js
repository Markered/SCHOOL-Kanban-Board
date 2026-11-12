import TaskModal from "./TaskModal.js";
import escapeHtml from "../utils/escapeHtml.js";

function TaskCard(task, column) {
    const modalId = `task-modal-${column.id}-${task.id}`;
    const taskTags = task.tags || [];
    const visibleTags = taskTags.slice(0, 2)
        .map(tag => `<span class="task-tag">${escapeHtml(tag)}</span>`)
        .join('');
    const hiddenTagCount = taskTags.length - 2;
    const extraTags = hiddenTagCount > 0
        ? `<span class="task-tag task-tag-more">+${hiddenTagCount}</span>`
        : '';
    const priority = task.priority || 'Normal';
    const dueDate = task.dueDate || '';
    const content = task.content || '';

    return `
        <li>
            <div class="task-tile" data-modal-id="${modalId}" data-task-id="${task.id}" tabindex="0">
                <div class="task-options-menu" hidden>
                    <button type="button" class="task-option-edit">
                        <span class="menu-icon menu-icon-edit" aria-hidden="true"></span>Edit</button>
                    <button type="button" class="task-option-delete">
                        <span class="menu-icon menu-icon-delete" aria-hidden="true"></span>Delete</button>
                    <button type="button" class="task-option-up">
                        <span class="menu-icon menu-icon-top-arrow" aria-hidden="true"></span>Move up</button>
                    <button type="button" class="task-option-down">
                        <span class="menu-icon menu-icon-bottom-arrow" aria-hidden="true"></span>Move down</button>
                    <button type="button" class="task-option-move">
                        <span class="menu-icon menu-icon-right-arrow" aria-hidden="true"></span>Move column</button>
                </div>
                <span class="task-tile-meta">
                    <span class="task-tile-priority" data-priority="${escapeHtml(priority)}">${escapeHtml(priority)}</span>
                    <div class="task-tile-right-container">
                        <span class="task-tile-tags">${visibleTags}${extraTags}</span>
                        <button class="task-options-toggle" type="button" aria-label="Task options">⋮</button>
                    </div>
                </span>
                <span class="task-tile-title">${escapeHtml(task.title)}</span>
                <footer class="task-tile-footer">
                    <span class="task-tile-content">${escapeHtml(content)}</span>
                    <span class="task-tile-due-date">${escapeHtml(dueDate)}</span>
                </footer>
            </div>
            ${TaskModal(task, column, modalId)}
        </li>
    `;
}

export default TaskCard;
