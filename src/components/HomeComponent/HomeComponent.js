import createBoard from "../../services/boardService/createBoard.js";
import { getState } from "../../services/storageService/helpers.js";
import BoardCard from "./BoardCards.js";

function HomeComponent() {
    const state = getState();
    const boardCards = [];
    let content = `<div class="noBoardsMsg">Looks like you haven't created any boards yet.</div>`;
    
    for (const boardKey in state) {
        const boardData = state[boardKey];
        boardCards.push(BoardCard(boardData));
    }

    if (boardCards.length > 0) {
        content = '';

        for (const boardCard of boardCards) {
            content += `<li>${boardCard}</li>`;
        }
    }
    
    return {
        title: 'Home',
        html: `
            <h2>Your boards</h2>
            <ul class="boardCardList">${content}</ul>
            <button class='createBoardBtn'>+</button>
        `
    }
}

export default HomeComponent;


function handleAddBoard(title) {
    const boardTitle = title ? title : 'Blank board';
    createBoard({title: boardTitle});
}

const app = document.getElementById('app');

app.addEventListener('click', (e) => {
    const createBoardBtn = e.target.closest('.createBoardBtn');
    if (createBoardBtn) {
        handleAddBoard();
        const addEvent = new CustomEvent('addItem', {
            bubbles: true,
        });

        document.dispatchEvent(addEvent);
    }
})
