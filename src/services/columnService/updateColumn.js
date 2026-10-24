const { getState, persistState } = require('../storageService/helpers');

function updateColumn(boardId, columnId, { title }) {
    const state = getState();
    const board = state[boardId];

    if (!board || !board.columns) return;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return;

    if (title !== undefined) {
        column.title = title;
    }

    persistState(state);
}

module.exports = updateColumn;