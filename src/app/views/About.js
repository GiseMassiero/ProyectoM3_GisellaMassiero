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
          Cada personaje tiene una personalidad distinta.
        </p>

        <p>
          El objetivo del proyecto es practicar:
        </p>

        <ul>
          <li>Routing en SPA</li>
          <li>Estado global</li>
          <li>Consumo de APIs (Gemini AI)</li>
          <li>Diseño responsive mobile-first</li>
        </ul>

        <p class="highlight">
          “La velocidad no lo es todo… lo importante es el viaje.” ⚡
        </p>
      </div>
    </div>
  `;

  // 💡 Dejamos listo el hook por si el router intenta inicializar algo en esta vista
  function afterRender() {
    console.log("Vista About cargada");
  }

  window.initAbout = afterRender;

  // 3. 🌟 CORRECCIÓN CRUCIAL: Retornamos el elemento del DOM, no un string
  return viewEl;
}