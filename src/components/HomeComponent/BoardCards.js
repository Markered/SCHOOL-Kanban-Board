function BoardCard(data) {
    return `
        <div class='boardCard'>
            ${data.thumbnail ? `<img src='${data.thumbnail}'>` : `<div class="temp-thumbnail"></div>`}
            <h3>${data.title}</h3>
        </div>
    `;
}

export default BoardCard;