const { saveData, loadData } = require('../../../../src/services/storageService');

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

describe('saveData Service', () => {
    const initialMockState = {
        "kanban1ID": {
            "title": "Kanban 1",
            "thumbnail": "https://example.com/kanban1-thumbnail.jpg",
            "columns": [
                {
                    "id": 1,
                    "title": "To Do",
                    "tasks": [
                        { "id": 1, "title": "Task 1", "content": "Description for Task 1", "tag": "To Do", "priority": "High", "dueDate": "2024-06-30" }
                    ]
                },
                {
                    "id": 2,
                    "title": "In Progress",
                    "tasks": []
                }
            ]
        }
    };

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('kanban_app_state', JSON.stringify(initialMockState));
    });

    describe('when type is "board"', () => {
        it('should create or completely overwrite a board in state', () => {
            const newBoardData = {
                title: "Kanban 2",
                thumbnail: "https://example.com/kanban2-thumbnail.jpg",
                columns: []
            };

            saveData({
                type: 'board',
                identifier: 'kanban2ID',
                data: newBoardData
            });

            const loadedBoard = loadData({ type: 'board', identifier: 'kanban2ID' });
            expect(loadedBoard).toEqual(newBoardData);
        });
    });

    describe('when type is "column"', () => {
        it('should append a new column to the specified board', () => {
            const newColumn = {
                id: 3,
                title: "Done",
                tasks: []
            };

            saveData({
                type: 'column',
                identifier: 'kanban1ID',
                data: newColumn
            });

            const board = loadData({ type: 'board', identifier: 'kanban1ID' });
            expect(board.columns.length).toBe(3);
            expect(board.columns[2].title).toBe("Done");
        });
    });

    describe('when type is "card"', () => {
        it('should push a new task into the correct column using targetColumnId', () => {
            const newTask = {
                id: 99,
                title: "New Test Task",
                content: "Testing task addition",
                tag: "In Progress",
                priority: "Medium",
                dueDate: "2026-12-31"
            };

            saveData({
                type: 'card',
                identifier: 'kanban1ID',
                targetColumnId: 2, // "In Progress" column
                data: newTask
            });

            const inProgressTasks = loadData({ 
                type: 'cardByColumn', 
                identifier: 'kanban1ID', 
                targetColumnId: 2 
            });

            expect(inProgressTasks.length).toBe(1);
            expect(inProgressTasks[0].title).toBe("New Test Task");
            expect(inProgressTasks[0].id).toBe(99);
        });
    });
});