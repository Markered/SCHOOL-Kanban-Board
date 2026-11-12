import TaskCard from "../tasks/TaskCard.js";
import escapeHtml from "../utils/escapeHtml.js";

function Column(column) {
    const columnTasks = column.tasks || [];
    const tasks = columnTasks.length === 0
        ? `<li><button class="empty-task-placeholder" type="button" data-column-id="${column.id}">No tasks yet</button></li>`
        : `${columnTasks.map(task => TaskCard(task, column)).join('')}
            <li>
                <button class="column-add-task" type="button" data-column-id="${column.id}">
                    <span class="menu-icon menu-icon-add-task" aria-hidden="true"></span>Add task
                </button>
            </li>`;

    return `
        <section class="board-column" data-id="${column.id}" data-board-id="${escapeHtml(column.boardId || '')}">
            <header class="column-header">
                <h3>${escapeHtml(column.title)}</h3>
                <button class="column-options-toggle" type="button" aria-label="Column options">⋮</button>
                <div class="column-options-menu" hidden>
                    <button type="button" class="column-option-rename">
                        <span class="menu-icon menu-icon-edit" aria-hidden="true"></span>Rename</button>
                    <button type="button" class="column-option-delete">
                        <span class="menu-icon menu-icon-delete" aria-hidden="true"></span>Delete</button>
                    <button type="button" class="column-option-left">
                        <span class="menu-icon menu-icon-left-arrow" aria-hidden="true"></span>Move left</button>
                    <button type="button" class="column-option-right">
                        <span class="menu-icon menu-icon-right-arrow" aria-hidden="true"></span>Move right</button>
                </div>
            </header>
            <ul class="task-list">${tasks}</ul>
        </section>
    `;
}

export default Column;
