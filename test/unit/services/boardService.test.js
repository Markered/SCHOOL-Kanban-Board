/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { createBoard, updateBoard, deleteBoard } from '../../../src/services/boardService/index.js';
import { loadBoard, loadAllBoards } from '../../../src/services/storageService/index.js';
import { getMockSchema } from '../../fixtures/index.js';

const randomUUID = jest.spyOn(globalThis.crypto, 'randomUUID');

describe('Board Service Tests', () => {
    let mockState;

    beforeEach(() => {
        localStorage.clear();
        mockState = getMockSchema();
        localStorage.setItem('kanban_app_state', JSON.stringify(mockState));
    });

    describe('createBoard', () => {
        it('should generate a UUID, create a board, and persist it to storage', () => {
            const mockUuid = 'kanban2ID';
            randomUUID.mockReturnValue(mockUuid);

            createBoard({ title: "Kanban 2" });

            const savedBoard = loadBoard(mockUuid);
            expect(savedBoard).toBeDefined();
            expect(savedBoard.title).toBe("Kanban 2");
            expect(savedBoard.columns).toEqual([]);
        });
    });

    describe('updateBoard', () => {
        it('should update an existing board title while preserving its columns and mock structure', () => {
            const boardId = 'kanban1ID';

            const initialBoard = loadBoard(boardId);
            expect(initialBoard.title).toBe("Kanban 1");
            expect(initialBoard.columns.length).toBe(2);

            updateBoard(boardId, { title: "Kanban 1 - Updated" });

            const updatedBoard = loadBoard(boardId);
            expect(updatedBoard.title).toBe("Kanban 1 - Updated");
            expect(updatedBoard.thumbnail).toBe("https://example.com/kanban1-thumbnail.jpg");
            expect(updatedBoard.columns.length).toBe(2); 
        });
    });

    describe('deleteBoard', () => {
        it('should remove the board from storage entirely based on the mock schema', () => {
            const boardId = 'kanban1ID';

            expect(loadBoard(boardId)).not.toBeNull();

            deleteBoard(boardId);

            expect(loadBoard(boardId)).toBeNull();
            expect(loadAllBoards()).toEqual({});
        });
    });
});