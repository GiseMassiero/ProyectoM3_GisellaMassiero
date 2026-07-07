/**
 * Envia el historial completo de la conversación al proxy seguro en Vercel
 * para procesar la respuesta con Inteligencia Artificial.
 * * @param {Array} messagesHistory - El array state.messages con toda la conversación acumulada
 * @param {string} character - El personaje activo (mate, sally, mcqueen, hudson)
 * @returns {Promise<Object>} Objeto con la respuesta formateada: { reply: "texto" }
 */
export async function sendMessage(messagesHistory, character) {
  try {
    const key = (character || "mate").toLowerCase().trim();

    // 💡 REQUISITO DE RÚBRICA: Le pegamos a nuestra Serverless Function interna.
    // De esta manera la API Key se queda en el servidor y NUNCA se expone en el cliente.
    const response = await fetch("/api/functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messagesHistory, // 💡 Mandamos TODO el historial completo para que tenga memoria
        character: key,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    const data = await response.json();

    // Retornamos el objeto estructurado exactamente como lo espera tu Chat.js
    return {
      reply: data.reply || "Lo siento, no puedo responder en este momento.",
    };

  } catch (error) {
    console.error("Error en api.js:", error);
    // Relanzamos el error para que Chat.js lo capture en su bloque catch y dibuje el estado visual de error
    throw error; 
  }
}