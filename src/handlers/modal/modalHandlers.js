import { handleBoardModalAction } from "../board/index.js";
import { handleColumnAction } from "../column/index.js";
import { handleTaskAction } from "../task/index.js";

export function handleModalTriggers(e) {
    const target = e.target;

    if (handleBoardModalAction(target)) return true;
    if (handleColumnAction(target)) return true;
    if (handleTaskAction(target)) return true;

    const columnChoice = target.closest('.add-column-choice');
    const taskChoice = target.closest('.add-task-choice');
    if (columnChoice || taskChoice) {
        const modal = document.getElementById(columnChoice ? 'createColumnModal' : 'createTaskModal');
        const menu = target.closest('.add-item-menu');
        if (menu && modal) {
            menu.removeAttribute('open');
            modal.showModal();
            modal.querySelector('input, select, textarea')?.focus();
        }
        return true;
    }

    const openModalBtn = target.closest('.openCreateBoardModalBtn');
    if (openModalBtn) {
        document.querySelector('.modal-dialog')?.showModal();
        return true;
    }

    const cancelBtn = target.closest('button[type="reset"]');
    if (cancelBtn) {
        cancelBtn.closest('.modal-dialog')?.close();
        return true;
    }

    return false;
}
