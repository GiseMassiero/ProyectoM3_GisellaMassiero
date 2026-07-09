import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
 
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

    const MODEL_NAME = "gemini-3.1-flash-lite";

    let formattedContents = (messages || []).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text || "" }]
    }));

    const systemInstructionText = systemPrompts[character?.toLowerCase()] || systemPrompts.mate;
    formattedContents.unshift({
      role: "user",
      parts: [{ text: `INSTRUCCIÓN DE SISTEMA: ${systemInstructionText}. (Responde siempre bajo este rol).` }]
    });

    let response;
    try {
      response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: formattedContents,
        config: {
          temperature: character?.toLowerCase() === "mate" ? 0.9 : 0.6,
          maxOutputTokens: 400
        }
      });
    } catch (apiError) {
      console.error("Error de API:", apiError);
      return res.status(500).json({ reply: "Fallo de motor en la conexión con el servidor." });
    }

    const replyText = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || "¡Fallo de motor! No pude responder.";

   
    const finalResponse = createChatResponse({
      text: replyText,
      payload: formattedContents,
      finishReason: response?.candidates?.[0]?.finishReason || 'STOP',
      usage: response?.usageMetadata
    });


    res.status(200).json({ 
      ...finalResponse,
      reply: replyText 
    });

  } catch (error) {
    console.error("Error crítico:", error);
    res.status(500).json({ reply: "Error interno del servidor." });
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