// /src/app/views/Home.js
import { navigateTo } from "../router.js" ;

// Creamos un estado local fallback en caso de que no uses una variable global,
// o puedes cambiarlo por tu objeto de estado global si lo tienes importado.
const localState = {
  selectedCharacter: null
};

export function Home() {
  // 1. Creamos el contenedor del DOM real en memoria
  const viewEl = document.createElement("div");
  viewEl.classList.add("home-view-wrapper");

// 2. Inyectamos la estructura HTML exacta acoplada al nuevo diseño horizontal y centrado
// NOTA: Modificamos los src para que apunten a /personajes/ que está dentro de public
  viewEl.innerHTML = `
    <div class="home">
      <h1>Cars AI Chat</h1>
      
      <div class="home-intro-wide">
        <p class="intro-text">
          Te damos la bienvenida al centro de comando avanzado. Esta aplicación es una <strong class="highlight">SPA (Single Page Application)</strong> diseñada para simular transmisiones en tiempo real con los personajes más icónicos del universo de Cars.
        </p>
      </div>

      <p class="subtitle">Elige a tu corredor favorito para conversar</p>
      
      <div class="characters">
        <div class="card" data-char="Mate">
          <img src="/personajes/mate.jpg" alt="Mate" />
          <div class="card-name">Mate</div>
        </div>
        <div class="card" data-char="Mcqueen">
          <img src="/personajes/mcqueen.jpg" alt="McQueen" />
          <div class="card-name">McQueen</div>
        </div>
        <div class="card" data-char="Hudson">
          <img src="/personajes/hudson.jpg" alt="Hudson" />
          <div class="card-name">Hudson</div>
        </div>
        <div class="card" data-char="Sally">
          <img src="/personajes/sally.jpg" alt="Sally" />
          <div class="card-name">Sally</div>
        </div>
      </div>

      <button id="chatBtn" class="go-chat" disabled>
        Selecciona un personaje
      </button>
    </div>
  `;

  // 3. LÓGICA DE EVENTOS (Intacta y funcional)
  const cards = viewEl.querySelectorAll(".card");
  const btn = viewEl.querySelector("#chatBtn");

  // Si tienes un objeto global llamado 'state', usa ese, si no, usa el fallback localState
  const currentState = typeof state !== "undefined" ? state : localState;
  let selected = currentState.selectedCharacter;

  const updateButton = () => {
    if (!selected) {
      btn.disabled = true;
      btn.classList.remove("active");
      btn.textContent = "Selecciona un personaje";
    } else {
      btn.disabled = false;
      btn.classList.add("active");
      // Formateamos el nombre para que se vea más lindo en el botón
      const displayName = selected === "Mcqueen" ? "McQueen" : selected;
      btn.textContent = `Ir al chat con ${displayName}`;
    }
  };

  cards.forEach(card => {
    const char = card.dataset.char;

    // Restaurar selección visual si existe en el estado
    if (selected === char) {
      card.classList.add("selected");
    }

    card.addEventListener("click", () => {
      if (selected === char) {
        selected = null;
        currentState.selectedCharacter = null;
        card.classList.remove("selected");
      } else {
        selected = char;
        currentState.selectedCharacter = char;

        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
      }
      updateButton();
    });
  });

  btn.addEventListener("click", () => {
    if (!selected) return;
    // Navegación limpia por History API hacia el Chat
    navigateTo("/chat", `character=${selected}`);
  });

  // Ejecución inicial del botón por si ya venía seleccionado un personaje
  updateButton();

  // 4. RETORNO DEL NODO REAL
  return viewEl;
}