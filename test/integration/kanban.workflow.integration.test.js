/**
 * @jest-environment jsdom
 */

const { updateBoard, deleteBoard } = require('../../src/services/boardService');
const { updateColumn, deleteColumn } = require('../../src/services/columnService');
const { createTask, updateTask, deleteTask, reorderTask, moveTask } = require('../../src/services/taskService');
const { loadBoard, loadColumn, loadTask } = require('../../src/services/storageService');
const { getMockSchema } = require('../fixtures');

describe('Full Kanban Workflow Integration Tests', () => {
    beforeEach(() => {
        localStorage.clear();
        const mockState = getMockSchema();
        localStorage.setItem('kanban_app_state', JSON.stringify(mockState));
    });

    it('should successfully execute a full lifecycle across boards, columns, and tasks', () => {
        const boardId = 'kanban1ID';
        const columnId1 = 1; // 'To Do' column in mock schema
        const columnId2 = 2; // 'In Progress' column in mock schema

        // --- STEP 1: BOARD SERVICE ---
        // Update the board title
        updateBoard(boardId, { title: 'Master Production Board' });
        
        let board = loadBoard(boardId);
        expect(board.title).toBe('Master Production Board');
        expect(board.thumbnail).toBe('https://example.com/kanban1-thumbnail.jpg'); // Preserved


        // --- STEP 2: COLUMN SERVICE ---
        // Update the column title
        updateColumn(boardId, columnId1, { title: 'Backlog & Ideas' });

        let column1 = loadColumn(boardId, columnId1);
        expect(column1.title).toBe('Backlog & Ideas');


        // --- STEP 3: TASK SERVICE (Create) ---
        // Create a brand new task inside column 1
        const newTaskData = {
            title: 'Refactor Auth Module',
            content: 'Upgrade to OAuth2 tokens',
            tags: ['Security', 'Backend'],
            priority: 'High',
            dueDate: '2026-11-30'
        };

        createTask(boardId, columnId1, newTaskData);

        board = loadBoard(boardId);
        column1 = board.columns.find(col => col.id === columnId1);
        
        // Initial schema had 1 task (id: 1) + 1 new one = 2 tasks total
        expect(column1.tasks.length).toBe(2); 

        const createdTask = column1.tasks.find(t => t.title === 'Refactor Auth Module');
        expect(createdTask).toBeDefined();
        const createdTaskId = createdTask.id;


        // --- STEP 4: TASK SERVICE (Reorder) ---
        // Reorder the newly created task to be before the original Task 1
        reorderTask(boardId, columnId1, createdTaskId, 1, 'before');

        board = loadBoard(boardId);
        column1 = board.columns.find(col => col.id === columnId1);
        expect(column1.tasks[0].id).toBe(createdTaskId); // New task should now be first


        // --- STEP 5: TASK SERVICE (Move) ---
        // Move the newly created task from Column 1 to Column 2 ('In Progress')
        moveTask(boardId, columnId1, columnId2, createdTaskId);

        board = loadBoard(boardId);
        column1 = board.columns.find(col => col.id === columnId1);
        let column2 = board.columns.find(col => col.id === columnId2);

        expect(column1.tasks.length).toBe(1); // Back down to just Task 1
        expect(column2.tasks.length).toBe(1); // Now contains our moved task
        expect(column2.tasks[0].id).toBe(createdTaskId);


        // --- STEP 6: TASK SERVICE (Update) ---
        // Modify fields on the task sitting in Column 2
        updateTask(boardId, columnId2, createdTaskId, {
            title: 'Refactor Auth Module - Completed',
            priority: 'Low',
            unallowedField: 'hacky-data-should-be-dropped' // Security guardrail check
        });

        const updatedTask = loadTask(boardId, createdTaskId);
        expect(updatedTask.title).toBe('Refactor Auth Module - Completed');
        expect(updatedTask.priority).toBe('Low');
        expect(updatedTask.content).toBe('Upgrade to OAuth2 tokens'); // Unchanged field remains intact
        expect(updatedTask.unallowedField).toBeUndefined(); // Guardrail successfully stripped extra fields


        // --- STEP 7: TASK SERVICE (Delete) ---
        // Remove the task from Column 2
        deleteTask(boardId, columnId2, createdTaskId);

        expect(loadTask(boardId, createdTaskId)).toBeNull();
        
        board = loadBoard(boardId);
        column2 = board.columns.find(col => col.id === columnId2);
        expect(column2.tasks.length).toBe(0);


        // --- STEP 8: CLEANUP & STATE INTEGRITY ---
        // Delete column 1 and verify board state
        deleteColumn(boardId, columnId1);
        board = loadBoard(boardId);
        expect(board.columns.length).toBe(1); // Only Column 2 remains

        // Delete the entire board and verify storage state is wiped
        deleteBoard(boardId);
        expect(loadBoard(boardId)).toBeNull();
    });
});