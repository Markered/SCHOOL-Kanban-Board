const { getState, persistState } = require("../storageService/helpers");

function moveTask(boardId, sourceColumnId, targetColumnId, taskId, targetTaskId = null, position = 'before') {
    const state = getState();
    const board = state[boardId];
    
    if (!board || !board.columns) return;

    const sourceCol = board.columns.find(col => col.id === sourceColumnId);
    const targetCol = board.columns.find(col => col.id === targetColumnId);

    if (!sourceCol || !targetCol || !sourceCol.tasks) return;

    const taskIndex = sourceCol.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

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
}

module.exports = moveTask;