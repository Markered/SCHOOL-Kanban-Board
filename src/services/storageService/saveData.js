function saveData({ type, identifier, data, targetColumnId }) {
    const rawData = localStorage.getItem('kanban_app_state');
    const state = rawData ? JSON.parse(rawData) : {};

    if (type === 'board') {
        state[identifier] = data;
    } else if (type === 'column') {
        const board = state[identifier];
        if (board) {
            board.columns.push(data);
        }
    } else if (type === 'card') {
        const board = state[identifier];
        if (board) {
            const colId = targetColumnId;

            for (const column of board.columns) {
                if (column.id === colId) {
                    column.tasks.push(data);
                    break;
                }
            }
        }
    }

    localStorage.setItem('kanban_app_state', JSON.stringify(state));
}

module.exports = saveData;