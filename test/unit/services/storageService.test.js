/**
 * @jest-environment jsdom
 */

import {
    loadAllBoards,
    loadBoard,
    loadAllBoardCards,
    loadBoardCard,
    loadAllColumns,
    loadColumn,
    loadColumnTasks,
    loadTask,
    saveBoard,
    saveColumn,
    saveTask,
} from '../../../src/services/storageService/index.js';
import { getMockSchema } from '../../fixtures/index.js';

describe('Storage Service Tests', () => {
    const initialMockState = getMockSchema();

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('kanban_app_state', JSON.stringify(initialMockState));
    });

    describe('Loaders', () => {
        it('loadAllBoards should return the entire state dictionary', () => {
            const result = loadAllBoards();
            expect(result).toEqual(initialMockState);
        });

        it('loadBoard should return a specific board by ID', () => {
            const result = loadBoard('kanban1ID');
            expect(result.title).toBe("Kanban 1");
        });

        it('loadAllBoardCards should return summaries for all boards', () => {
            const result = loadAllBoardCards();
            expect(result).toEqual([
                {
                    id: "kanban1ID",
                    title: "Kanban 1",
                    thumbnail: "https://example.com/kanban1-thumbnail.jpg"
                }
            ]);
        });

        it('loadBoardCard should return a summary for a specific board', () => {
            const result = loadBoardCard('kanban1ID');
            expect(result).toEqual({
                id: "kanban1ID",
                title: "Kanban 1",
                thumbnail: "https://example.com/kanban1-thumbnail.jpg"
            });
        });

        it('loadAllColumns should return all columns flattened across boards', () => {
            const result = loadAllColumns();
            expect(result.length).toBe(2);
            expect(result[0].title).toBe("To Do");
        });

        it('loadColumn should return a specific column', () => {
            const result = loadColumn('kanban1ID', 1);
            expect(result.title).toBe("To Do");
        });

        it('loadColumnTasks should return tasks belonging to a column', () => {
            const result = loadColumnTasks('kanban1ID', 1);
            expect(result.length).toBe(1);
            expect(result[0].title).toBe("Task 1");
        });

        it('loadTask should return a specific task across columns', () => {
            const result = loadTask('kanban1ID', 1);
            expect(result.title).toBe("Task 1");
            expect(result.id).toBe(1);
        });
    });

    describe('Board Mutators', () => {
        it('saveBoard should create or completely overwrite a board', () => {
            const newBoard = { title: "Kanban 2", thumbnail: "", columns: [] };
            saveBoard('kanban2ID', newBoard);

            expect(loadBoard('kanban2ID')).toEqual(newBoard);
        });
    });

    describe('Column Mutators', () => {
        it('saveColumn should append a new column if it does not exist', () => {
            const newCol = { id: 3, title: "Done", tasks: [] };
            saveColumn('kanban1ID', newCol);

            const board = loadBoard('kanban1ID');
            expect(board.columns.length).toBe(3);
            expect(board.columns[2].title).toBe("Done");
        });

        it('saveColumn should overwrite an existing column if ID matches', () => {
            const updatedCol = { id: 1, title: "To Do - Edited", tasks: [] };
            saveColumn('kanban1ID', updatedCol);

            const board = loadBoard('kanban1ID');
            expect(board.columns.length).toBe(2);
            expect(board.columns[0].title).toBe("To Do - Edited");
        });
    });

    describe('Task Mutators', () => {
        it('saveTask should append a new task if it does not exist', () => {
            const newTask = { id: 99, title: "New Task", content: "Test", priority: "Low" };
            saveTask('kanban1ID', 2, newTask);
            const tasks = loadColumnTasks('kanban1ID', 2);
            expect(tasks.length).toBe(1);
            expect(tasks[0].title).toBe("New Task");
        });

        it('saveTask should overwrite an existing task if ID matches', () => {
            const updatedTask = { id: 1, title: "Task 1 Updated", content: "New content", priority: "Urgent" };
            saveTask('kanban1ID', 1, updatedTask);

            const task = loadTask('kanban1ID', 1);
            expect(task.title).toBe("Task 1 Updated");
            expect(task.priority).toBe("Urgent");
        });
    });
});