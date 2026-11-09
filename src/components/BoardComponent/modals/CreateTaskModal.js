import { getState } from "../../../services/storageService/helpers.js";

function CreateTaskModal(boardId) {
    return `
        <dialog class="modal-dialog add-item-modal" id="createTaskModal">
            <form class="task-form" method="dialog" data-board-id="${boardId}">
                <div class="modal-header"><h2 class="modal-title">Create New Task</h2></div>
                <div class="modal-body">
                    <label class="form-field" for="taskTitleInput">
                        <span class="field-label">Task Name</span>
                        <input class="form-input" type="text" id="taskTitleInput" placeholder="Enter task name" required />
                    </label>
                    <label class="form-field" for="taskColumnInput">
                        <span class="field-label">Column</span>
                        <select class="form-input" id="taskColumnInput" required>
                            ${getColumnOptions(boardId)}
                        </select>
                    </label>
                    <label class="form-field" for="taskContentInput">
                        <span class="field-label">Description</span>
                        <textarea class="form-input" id="taskContentInput" rows="3" placeholder="Enter description"></textarea>
                    </label>
                    <label class="form-field" for="taskTagsInput">
                        <span class="field-label">Tags</span>
                        <input class="form-input" type="text" id="taskTagsInput" placeholder="Add tags separated by commas" />
                    </label>
                </div>
                <footer class="modal-footer">
                    <button class="btn btn-secondary" type="reset">Cancel</button>
                    <button class="btn btn-primary" type="submit">Create Task</button>
                </footer>
            </form>
        </dialog>
    `;
}

function getColumnOptions(boardId) {
    const state = getState();
    return (state[boardId]?.columns || [])
        .map(column => `<option value="${column.id}">${column.title}</option>`)
        .join('');
}

export default CreateTaskModal;
