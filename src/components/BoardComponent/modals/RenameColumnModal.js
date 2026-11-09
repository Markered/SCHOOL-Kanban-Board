function RenameColumnModal() {
    return `
        <dialog class="modal-dialog add-item-modal" id="renameColumnModal">
            <form class="column-rename-form" method="dialog">
                <div class="modal-header"><h2 class="modal-title">Rename Column</h2></div>
                <div class="modal-body">
                    <label class="form-field" for="renameColumnInput">
                        <span class="field-label">Column Name</span>
                        <input class="form-input" type="text" id="renameColumnInput" required />
                    </label>
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Rename Column</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default RenameColumnModal;
