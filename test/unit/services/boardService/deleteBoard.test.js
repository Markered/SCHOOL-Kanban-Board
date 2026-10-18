const { deleteBoard } = require('../../../src/services/boardService/deleteBoard');

describe('deleteBoard', () => {
    const currentState = {
        "kanban1ID": { title: "Kanban 1", columns: [] },
        "kanban2ID": { title: "Kanban 2", columns: [] }
    };

    const newState = deleteBoard({ state: currentState, boardId: "kanban1ID" });

    it('should filter out the board from the new state', () => {
        expect(newState).not.toHaveProperty("kanban1ID");
        expect(newState).toHaveProperty("kanban2ID");  
    });

    it('should still contain the remaining boards', () => {
        expect(newState).toEqual({
            "kanban2ID": { title: "Kanban 2", columns: [] }
        });
    });
});