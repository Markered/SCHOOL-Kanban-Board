function AddItemMenu() {
    return `
        <details class="add-item-menu">
            <summary class="openAddItemModalBtn" aria-label="Add task or column">+</summary>
            <div class="add-item-dropdown">
                <button class="btn btn-primary add-column-choice" type="button">
                    <span class="menu-icon menu-icon-add-column" aria-hidden="true"></span>Add column</button>
                <button class="btn btn-primary add-task-choice" type="button">
                    <span class="menu-icon menu-icon-add-task" aria-hidden="true"></span>Add task</button>
            </div>
        </details>
    `;
}

export default AddItemMenu;
