import Column from "./columns/Column.js";

function ColumnComponents(columns) {
    if (columns.length === 0) {
        return `
            <div class="noBoardsMsg">
                <img src="./src/assets/images/noContent.png" alt="No boards image">
                <p>Looks like you don't have any tasks and columns yet.</p>
            </div>
            <img class="addBoardArrow" src="./src/assets/icons/bottomRightArrow.png" alt="arrow pointing to add board"/>
        `;
    }

    return columns.map(Column).join('');
}

export default ColumnComponents;
