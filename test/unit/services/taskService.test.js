const { updateTask, deleteTask, createTask, reorderTask, moveTask } = require('../../../src/services/taskService');

const { saveTask } = require('../../../src/services/storageService');
const { getState, persistState } = require('../../../src/services/storageService/helpers');
const { getMockSchema } = require('../../fixtures'); // Adjust path as needed

jest.mock("../../../src/services/storageService", () => ({
    saveTask: jest.fn(),
}));

jest.mock('../../../src/services/storageService/helpers', () => ({
    getState: jest.fn(),
    persistState: jest.fn(),
}));

describe('Task Management Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should generate a UUID and call saveTask with the correct payload', () => {
            const boardId = 'kanban1ID';
            const columnId = 1; 
            const taskData = {
                title: 'New Feature Task',
                content: 'Implement login screen',
                tags: ['Auth'],
                priority: 'Medium',
                dueDate: '2026-11-15',
            };

            createTask(boardId, columnId, taskData);

            expect(saveTask).toHaveBeenCalledTimes(1);
            expect(saveTask).toHaveBeenCalledWith(
                boardId,
                columnId,
                expect.objectContaining({
                    id: expect.any(String), 
                    title: 'New Feature Task',
                    content: 'Implement login screen',
                    tags: ['Auth'],
                    priority: 'Medium',
                    dueDate: '2026-11-15',
                })
            );
        });
    });

    describe('deleteTask', () => {
        it('should successfully remove the task from the correct column and persist state', () => {
            const mockState = getMockSchema();

            getState.mockReturnValue(mockState);

            deleteTask('kanban1ID', 1, 1);

            const targetColumn = mockState['kanban1ID'].columns.find(col => col.id === 1);
            expect(targetColumn.tasks).toEqual([]);
            
            expect(persistState).toHaveBeenCalledTimes(1);
            expect(persistState).toHaveBeenCalledWith(mockState);
        });

        it('should do nothing if board or column is missing', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            deleteTask('non-existent-board', 1, 1);

            expect(persistState).not.toHaveBeenCalled();
        });
    });

    describe('updateTask', () => {
        it('should update allowed fields on the nested task and persist state', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            const updates = {
                title: 'Updated Task Title',
                priority: 'Low',
                unallowedField: 'Should be stripped/ignored',
            };

            updateTask('kanban1ID', 1, 1, updates);

            const column = mockState['kanban1ID'].columns.find(col => col.id === 1);
            const updatedTask = column.tasks.find(t => t.id === 1);

            expect(updatedTask.title).toBe('Updated Task Title');
            expect(updatedTask.priority).toBe('Low');
            expect(updatedTask.content).toBe('Description for Task 1');
            expect(updatedTask.unallowedField).toBeUndefined();
            expect(persistState).toHaveBeenCalledTimes(1);
            expect(persistState).toHaveBeenCalledWith(mockState);
        });

        it('should do nothing if the task cannot be found', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            updateTask('kanban1ID', 1, 999, { title: 'Ghost Task' });

            expect(persistState).not.toHaveBeenCalled();
        });
    });

    describe('reorderTask', () => {
        it('should successfully reorder a task within the same column and persist state', () => {
            const mockState = getMockSchema();
            const column = mockState['kanban1ID'].columns.find(col => col.id === 1);
            column.tasks.push({ id: 2, title: 'Task 2' });

            getState.mockReturnValue(mockState);

            reorderTask('kanban1ID', 1, 2, 1, 'before');

            expect(column.tasks[0].id).toBe(2);
            expect(column.tasks[1].id).toBe(1);
            expect(persistState).toHaveBeenCalledTimes(1);
            expect(persistState).toHaveBeenCalledWith(mockState);
        });

        it('should do nothing if tasks are not found', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            reorderTask('kanban1ID', 1, 999, 1, 'before');

            expect(persistState).not.toHaveBeenCalled();
        });
    });

    describe('moveTask', () => {
        it('should successfully move a task from one column to another and persist state', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            moveTask('kanban1ID', 1, 2, 1);

            const sourceCol = mockState['kanban1ID'].columns.find(col => col.id === 1);
            const targetCol = mockState['kanban1ID'].columns.find(col => col.id === 2);

            expect(sourceCol.tasks.length).toBe(0);
            expect(targetCol.tasks.length).toBe(1);
            expect(targetCol.tasks[0].id).toBe(1);
            expect(persistState).toHaveBeenCalledTimes(1);
            expect(persistState).toHaveBeenCalledWith(mockState);
        });

        it('should do nothing if source or target column does not exist', () => {
            const mockState = getMockSchema();
            getState.mockReturnValue(mockState);

            moveTask('kanban1ID', 1, 999, 1);

            expect(persistState).not.toHaveBeenCalled();
        });
    });
});