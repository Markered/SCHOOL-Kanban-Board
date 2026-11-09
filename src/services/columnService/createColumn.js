import { saveColumn } from "../storageService/index.js";

function createColumn(boardId, { title }) {
    const id = crypto.randomUUID();
    saveColumn(boardId, { id, title, tasks: [] });
}

export default createColumn;