import { getState } from "../../services/storageService/helpers.js";
import BoardCard from "./BoardCards.js";
import CreateBoardModal from "./modals/createBoardModal.js";
import RenameBoardModal from "./modals/renameBoardModal.js";

function HomeComponent() {
    const state = getState();
    const boardCards = [];
    let content = `
        <div class="noBoardsMsg">
            <img src="./src/assets/images/noContent.png" alt="No boards image">
            <p>Looks like you haven't created any boards yet.</p>
        </div>
        <img class="addBoardArrow" src="./src/assets/icons/bottomRightArrow.png" alt="arrow pointing to add board"/>
        `;
    
    for (const boardKey in state) {
        const boardData = state[boardKey];
        boardCards.push(BoardCard(boardKey, boardData));
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
            <button class='openCreateBoardModalBtn'>+</button>
            ${CreateBoardModal()}
            ${RenameBoardModal()}
        `
    }
}

export default HomeComponent;