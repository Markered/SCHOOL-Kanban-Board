const { saveColumn } = require("../storageService");

function createColumn({ title }) {
    const id = crypto.getRandomValues();
    saveColumn(id, { title: title });
}

module.exports = createColumn;