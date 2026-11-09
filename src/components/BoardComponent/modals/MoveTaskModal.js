import { getState } from "../../../services/storageService/helpers.js";

function MoveTaskModal(boardId) {
    const columns = getState()[boardId]?.columns || [];

    return `
        <dialog class="modal-dialog add-item-modal" id="moveTaskModal">
            <form class="move-task-form" method="dialog" data-board-id="${boardId}">
                <input type="hidden" name="sourceColumnId">
                <input type="hidden" name="taskId">
                <div class="modal-header"><h2 class="modal-title">Move Task</h2></div>
                <div class="modal-body">
                    <label class="form-field" for="moveTaskColumnInput">
                        <span class="field-label">Move to column</span>
                        <select class="form-input" id="moveTaskColumnInput" required>
                            ${columns.map(column => `<option value="${column.id}">${column.title}</option>`).join('')}
                        </select>
                    </label>
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Move Task</button>
                </footer>
            </form>
        </dialog>
    `;
}

export default MoveTaskModal;
