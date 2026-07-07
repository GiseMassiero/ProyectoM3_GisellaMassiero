// /src/main.js
import "./style.css";
import { router } from "./app/router.js";
import { NavBar } from "./components/NavBar.js";

function init() {
  const app = document.querySelector("#app");
  if (!app) return;

  // 1. Limpiamos el contenedor principal
  app.innerHTML = "";

  // 2. Generamos el elemento NavBar y lo acoplamos al DOM
  const navBarElement = NavBar();
  app.appendChild(navBarElement);

  // 3. Creamos el contenedor dinámico para las vistas (#view)
  const viewContainer = document.createElement("div");
  viewContainer.id = "view";
  app.appendChild(viewContainer);

  // 4. Ejecutamos el enrutador para pintar la vista correspondiente
  router();
}

window.addEventListener("DOMContentLoaded", init);