export const state = {
  // Personaje seleccionado en Home
  selectedCharacter: null,

  // Personaje que está usando el chat
  currentCharacter: null,

  // Historial de conversación
  messages: [],

  // Estado de la petición a la IA
  loading: false,

  // Mensaje de error (si ocurre alguno)
  error: null
};