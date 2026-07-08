
export default async function handler(req, res) {
  // 1. Validar método
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { messages, character } = body;

    const systemPrompts = {
      mate: "Eres Mate de Cars. Eres divertido, torpe pero sabio. Responde SIEMPRE en español latino de forma corta (2-3 frases) y amigable.",
      mcqueen: "Eres El Rayo McQueen de Cars. Eres competitivo, seguro de ti mismo, motivador y pasional. Usa tu famoso '¡Cuchau!' de vez en cuando.",
      hudson: "Eres Doc Hudson de Cars. Eres serio, sabio, experimentado y actúas como un mentor estricto pero justo.",
      sally: "Eres Sally Carrera de Cars. Eres calmada, empática, inteligente, sofisticada y positiva."
    };

    // 2. Definir el modelo correcto 
    const MODEL_NAME = "gemini-3.1-flash-lite";

    // 3. Preparar historial (forzar que el primero sea 'user' si es necesario)
    let formattedContents = (messages || []).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text || "" }]
    }));

    // Insertar el system prompt al inicio como el primer mensaje del usuario para asegurar contexto
    const systemInstructionText = systemPrompts[character?.toLowerCase()] || systemPrompts.mate;
    formattedContents.unshift({
      role: "user",
      parts: [{ text: `INSTRUCCIÓN DE SISTEMA: ${systemInstructionText}. (Responde siempre bajo este rol).` }]
    });

    // 4. Llamada a la API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: formattedContents,
          generationConfig: {
            temperature: character?.toLowerCase() === "mate" ? 0.9 : 0.6,
            maxOutputTokens: 400
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de API:", JSON.stringify(errorData));
      return res.status(500).json({ reply: "Fallo de motor en la conexión con el servidor." });
    }

    const data = await response.json();
    // 1. Extraemos los datos necesarios
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "¡Fallo de motor! No pude responder.";
    const finishReason = data?.candidates?.[0]?.finishReason || "STOP";
    const usage = data?.usageMetadata; // Gemini suele devolver esto

    // 2. Creamos la respuesta con el formato del profesor
    const finalResponse = createChatResponse({
      text: replyText,
      payload: formattedContents,
      finishReason: finishReason,
      usage: {
        promptTokenCount: usage?.promptTokenCount,
        candidatesTokenCount: usage?.candidatesTokenCount
      }
    });

    // 3. Enviamos el objeto formateado en lugar de solo { reply: ... }
    res.status(200).json(finalResponse);

  } catch (error) {
    // ...
  }
}

function mapStopReason(reason) {
  switch (reason) {
    case 'MAX_TOKENS': return 'max_tokens';
    case 'STOP': return 'end_turn';
    default: return 'end_turn';
  }
}

function createChatResponse({ text, payload, finishReason, usage }) {
  return {
    id: `msg_gemini_${Date.now()}`,
    type: 'message',
    role: 'assistant',
    content: [{ type: 'text', text }],
    stop_reason: mapStopReason(finishReason),
    usage: {
      input_tokens: usage?.promptTokenCount ?? 0,
      output_tokens: usage?.candidatesTokenCount ?? 0,
    },
  };
}