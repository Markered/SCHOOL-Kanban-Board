import BoardComponent from "../../components/BoardComponent/index.js";
import HomeComponent from "../../components/HomeComponent/HomeComponent.js";
import AboutComponent from "../../components/AboutComponent/index.js";
import NotFoundComponent from "../../components/NotFoundComponent/index.js";

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