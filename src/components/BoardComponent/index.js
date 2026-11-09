import { getState } from "../../services/storageService/helpers.js";
import ColumnComponents from "./ColumnComponents.js";
import CreateItemModal from "./CreateItemModal.js";
import NotFoundComponent from "../NotFoundComponent/index.js";
import RenameBoardModal from "../HomeComponent/modals/renameBoardModal.js";

function BoardComponent(id) {
    const state = getState();
    const board = state[id];

    if (!board) {
        return NotFoundComponent({title: 'Board Not Found', header: 'Board not found', content: 'The board you are looking for does not exist.'});
    }

    const colEl = ColumnComponents((board.columns || []).map(column => ({ ...column, boardId: id })));

    return {
        title: `${board.title} - Kanban`,
        html: `
            <div class="board-view-header" data-board-id="${id}">
                <a class="back-link" href="#home">
                    <img src="./src/assets/icons/leftArrow.png" alt="Back">
                    Back to Boards
                </a>
                <div class="board-title-row">
                    <h2>${board.title}</h2>
                    <div class="board-options-container">
                        <button class="board-options-toggle" type="button" aria-label="Board options">⋮</button>
                        <div class="board-options-menu" hidden>
                            <button type="button" class="board-option-rename">Rename</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="board-columns">
                ${colEl}
            </div>
            ${CreateItemModal(id)}
            ${RenameBoardModal()}
        `
    };
}

export default BoardComponent;