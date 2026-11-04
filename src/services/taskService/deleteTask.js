import { getState, persistState } from '../storageService/helpers.js';

function deleteTask(boardId, columnId, taskId) {
    const state = getState();
    const board = state[boardId];
    if (!board || !board.columns) return;

    const column = board.columns.find(col => col.id === columnId);
    if (!column || !column.tasks) return;

    column.tasks = column.tasks.filter(task => task.id !== taskId);
    persistState(state);
}

export default deleteTask;