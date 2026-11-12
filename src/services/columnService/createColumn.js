import { saveColumn } from "../storageService/index.js";

function createColumn(boardId, { title }) {
    const id = crypto.randomUUID();
    const column = { id, title, tasks: [] };
    saveColumn(boardId, column);
    return column;
}

export default createColumn;