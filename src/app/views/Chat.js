// /src/app/views/Chat.js
import { state } from "../state/state.js";
import { navigateTo } from "../router.js";
import { sendMessage } from "../services/api.js";

export function Chat(params) {
  // 1. Obtenemos el personaje
  const characterName = params.get("character") || state.selectedCharacter || "Mcqueen";

  // 2. Recuperamos el historial persistente del estado global
  let messages = state.getMessages(characterName);

  // 3. Si no hay mensajes, inyectamos el saludo inicial
  if (messages.length === 0) {
    const characterGreetings = {
      "Mcqueen": "¡¡¡Cuchau!!! Soy el Rayo McQueen. ¿Listo para correr una carrera de charlas a toda velocidad?",
      "Mate": "¡Hola, soy Mate! Como el tomate, pero sin el 'to'. ¡Preparate para una charla sobre ruedas!",
      "Sally": "¡Hola! Soy Sally. Bienvenida a Radiador Springs. ¿Lista para dar un paseo tranquilo y charlar un rato?",
      "Doc": "Soy el Doc Hudson. Más vale que tengas los neumáticos bien inflados si vas a charlar conmigo, novato."
    };
    
    const greetingText = characterGreetings[characterName] || `¡Hola! Soy ${characterName}. ¿Listo para correr una carrera de charlas?`;
    
    messages = [{
      role: "bot",
      text: greetingText,
      time: getTime(),
      typing: false
    }];
    state.setMessages(characterName, messages);
  }

  // 4. Estructura visual
  const viewEl = document.createElement("div");
  viewEl.classList.add("chat");

  viewEl.innerHTML = `
    <div class="chat-layout" style="position: relative;">
      <button id="btnCloseChat" class="close-chat-btn" title="Cerrar chat">&times;</button>
      <aside class="chat-sidebar">
        <img class="character-img" src="/personajes/${characterName.toLowerCase() === 'mcqueen' ? 'mcqueen' : characterName.toLowerCase()}.jpg" alt="${characterName}" onerror="this.style.display='none'"/>
        <h2 style="color: #ffd000; font-weight: 700; font-size: 1.6rem;">${characterName}</h2>
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

  const chatBox = viewEl.querySelector("#chatBox");
  const inputMsg = viewEl.querySelector("#inputMsg");
  const btnSend = viewEl.querySelector("#btnSend");
  const btnCloseChat = viewEl.querySelector("#btnCloseChat");

  btnCloseChat.addEventListener("click", () => navigateTo("/"));

  function renderMessages() {
    chatBox.innerHTML = "";
    messages.forEach((msg) => {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble", msg.role === "user" ? "user" : "bot");

      if (msg.typing) {
        bubble.innerHTML = `<span class="typing-indicator">Escribiendo...</span>`;
      } else {
        bubble.innerHTML = `
          <div class="bubble-content"><p>${msg.text}</p></div>
          <span class="time">${msg.time || ""}</span>
        `;
      }
      chatBox.appendChild(bubble);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function handleSend() {
    const text = inputMsg.value.trim();
    if (!text || state.loading) return;

    state.loading = true;
    
    // Agregar mensaje usuario
    messages.push({ role: "user", text, time: getTime() });
    inputMsg.value = "";
    renderMessages();

    // Mostrar indicador typing
    messages.push({ role: "bot", text: "", typing: true });
    const botMessageIndex = messages.length - 1;
    renderMessages();

    try {
      const replyObj = await sendMessage(messages.slice(0, -1), characterName);
      const textoRespuesta = replyObj.content[0].text;

      messages[botMessageIndex] = { role: "bot", text: textoRespuesta, time: getTime(), typing: false };
    } catch (error) {
      messages[botMessageIndex] = { role: "bot", text: "¡Fallo de motor! Error al conectar.", time: getTime(), typing: false };
    }

    state.loading = false;
    state.setMessages(characterName, messages); // Guardar en estado global
    renderMessages();
  }

  btnSend.addEventListener("click", handleSend);
  inputMsg.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  setTimeout(renderMessages, 0);
  return viewEl;
}