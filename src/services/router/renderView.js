import BoardComponent from "../../components/BoardComponent/index.js";
import HomeComponent from "../../components/HomeComponent/HomeComponent.js";
import AboutComponent from "../../components/AboutComponent/index.js";
import NotFoundComponent from "../../components/NotFoundComponent/index.js";

const routes = {
  'home': HomeComponent,
  'about': AboutComponent,
  'board': BoardComponent,
};

async function renderView() {
  if (!window.location.hash || window.location.hash === '#') {
    window.location.replace('#home');
    return; 
  }
  
  const hash = window.location.hash.slice(1);
  const [routeKey, param] = hash.split('/');
  
  const ViewComponent = routes[routeKey] !== undefined ? routes[routeKey] : NotFoundComponent;
  
  try {
    const { title, html } = await ViewComponent(param);
    document.title = title;
    document.getElementById('app').innerHTML = html;
  } catch (error) {
    console.error('Unable to render the current view.', error);
    document.getElementById('app').innerHTML = `
      <section class="not-found-container">
        <h2>Unable to load this page</h2>
        <p>Please refresh and try again.</p>
      </section>
    `;
  }
}

export default renderView;