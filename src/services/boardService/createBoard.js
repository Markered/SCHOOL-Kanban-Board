const crypto = require('crypto');
const { saveBoard } = require("../storageService");

function createBoard({title}) {
    const id = crypto.randomUUID();
    saveBoard(id, { title });
}

module.exports = createBoard;