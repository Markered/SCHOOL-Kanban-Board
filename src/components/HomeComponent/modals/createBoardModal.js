function CreateBoardModal() {
    return `
        <dialog class="modal-dialog" id="createBoardModal">
            <form class="board-form" method="dialog">
                <div class="modal-header">
                    <h2 class="modal-title">Create New Board</h2>
                </div>
                
                <div class="modal-body">
                    <label class="form-field" for="boardNameInput">
                        <span class="field-label">Board Name</span>
                        <input class="form-input" type="text" id="boardNameInput" placeholder="Enter board name" required />
                    </label>
                </div>
                
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Create Board</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default CreateBoardModal;