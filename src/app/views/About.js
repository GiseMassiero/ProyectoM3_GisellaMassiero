// /src/app/views/About.js

export function About() {
  
  // 1. Creamos el contenedor del DOM real en memoria
  const viewEl = document.createElement("div");
  viewEl.classList.add("about-view-wrapper"); // Una clase limpia para tus estilos

  // 2. Inyectamos tu estructura HTML exacta dentro del contenedor
  viewEl.innerHTML = `
    <div class="about">
      <div class="about-content">
        <h1>About Cars AI Chat</h1>

        <p>
          Esta aplicación es una SPA creada para simular un chat con personajes del universo de Cars.
        </p>

        <p>
          Podés hablar con Mate, Rayo McQueen, Hudson Hornet y Sally.
          Cada uno programado con una personalidad única.
        </p>

        <p>
          Tecnologías y conceptos aplicados: 
        </p>

        <ul>
          <li>Enrutamiento dinámico y navegación fluida mediante Routing en SPA.</li>
          <li>Gestión de un estado global para in flujo de datos eficientes.</li>
          <li>Integración de Inteligencia Artificial consumiendo la API de Gemini AI.</li>
          <li>Insterfaz adaptable con un diseño responsive enfocado en mobile-first.</li>
        </ul>

        <p class="highlight">
          “La velocidad no lo es todo… lo importante es el viaje.” ⚡
        </p>

  <div class="about-footer">
    <p>© 2026 - Proyecto Full Stack - Gisella Massiero</p>
    <a class="git-link" href="https://github.com/GiseMassiero/ProyectoM3_GisellaMassiero.git" target="_blank" rel="noopener noreferrer">
       GitHub Repository 🚀
    </a>
</div>

  `;

  // 💡 Dejamos listo el hook por si el router intenta inicializar algo en esta vista
  function afterRender() {
  }

  window.initAbout = afterRender;

  // 3. 🌟 CORRECCIÓN CRUCIAL: Retornamos el elemento del DOM, no un string
  return viewEl;
}