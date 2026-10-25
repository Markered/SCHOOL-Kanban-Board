const { getState, persistState } = require("../storageService/helpers");

function updateTask(boardId, columnId, taskId, updates) {
    const state = getState();
    const column = state[boardId]?.columns?.find(col => col.id === columnId);
    const task = column?.tasks?.find(t => t.id === taskId);

    if (!task) return;

    const allowedFields = ['title', 'content', 'tags', 'priority', 'dueDate'];
    
    for (const field of allowedFields) {
        if (updates[field] !== undefined) {
            task[field] = updates[field];
        }
    }

    persistState(state);
}

module.exports = updateTask;