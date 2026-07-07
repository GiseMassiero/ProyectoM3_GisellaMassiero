// /src/app/views/Chat.js
import { state } from "../state/state.js";
import { navigateTo } from "../router.js"; // 👈 Agregado: Importación para poder navegar a la Home

// 🌟 IMPORTACIONES DE DATOS: Apuntamos a tu carpeta real 'services'
import { mockSendMessage } from "../services/MockAI.js"; 
// import { sendMessageToGemini } from "../services/api.js";

export function Chat(params) {
  // Obtenemos el personaje desde los parámetros de la URL (?character=Mate)
  const characterName = params.get("character") || state.selectedCharacter || "Personaje";

  const localState = {
    messages: [
      {
        role: "bot",
        text: `¡Hola! Soy ${characterName}. ¿Listo para correr una carrera de charlas?`,
        time: getTime(),
        typing: false
      }
    ],
    loading: false,
    error: null
  };

  // 1. Creamos el contenedor base de la sección
  const viewEl = document.createElement("div");
  viewEl.classList.add("chat"); 

  // 2. Inyectamos la estructura exacta de tu diseño (Con la cruz y su tooltip)
  viewEl.innerHTML = `
    <div class="chat-layout" style="position: relative;">
      
      <button id="btnCloseChat" class="close-chat-btn" title="Cerrar chat">&times;</button>
      
      <aside class="chat-sidebar">
        <img class="character-img" src="./src/assets/characters/${characterName.toLowerCase()}.jpg" alt="${characterName}" onerror="this.style.display='none'"/>
        <h2>${characterName}</h2>
      </aside>

      <main class="chat-main">
        
        <div class="chat-box" id="chatBox"></div>

        <div class="chat-input">
          <input type="text" id="inputMsg" placeholder="Escribe un mensaje aquí..." autocomplete="off" />
          <button id="btnSend">Enviar</button>
        </div>

      </main>

    </div>
  `;

  // 3. Selección de elementos dentro del nodo creado
  const chatBox = viewEl.querySelector("#chatBox");
  const inputMsg = viewEl.querySelector("#inputMsg");
  const btnSend = viewEl.querySelector("#btnSend");
  const btnCloseChat = viewEl.querySelector("#btnCloseChat"); 

  // 3.1 Escuchador para volver al Home al hacer clic en la cruz
  btnCloseChat.addEventListener("click", () => {
    navigateTo("/"); 
  });

  // 4. Función encargada de pintar las burbujas de chat
  function renderMessages() {
    chatBox.innerHTML = ""; 

    localState.messages.forEach((msg) => {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble", msg.role === "user" ? "user" : "bot");

      if (msg.typing) {
        bubble.innerHTML = `<span class="typing-indicator">Escribiendo...</span>`;
      } else {
        bubble.innerHTML = `
          <div class="bubble-content">
            <p>${msg.text}</p>
          </div>
          <span class="time">${msg.time || ""}</span>
        `;
      }
      chatBox.appendChild(bubble);
    });

    // Criterio de Rúbrica: Scroll automático al último mensaje
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // 5. Lógica de envío de mensajes integrada con async/await y try/catch (Requisito Henry)
  async function handleSend() {
    const text = inputMsg.value.trim();
    if (!text || localState.loading) return;

    localState.loading = true;
    localState.error = null;

    // Agregar mensaje del usuario
    localState.messages.push({
      role: "user",
      text,
      time: getTime(),
    });

    inputMsg.value = "";
    renderMessages();

    // Clonamos historial limpio para la API antes del indicador "typing"
    const cleanHistory = [...localState.messages];

    // Mostrar burbuja de "Escribiendo..."
    localState.messages.push({
      role: "bot",
      text: "",
      typing: true,
    });
    const botMessageIndex = localState.messages.length - 1;
    renderMessages();

    try {
      // 🌟 INTERRUPTOR SEGURO: Llama a la función puente de abajo
      const reply = await getAIResponse(cleanHistory, characterName);

      if (!reply) throw new Error("Respuesta inválida");

      localState.messages[botMessageIndex] = {
        role: "bot",
        text: reply,
        time: getTime(),
        typing: false,
      };
    } catch (error) {
      localState.messages[botMessageIndex] = {
        role: "bot",
        text: "¡Fallo de motor! Error al conectar con el servidor.",
        time: getTime(),
        typing: false,
      };
      localState.error = error.message;
    }

    localState.loading = false;
    renderMessages();
  }

  // 6. Escuchadores de Eventos modulares
  btnSend.addEventListener("click", handleSend);
  inputMsg.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  // Funciones auxiliares
  function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // 🌟 PUENTE CONMUTABLE (MOCK VS REAL)
  async function getAIResponse(history, char) {
    // 🏁 MODO INTERNO ACTIVO: Consume tu mockAI.js
    const lastUserText = history[history.length - 1].text;
    const mockReply = await mockSendMessage(lastUserText, char);
    return mockReply;

    /* // 🚀 MODO PRODUCCIÓN (Descomentar el día del deploy)
    const result = await sendMessageToGemini(history, char);
    return typeof result === "string" ? result : result?.reply;
    */
  }

  // Renderizamos los mensajes iniciales inmediatamente
  setTimeout(renderMessages, 0);

  // Retornamos el elemento del DOM listo para el router
  return viewEl;
}