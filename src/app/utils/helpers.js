
// --- Lógica de Estado ---
export function addMessage(state, msg) {
  state.messages.push(msg);
}

// --- Lógica de IA/API ---
export function mapStopReason(reason) {
  // ... tu código
}

export function createChatResponse({ text, payload, finishReason, usage }) {
  // ... tu código
}