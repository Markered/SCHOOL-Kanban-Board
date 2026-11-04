import { getState, persistState } from '../storageService/helpers.js';

function deleteBoard(boardId) {
    const state = getState();
    delete state[boardId];
    persistState(state);
}

export default deleteBoard;