const { getState, persistState } = require('../storageService/helpers');

function deleteColumn(boardId, columnId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const originalLength = board.columns.length;
    board.columns = board.columns.filter(col => col.id !== columnId);

    if (board.columns.length !== originalLength) {
        persistState(state);
    }
}

module.exports = deleteColumn;