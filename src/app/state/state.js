// /src/state/state.js
export const state = {
  selectedCharacter: null,
  
  // Usamos un objeto para indexar historiales: { "Mcqueen": [], "Mate": [] }
  histories: {},

  // Estado de UI global
  loading: false,
  error: null,

  // Helper para obtener el historial del personaje actual
  getMessages(characterName) {
    return this.histories[characterName] || [];
  },

  // Helper para actualizar el historial
  setMessages(characterName, messages) {
    this.histories[characterName] = messages;
  }
};