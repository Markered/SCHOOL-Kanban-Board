function RenameBoardModal() {
    return `
        <dialog class="modal-dialog" id="renameBoardModal">
            <form class="rename-form" method="dialog">
                <div class="modal-header">
                    <h2 class="modal-title">Rename Board</h2>
                </div>
                
                <div class="modal-body">
                    <label class="form-field" for="renameBoardInput">
                        <span class="field-label">Board Name</span>
                        <input class="form-input" type="text" id="renameBoardInput" placeholder="Enter board name" required />
                    </label>
                </div>
                
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Rename Board</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default RenameBoardModal;