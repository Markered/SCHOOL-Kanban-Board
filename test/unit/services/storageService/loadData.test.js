const { loadData } = require('../../../../src/services/storageService');

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

describe('loadData Service', () => {
    const mockState = {
        "kanban1ID": {
            "title": "Kanban 1",
            "thumbnail": "https://example.com/kanban1-thumbnail.jpg",
            "columns": [
                {
                    "id": 1,
                    "title": "To Do",
                    "tasks": [
                        { "id": 1, "title": "Task 1", "content": "Description for Task 1", "tag": "To Do", "priority": "High", "dueDate": "2024-06-30" },
                        { "id": 2, "title": "Task 2", "content": "Description for Task 2", "tag": "To Do", "priority": "High", "dueDate": "2024-06-30" }
                    ]
                },
                {
                    "id": 2,
                    "title": "In Progress",
                    "tasks": [
                        { "id": 3, "title": "Task 3", "content": "Description for Task 3", "tag": "In Progress", "priority": "High", "dueDate": "2024-06-30" }
                    ]
                },
                {
                    "id": 3,
                    "title": "Done",
                    "tasks": [
                        { "id": 4, "title": "Task 4", "content": "Description for Task 4", "tag": "Completed", "priority": "High", "dueDate": "2024-06-30" }
                    ]
                }
            ]
        }
    };

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('kanban_app_state', JSON.stringify(mockState));
    });

    describe('when identifier is "all"', () => {
        it('should return all board cards with summary information', () => {
            const result = loadData({ type: 'boardCard', identifier: 'all' });
            
            expect(result).toEqual([
                {
                    id: "kanban1ID",
                    title: "Kanban 1",
                    thumbnail: "https://example.com/kanban1-thumbnail.jpg"
                }
            ]);
        });

        it('should return the entire board schema dictionary', () => {
            const result = loadData({ type: 'board', identifier: 'all' });
            
            expect(result).toHaveProperty("kanban1ID");
            expect(result["kanban1ID"].columns.length).toBe(3);
        });
    });

    describe('when identifier is a specific board ID', () => {
        it('should return a specific board card summary', () => {
            const result = loadData({ type: 'boardCard', identifier: 'kanban1ID' });
            
            expect(result).toEqual({
                id: "kanban1ID",
                title: "Kanban 1",
                thumbnail: "https://example.com/kanban1-thumbnail.jpg"
            });
        });

        it('should return the full board schema when type is "board"', () => {
            const result = loadData({ type: 'board', identifier: 'kanban1ID' });
            
            expect(result.title).toBe("Kanban 1");
            expect(result.columns[0].title).toBe("To Do");
        });

        it('should return tasks filtered by column when type is "cardByColumn"', () => {
            // Passing targetColumnId context (assuming your implementation checks column id 1)
            const result = loadData({ type: 'cardByColumn', identifier: 'kanban1ID', targetColumnId: 1 });
            
            expect(result.length).toBe(2);
            expect(result[0].title).toBe("Task 1");
            expect(result[1].title).toBe("Task 2");
        });

        it('should return a specific task when type is "card"', () => {
            const result = loadData({ type: 'card', identifier: 'kanban1ID', targetTaskId: 3 });
            
            expect(result).toEqual({
                id: 3,
                title: "Task 3",
                content: "Description for Task 3",
                tag: "In Progress",
                priority: "High",
                dueDate: "2024-06-30"
            });
        });
    });

    describe('edge cases', () => {
        it('should return null or empty structures if storage is empty', () => {
            localStorage.clear();
            const result = loadData({ type: 'board', identifier: 'all' });
            
            expect(result).toEqual({});
        });
    });
});