import { saveBoard } from "../storageService/index.js";

function createBoard({title}) {
    const id = crypto.randomUUID();
    saveBoard(id, { title });
}

export default createBoard;