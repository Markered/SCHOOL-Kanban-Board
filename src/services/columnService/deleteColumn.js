import { getState, persistState } from '../storageService/helpers.js';

function deleteColumn(boardId, columnId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const originalLength = board.columns.length;
    board.columns = board.columns.filter(col => String(col.id) !== String(columnId));

    if (board.columns.length !== originalLength) {
        persistState(state);
    }
}

export default deleteColumn;