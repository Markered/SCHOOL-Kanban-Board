const { createBoard } = require('../../../../src/services/boardService');

describe('createBoard', () => {
    const title = 'New Board';
    const newBoard = createBoard({ title });

    it('should create a new board with the given title', () => {
        expect(newBoard).toHaveProperty('title', title);
    });

    it('should generate a unique ID for each new board', () => {
        const anotherBoard = createBoard({ title: 'Another Board' });
        expect(newBoard.id).not.toBe(anotherBoard.id);
    });

    it('should initialize the columns array as empty', () => {
        expect(newBoard.columns).toEqual([]);
    });
    
    it('should throw an error if title is not provided', () => {
        expect(() => createBoard({})).toThrow('Title is required to create a board');
    });
});