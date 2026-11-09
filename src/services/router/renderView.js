import BoardComponent from "../../components/BoardComponent/index.js";
import HomeComponent from "../../components/HomeComponent/HomeComponent.js";
import NotFoundComponent from "../../components/NotFoundComponent/index.js";

function AboutComponent() {
  return {
    title: 'About Us - My App',
    html: `
      <h2>About Us</h2>
      <p>This is the about page.</p>
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
  document.getElementById('app').innerHTML = html;
}

export default renderView;