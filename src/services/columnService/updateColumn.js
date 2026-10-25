const { getState, persistState } = require('../storageService/helpers');

function updateColumn(boardId, columnId, updates) {
    const state = getState();
    
    const column = state[boardId]?.columns?.find(col => col.id === columnId);
    if (!column) return;

    const allowedFields = ['title'];

    for (const field of allowedFields) {
        if (updates[field] !== undefined) {
            column[field] = updates[field];
        }
    }

    persistState(state);
}

module.exports = updateColumn;