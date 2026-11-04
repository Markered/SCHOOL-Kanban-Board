import { saveColumn } from "../storageService/index.js";

function createColumn({ title }) {
    const id = crypto.getRandomValues();
    saveColumn(id, { title: title });
}

export default createColumn;