function HomeComponent() {
  return {
    title: 'Home - My App',
    html: `
      <h2>Home View</h2>
      <p>Welcome to the homepage!</p>
    `
  };
}

function AboutComponent() {
  return {
    title: 'About Us - My App',
    html: `
      <h2>About Us</h2>
      <p>This is the about page.</p>
    `
  };
}

function BoardComponent(boardId) {
  if (!boardId) {
    return NotFoundComponent();
  }
  
  const safeId = escapeHtml(boardId);
  return {
    title: `Board: ${safeId} - My App`,
    html: `
      <h2>Board View</h2>
      <p>Currently viewing board: <strong>${safeId}</strong></p>
    `
  };
}

function NotFoundComponent() {
  return {
    title: '404 Page Not Found - My App',
    html: `
      <h2>404 Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <a href="#home">Go to Home</a>
    `
  };
}

const escapeHtml = (str) => 
  str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));

const routes = {
  'home': HomeComponent,
  'about': AboutComponent,
  'board': BoardComponent,
};

function renderView() {
  if (!window.location.hash || window.location.hash === '#') {
    window.location.replace('#home');
    return; 
  }
  
  const hash = window.location.hash.slice(1);
  const [routeKey, param] = hash.split('/');
  
  const ViewComponent = routes[routeKey] !== undefined ? routes[routeKey] : NotFoundComponent;
  
  const { title, html } = ViewComponent(param);
  document.title = title;
  document.getElementById('app').innerHTML = html + `Current URL: <p>${window.location}</p>`;
}

window.addEventListener('hashchange', renderView);
window.addEventListener('DOMContentLoaded', renderView);