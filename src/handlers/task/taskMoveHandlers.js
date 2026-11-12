import { moveTask } from "../../services/taskService/index.js";
import renderView from "../../services/router/renderView.js";

export function openMoveTask(tile, columnId, taskId) {
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
