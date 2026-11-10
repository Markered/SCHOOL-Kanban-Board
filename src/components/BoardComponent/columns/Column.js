import TaskCard from "../tasks/TaskCard.js";
import escapeHtml from "../utils/escapeHtml.js";

function Column(column) {
    const columnTasks = column.tasks || [];
    const tasks = columnTasks.length === 0
        ? `<li><button class="empty-task-placeholder" type="button" data-column-id="${column.id}">No tasks yet</button></li>`
        : columnTasks.map(task => TaskCard(task, column)).join('');

    return `
        <section class="board-column" data-id="${column.id}" data-board-id="${escapeHtml(column.boardId || '')}">
            <header class="column-header">
                <h3>${escapeHtml(column.title)}</h3>
                <button class="column-options-toggle" type="button" aria-label="Column options">⋮</button>
                <div class="column-options-menu" hidden>
                    <button type="button" class="column-option-rename">Rename</button>
                    <button type="button" class="column-option-delete">Delete</button>
                    <button type="button" class="column-option-left">Move left</button>
                    <button type="button" class="column-option-right">Move right</button>
                </div>
            </header>
            <ul class="task-list">${tasks}</ul>
        </section>
    `;
}

export default Column;
