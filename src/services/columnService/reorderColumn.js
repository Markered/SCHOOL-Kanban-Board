import { getState, persistState } from "../storageService/helpers.js";

function reorderColumn(boardId, columnId, targetColumnId, position = 'before') {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const currentIndex = board.columns.findIndex(col => String(col.id) === String(columnId));
    let targetIndex = board.columns.findIndex(col => String(col.id) === String(targetColumnId));

    if (currentIndex === -1 || targetIndex === -1) return;

    const [column] = board.columns.splice(currentIndex, 1);

    if (currentIndex < targetIndex) {
        targetIndex--;
    }

    if (position === 'after') {
        targetIndex++;
    }

    board.columns.splice(targetIndex, 0, column);

    persistState(state);
}

export default reorderColumn;