function loadData({ type, identifier, targetColumnId, targetTaskId }) {
    const rawData = localStorage.getItem('kanban_app_state');
    const state = rawData ? JSON.parse(rawData) : {};

    if (identifier === 'all') {
        if (type === 'boardCard') {
            return Object.entries(state).map(([id, board]) => ({
                id,
                title: board.title,
                thumbnail: board.thumbnail
            }));
        } else if (type === 'board') {
            return state;
        } else if (type === 'column') {
            return Object.values(state).flatMap(board => board.columns);
        } else if (type === 'cardByColumn') {
            for (const board of Object.values(state)) {
                const targetColumn = board.columns.find(col => col.id === identifier);
                if (targetColumn) {
                    return targetColumn.tasks;
                }
            }
            return [];
        }
    } else {
        const board = state[identifier];
        if (!board) return null;

        if (type === 'boardCard') {
            return {
                id: identifier,
                title: board.title,
                thumbnail: board.thumbnail || board.thumbnails?.desktop
            };
        } else if (type === 'board') {
            return board;
        } else if (type === 'column') {
            return board.columns.find(col => col.id === targetColumnId);
        } else if (type === 'cardByColumn') {
            const targetColumn = board.columns.find(col => col.id === targetColumnId);
            return targetColumn ? targetColumn.tasks : [];
        } else if (type === 'card') {
            for (const column of board.columns) {
                const task = column.tasks.find(t => t.id === targetTaskId);
                if (task) return task;
            }
            return null;
        }
    }
}

module.exports = loadData;