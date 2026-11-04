import { getState, persistState } from "../storageService/helpers.js";

function reorderTask(boardId, columnId, taskId, targetTaskId, position = 'before') {
    const state = getState();
    const column = state[boardId]?.columns?.find(col => col.id === columnId);
    
    if (!column || !column.tasks) return;

    const taskIndex = column.tasks.findIndex(t => t.id === taskId);
    const targetIndex = column.tasks.findIndex(t => t.id === targetTaskId);

    if (taskIndex === -1 || targetIndex === -1) return;

    const [task] = column.tasks.splice(taskIndex, 1);

    let newTargetIndex = column.tasks.findIndex(t => t.id === targetTaskId);
    if (position === 'after') {
        newTargetIndex += 1;
    }

    column.tasks.splice(newTargetIndex, 0, task);

    persistState(state);
}

export default reorderTask;