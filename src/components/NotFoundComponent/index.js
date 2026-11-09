function NotFoundComponent({
    title = 'Page Not Found', 
    header = 'Page not found', 
    content = 'The page you are looking for does not exist.'
    } = {}) {
    return {
        title: title,
        html: `
        <div class="not-found-container">
            <img src="./src/assets/images/404.png" alt="No boards image">
            <h2>${header}</h2>
            <p>${content}</p>
            <a href="#home">Go to Home</a>
        </div>
        `
    };
}

export default NotFoundComponent;