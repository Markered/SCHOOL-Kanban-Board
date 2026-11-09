function AddItemMenu() {
    return `
        <details class="add-item-menu">
            <summary class="openAddItemModalBtn" aria-label="Add task or column">+</summary>
            <div class="add-item-dropdown">
                <button class="btn btn-primary add-column-choice" type="button">Add column</button>
                <button class="btn btn-primary add-task-choice" type="button">Add task</button>
            </div>
        </details>
    `;
}

export default AddItemMenu;
