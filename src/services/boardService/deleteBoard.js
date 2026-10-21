const { getState, persistState } = require('../storageService/helpers');

function deleteBoard(boardId) {
    const state = getState();
    delete state[boardId];
    persistState(state);
}

module.exports = deleteBoard;