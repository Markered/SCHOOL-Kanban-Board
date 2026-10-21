const { saveBoard } = require('../storageService');

function updateBoard(boardId, { title, thumbnail }) {
    const updates = {};
    
    if (title !== undefined) {
        updates.title = title;
    }
    
    if (thumbnail !== undefined) {
        updates.thumbnail = thumbnail;
    }

    saveBoard(boardId, updates);
}

module.exports = updateBoard;