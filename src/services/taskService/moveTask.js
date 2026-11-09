import { getState, persistState } from "../storageService/helpers.js";

function moveTask(boardId, sourceColumnId, targetColumnId, taskId, targetTaskId = null, position = 'before') {
    const state = getState();
    const board = state[boardId];
    
    if (!board || !board.columns) return;

    const sourceCol = board.columns.find(col => String(col.id) === String(sourceColumnId));
    const targetCol = board.columns.find(col => String(col.id) === String(targetColumnId));

    if (!sourceCol || !targetCol || String(sourceColumnId) === String(targetColumnId) || !sourceCol.tasks) return false;

    const taskIndex = sourceCol.tasks.findIndex(t => String(t.id) === String(taskId));
    if (taskIndex === -1) return false;

    const [task] = sourceCol.tasks.splice(taskIndex, 1);

    if (!targetCol.tasks) {
        targetCol.tasks = [];
    }

    if (targetTaskId !== null && targetTaskId !== undefined) {
        const targetIndex = targetCol.tasks.findIndex(t => t.id === targetTaskId);
        if (targetIndex !== -1) {
            const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex;
            targetCol.tasks.splice(insertIndex, 0, task);
        } else {
            targetCol.tasks.push(task);
        }
    } else {
        targetCol.tasks.push(task);
    }

    persistState(state);
    return true;
}

export default moveTask;