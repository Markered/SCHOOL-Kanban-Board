const { getState, persistState} = require('./helpers');


// --- 1. BOARDS ---

function saveBoard(boardId, boardData) {
    const state = getState();
    const existingBoard = state[boardId] || {};

    state[boardId] = {
        ...existingBoard,
        ...boardData,
        columns: boardData.columns || existingBoard.columns || []
    };

    persistState(state);
}

// --- 2. COLUMNS ---

function saveColumn(boardId, columnData) {
    const state = getState();
    const board = state[boardId];
    if (!board) return;

    if (!board.columns) board.columns = [];
    const existingIndex = board.columns.findIndex(col => col.id === columnData.id);

    if (existingIndex !== -1) {
        board.columns[existingIndex] = columnData;
    } else {
        board.columns.push(columnData);
    }

    persistState(state);
}

function deleteColumn(boardId, columnId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    board.columns = board.columns.filter(col => col.id !== columnId);
    persistState(state);
}

// --- 3. TASKS ---

function saveTask(boardId, columnId, taskData) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return;

    if (!column.tasks) column.tasks = [];
    const existingTaskIndex = column.tasks.findIndex(task => task.id === taskData.id);

    if (existingTaskIndex !== -1) {
        column.tasks[existingTaskIndex] = taskData;
    } else {
        column.tasks.push(taskData);
    }

    persistState(state);
}

function deleteTask(boardId, columnId, taskId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const column = board.columns.find(col => col.id === columnId);
    if (!column || !column.tasks) return;

    column.tasks = column.tasks.filter(task => task.id !== taskId);
    persistState(state);
}

module.exports = {
    saveBoard,
    saveColumn,
    deleteColumn,
    saveTask,
    deleteTask
};