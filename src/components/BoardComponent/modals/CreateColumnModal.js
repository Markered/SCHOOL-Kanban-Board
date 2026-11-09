function CreateColumnModal(boardId) {
    return `
        <dialog class="modal-dialog add-item-modal" id="createColumnModal">
            <form class="column-form" method="dialog" data-board-id="${boardId}">
                <div class="modal-header"><h2 class="modal-title">Create New Column</h2></div>
                <div class="modal-body">
                    <label class="form-field" for="columnTitleInput">
                        <span class="field-label">Column Name</span>
                        <input class="form-input" type="text" id="columnTitleInput" placeholder="Enter column name" required />
                    </label>
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Create Column</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default CreateColumnModal;
