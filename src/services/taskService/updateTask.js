import { getState, persistState } from "../storageService/helpers.js";

function updateTask(boardId, columnId, taskId, updates) {
    const state = getState();
    const column = state[boardId]?.columns?.find(col => String(col.id) === String(columnId));
    const task = column?.tasks?.find(t => String(t.id) === String(taskId));

    if (!task) return;

    const allowedFields = ['title', 'content', 'tags', 'priority', 'dueDate'];
    
    for (const field of allowedFields) {
        if (updates[field] !== undefined) {
            task[field] = updates[field];
        }
    }

    persistState(state);
}

export default updateTask;