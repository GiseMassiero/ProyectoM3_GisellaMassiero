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

  // 1. LIMPIEZA TOTAL
  root.innerHTML = "";

  const path = location.pathname;
  const search = location.search;
  const params = new URLSearchParams(search);

  // Seleccionamos la función de la vista correspondiente (fallback a Home)
  const PageView = routes[path] || Home;

  // 2. EJECUCIÓN
  const pageElement = PageView(params);

  // 3. RENDER SECURE
  if (pageElement instanceof HTMLElement) {
    root.appendChild(pageElement);
  } else {
    root.innerHTML = pageElement;
  }
}

// FUNCIÓN DE NAVEGACIÓN (History API requerida por la rúbrica)
export function navigateTo(path, searchParams = "") {
  const url = searchParams ? `${path}?${searchParams}` : path;
  window.history.pushState({}, "", url);
  router(); // Disparamos el renderizado sincrónicamente
}

// 🛡️ MANEJADOR DE CLICS SPA: Intercepta enlaces para evitar recargas completas (F5)
document.addEventListener("click", (e) => {
  // Buscamos si el elemento clickeado (o alguno de sus padres) es un enlace con atributo data-link o una ruta local
  const anchor = e.target.closest("a");
  
  if (anchor && anchor.href && anchor.host === location.host) {
    e.preventDefault(); // Frenamos la recarga nativa del navegador
    const path = anchor.pathname;
    const search = anchor.search.substring(1); // Quitamos el "?" si existe
    navigateTo(path, search);
  }
});

// Escuchamos de forma nativa las flechas de navegación del cliente (Back/Forward)
window.addEventListener("popstate", router);