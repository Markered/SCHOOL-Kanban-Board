import { saveBoard } from '../storageService/index.js';

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

export default updateBoard;