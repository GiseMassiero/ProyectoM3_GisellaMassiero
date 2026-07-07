// /src/app/router.js
import { Home } from "./views/Home.js";
import { About } from "./views/About.js";
import { Chat } from "./views/Chat.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/about": About,
  "/chat": Chat,
};

export function router() {
  const root = document.getElementById("view");
  if (!root) return;

  // 1. LIMPIEZA TOTAL: Vaciamos por completo el contenedor antes de renderizar
  root.innerHTML = "";

  const path = location.pathname;
  const search = location.search;
  const params = new URLSearchParams(search);

  // Seleccionamos la función de la vista correspondiente (fallback a Home)
  const PageView = routes[path] || Home;

  // 2. EJECUCIÓN: Obtenemos el nodo del DOM real que construyó la vista
  const pageElement = PageView(params);

  // 3. RENDER: Lo inyectamos de forma segura mediante appendChild
  if (pageElement instanceof HTMLElement) {
    root.appendChild(pageElement);
  } else {
    // Salvavidas por si alguna vista temporalmente devuelve un string HTML
    root.innerHTML = pageElement;
  }
}

// FUNCIÓN DE NAVEGACIÓN (History API requerida por la rúbrica)
export function navigateTo(path, searchParams = "") {
  const url = searchParams ? `${path}?${searchParams}` : path;
  window.history.pushState({}, "", url);
  router(); // Disparamos el renderizado sincrónicamente
}

// Escuchamos de forma nativa las flechas de navegación del cliente (Back/Forward)
window.addEventListener("popstate", router);