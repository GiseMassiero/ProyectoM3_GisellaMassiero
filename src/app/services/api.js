/**
 * Envia el historial completo de la conversación al proxy seguro en Vercel
 * para procesar la respuesta con Inteligencia Artificial.
 * * @param {Array} messagesHistory - El array state.messages con toda la conversación acumulada
 * @param {string} character - El personaje activo (mate, sally, mcqueen, hudson)
 * @returns {Promise<Object>} Objeto con la respuesta formateada: { reply: "texto" }
 */

import { createChatResponse } from '../utils/helpers';

// /src/app/services/api.js

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

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    // Recibimos el objeto híbrido completo del backend
    const data = await response.json();
    
    // Devolvemos el objeto directamente. 
    // Como data ahora contiene 'content', 'id', 'usage' y 'reply', 
    // tu Chat.js tendrá todo lo que necesita.
    return data; 

  } catch (error) {
    console.error("Error en sendMessage:", error);
    throw error;
  }
}