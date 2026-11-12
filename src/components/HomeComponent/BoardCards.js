function BoardCard(id, data) {
    return `
        <div class='boardCard' data-id="${id}">
            <div class="boardCard-main">
                ${data.thumbnail ? `<img src='${data.thumbnail}'>` : `<div class="temp-thumbnail"></div>`}
            </div>
            <div class="boardCard-footer">
                <h3>${data.title}</h3>
                
                <details class="options-menu">
                    <summary class="options-trigger" aria-label="Board options">⋮</summary>
                    <div class="dropdown-content">
                        <button type="button" class="rename-option">
                            <span class="menu-icon menu-icon-edit" aria-hidden="true"></span>Rename</button>
                        <button type="button" class="delete-option">
                            <span class="menu-icon menu-icon-delete" aria-hidden="true"></span>Delete</button>
                    </div>
                </details>
            </div>
        </div>
    `;
}

export default BoardCard;