function getState() {
    const rawData = localStorage.getItem('kanban_app_state');
    return rawData ? JSON.parse(rawData) : {};
}

function persistState(state) {
    localStorage.setItem('kanban_app_state', JSON.stringify(state));
}

module.exports = { getState, persistState };