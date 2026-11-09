import { getState, persistState } from '../storageService/helpers.js';

function updateColumn(boardId, columnId, updates) {
    const state = getState();
    
    const column = state[boardId]?.columns?.find(col => String(col.id) === String(columnId));
    if (!column) return;

    const allowedFields = ['title'];

    for (const field of allowedFields) {
        if (updates[field] !== undefined) {
            column[field] = updates[field];
        }
    }

    persistState(state);
}

export default updateColumn;