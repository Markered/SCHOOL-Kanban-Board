const { getState } = require('./helpers');

// --- 1. BOARDS ---

function loadAllBoards() {
    return getState();
}

function loadBoard(boardId) {
    const state = getState();
    return state[boardId] || null;
}

function loadAllBoardCards() {
    const state = getState();
    return Object.entries(state).map(([id, board]) => ({
        id,
        title: board.title,
        thumbnail: board.thumbnail || board.thumbnails?.desktop
    }));
}

function loadBoardCard(boardId) {
    const state = getState();
    const board = state[boardId];
    if (!board) return null;
    return {
        id: boardId,
        title: board.title,
        thumbnail: board.thumbnail || board.thumbnails?.desktop
    };
}

// --- 2. COLUMNS ---

function loadAllColumns() {
    const state = getState();
    return Object.values(state).flatMap(board => board.columns || []);
}

function loadColumn(boardId, columnId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return null;
    return board.columns.find(col => col.id === columnId) || null;
}

// --- 3. TASKS ---

function loadColumnTasks(boardId, columnId) {
    const column = loadColumn(boardId, columnId);
    return column ? column.tasks || [] : [];
}

function loadTask(boardId, taskId) {
    const board = loadBoard(boardId);
    if (!board || !board.columns) return null;
    
    for (const column of board.columns) {
        const task = (column.tasks || []).find(t => t.id === taskId);
        if (task) return task;
    }
    return null;
}

module.exports = {
    loadAllBoards,
    loadBoard,
    loadAllBoardCards,
    loadBoardCard,
    loadAllColumns,
    loadColumn,
    loadColumnTasks,
    loadTask
};