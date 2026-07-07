// /src/app/views/Home.js
import { state } from "../state/state.js";
import { navigateTo } from "../router.js"; // 🌟 Asegúrate de que la ruta sea correcta según tu estructura (ej: "./app/router.js" o "../router.js")

export function Home() {
  // 1. Creamos el contenedor del DOM real en memoria
  const viewEl = document.createElement("div");
  viewEl.classList.add("home-view-wrapper");

  // 2. Inyectamos tu estructura HTML exacta
  viewEl.innerHTML = `
    <div class="home">
      <div class="home-content">
        <h1>Cars AI Chat</h1>
        <p class="subtitle">Elige con quién quieres conversar</p>

        <div class="characters">
          <div class="card" data-char="Mate">
            <img src="./src/assets/characters/mate.jpg" />
            <h3>Mate</h3>
          </div>
          <div class="card" data-char="Mcqueen">
            <img src="./src/assets/characters/mcqueen.jpg" />
            <h3>McQueen</h3>
          </div>
          <div class="card" data-char="Hudson">
            <img src="./src/assets/characters/hudson.jpg" />
            <h3>Hudson</h3>
          </div>
          <div class="card" data-char="Sally">
            <img src="./src/assets/characters/sally.jpg" />
            <h3>Sally</h3>
          </div>
        </div>

        <button id="chatBtn" class="go-chat" disabled>
          Selecciona un personaje
        </button>
      </div>
    </div>
  `;

  // 3. LÓGICA DE EVENTOS (Se ejecuta directo acá adentro sobre el elemento creado)
  const cards = viewEl.querySelectorAll(".card");
  const btn = viewEl.getElementById ? viewEl.getElementById("chatBtn") : viewEl.querySelector("#chatBtn");

  let selected = state.selectedCharacter;

  const updateButton = () => {
    if (!selected) {
      btn.disabled = true;
      btn.classList.remove("active");
      btn.textContent = "Selecciona un personaje";
    } else {
      btn.disabled = false;
      btn.classList.add("active");
      btn.textContent = `Ir al chat con ${selected}`;
    }
  };

  cards.forEach(card => {
    const char = card.dataset.char;

    // Restaurar selección visual si existe en el estado global
    if (selected === char) {
      card.classList.add("selected");
    }

    card.addEventListener("click", () => {
      if (selected === char) {
        selected = null;
        state.selectedCharacter = null;
        card.classList.remove("selected");
      } else {
        selected = char;
        state.selectedCharacter = char;

        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
      }
      updateButton();
    });
  });

  btn.addEventListener("click", () => {
    if (!selected) return;
    // Navegación limpia por History API sin Hashes
    navigateTo("/chat", `character=${selected}`);
  });

  // Ejecución inicial del botón por si ya venía seleccionado un personaje
  updateButton();

  // 4. RETORNO DEL NODO REAL
  return viewEl;
}