import { jest } from '@jest/globals';
import { getMockSchema } from '../../fixtures/index.js';

let mockState = {};
const mockGetState = jest.fn(() => mockState);
const mockPersistState = jest.fn((newState) => {
    mockState = newState;
});

jest.unstable_mockModule('../../../src/services/storageService/helpers.js', () => ({
    getState: () => mockGetState(),
    persistState: (state) => mockPersistState(state)
}));

const mockSaveColumn = jest.fn();
jest.unstable_mockModule('../../../src/services/storageService/index.js', () => ({
    saveColumn: (...args) => mockSaveColumn(...args)
}));

const { updateColumn, createColumn, deleteColumn, reorderColumn } = await import('../../../src/services/columnService/index.js');

describe('Column Service Tests', () => {
    beforeEach(() => {
        mockState = getMockSchema();
        jest.clearAllMocks();
    });

    describe('updateColumn', () => {
        test('should update the title of an existing column', () => {
            updateColumn("kanban1ID", 1, { title: "Backlog" });

            const board = mockGetState()["kanban1ID"];
            expect(board.columns[0].title).toBe("Backlog");
            expect(mockPersistState).toHaveBeenCalledTimes(1);
        });

        test('should do nothing if the column ID does not exist', () => {
            updateColumn("kanban1ID", 999, { title: "Ghost Column" });

            const board = mockGetState()["kanban1ID"];
            expect(board.columns[0].title).toBe("To Do");
            expect(mockPersistState).not.toHaveBeenCalled();
        });

        test('should do nothing if the board ID does not exist', () => {
            updateColumn("invalidBoardID", 1, { title: "New Title" });

            expect(mockPersistState).not.toHaveBeenCalled();
        });
    });

    describe('createColumn', () => {
        test('should generate an ID and call saveColumn with the title', () => {
            const mockId = 12345;
            jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockId);

            createColumn('Kanban1ID', { title: "New Feature Column" });

            expect(mockSaveColumn).toHaveBeenCalledTimes(1);
            expect(mockSaveColumn).toHaveBeenCalledWith(
                "Kanban1ID",
                { id: mockId, title: "New Feature Column", tasks: [] }
            );
        });
    });

    describe('deleteColumn', () => {
        test('should delete an existing column from the board', () => {
            deleteColumn("kanban1ID", 1);

            const board = mockGetState()["kanban1ID"];
            expect(board.columns.length).toBe(1);
            expect(board.columns[0].id).toBe(2);
            expect(mockPersistState).toHaveBeenCalledTimes(1);
        });

        test('should do nothing if the board ID does not exist', () => {
            deleteColumn("invalidBoardID", 1);

            expect(mockPersistState).not.toHaveBeenCalled();
        });

        test('should do nothing if the column ID does not exist', () => {
            deleteColumn("kanban1ID", 999);

            const board = mockGetState()["kanban1ID"];
            expect(board.columns.length).toBe(2);
            expect(mockPersistState).not.toHaveBeenCalled();
        });
    });

    describe('reorderColumn', () => {
        test('should successfully reorder a column before another column', () => {
            mockState["kanban1ID"].columns.push({ id: 3, title: "Done", tasks: [] });

            reorderColumn("kanban1ID", 3, 1, 'before');

            const board = mockGetState()["kanban1ID"];
            expect(board.columns[0].id).toBe(3);
            expect(board.columns[1].id).toBe(1);
            expect(board.columns[2].id).toBe(2);
            expect(mockPersistState).toHaveBeenCalledTimes(1);
        });

        test('should do nothing if the board ID does not exist', () => {
            reorderColumn("invalidBoardID", 1, 2, 'before');

            expect(mockPersistState).not.toHaveBeenCalled();
        });

        test('should do nothing if the column or target ID does not exist', () => {
            reorderColumn("kanban1ID", 999, 1, 'before');

            expect(mockPersistState).not.toHaveBeenCalled();
        });
    });
});