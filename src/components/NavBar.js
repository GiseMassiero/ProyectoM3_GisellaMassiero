// Importamos la imagen saliendo correctamente a la carpeta src
import logoUrl from '../assets/logo/logo.jpg';
// /src/components/NavBar.js
import { navigateTo } from "../app/router.js"; 

export function NavBar() {
  // 1. Creamos el elemento del DOM en memoria
  const headerEl = document.createElement("header");
  headerEl.classList.add("navbar");

  // 2. Inyectamos la estructura usando la variable del import
  headerEl.innerHTML = `
    <div class="navbar-brand">
      <img src="${logoUrl}" alt="Cars AI Chat Logo" class="logo-img">
    </div>
    <nav class="links">
      <a href="/home" class="link">Home</a>
      <a href="/about" class="link">About</a>
      <button id="themeToggle" class="theme-toggle" title="Cambiar tema" aria-label="Cambiar tema claro/oscuro">🌙</button>
    </nav>
  `;

  // 3. Asignamos los eventos de escucha de forma modular
  const links = headerEl.querySelectorAll(".link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Evitamos la recarga nativa del HTML
      const targetPath = link.getAttribute("href");
      navigateTo(targetPath); // Navegamos usando la History API
    });
  });

  // 3.1 Lógica del toggle de tema (claro/oscuro)
  const themeToggleBtn = headerEl.querySelector("#themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggleBtn.textContent = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    themeToggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  // 4. Retornamos el nodo para que main.js lo use correctamente
  return headerEl;
}