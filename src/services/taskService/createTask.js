import { saveTask } from "../storageService/index.js";

function createTask(boardId, columnId, { title, content, tags, priority, dueDate }) {
    const id = crypto.randomUUID();
    saveTask(boardId, columnId, { id, title, content, tags, priority, dueDate });
}

export default createTask;
