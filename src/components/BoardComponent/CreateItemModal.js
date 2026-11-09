import AddItemMenu from "./modals/AddItemMenu.js";
import CreateColumnModal from "./modals/CreateColumnModal.js";
import CreateTaskModal from "./modals/CreateTaskModal.js";
import RenameColumnModal from "./modals/RenameColumnModal.js";
import MoveTaskModal from "./modals/MoveTaskModal.js";

function CreateItemModal(boardId) {
    return [
        AddItemMenu(),
        CreateColumnModal(boardId),
        CreateTaskModal(boardId),
        RenameColumnModal(),
        MoveTaskModal(boardId)
    ].join('');
}

export default CreateItemModal;
