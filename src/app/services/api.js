/**
 * Envia el historial completo de la conversación al proxy seguro en Vercel
 * para procesar la respuesta con Inteligencia Artificial.
 * * @param {Array} messagesHistory - El array state.messages con toda la conversación acumulada
 * @param {string} character - El personaje activo (mate, sally, mcqueen, hudson)
 * @returns {Promise<Object>} Objeto con la respuesta formateada: { reply: "texto" }
 */
// /src/app/services/api.js
import { createChatResponse } from '../utils/helpers';

export async function sendMessage(messagesHistorial, character) {
  try {
    const response = await fetch("/api/functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messagesHistorial,
        character: character,
      }),
    });

    // Control estricto de errores para que coincida con tu test unitario
    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    const data = await response.json();
    
    const respuestaFormateada = createChatResponse({
      text: data.reply,
      payload: messagesHistorial, // Pasamos el historial como payload
      finishReason: 'STOP',       // Asumimos éxito por defecto
      usage: null                 // O puedes pasar el objeto de uso si el server lo envía
    });

    // 3. Retornamos el objeto completo formateado
    return respuestaFormateada; 

  } catch (error) {
    console.error("Error en sendMessage:", error);
    throw error;
  }
}