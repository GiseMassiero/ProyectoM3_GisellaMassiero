export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    // 💡 SOLUCIÓN: Cambiamos "message" por "messages" (el array que manda el frontend)
    const { messages, character } = body;

    const systemPrompts = {
      mate: "Eres Mate de Cars. Eres divertido, torpe pero sabio. Responde SIEMPRE en español latino de forma corta (2-3 frases) y amigable.",
      mcqueen: "Eres El Rayo McQueen de Cars. Eres competitivo, seguro de ti mismo, motivador y pasional. Usa tu famoso '¡Cuchau!' de vez en cuando.",
      hudson: "Eres Doc Hudson de Cars. Eres serio, sabio, experimentado y actúas como un mentor estricto pero justo.",
      sally: "Eres Sally Carrera de Cars. Eres calmada, empática, inteligente, sofisticada y positiva."
    };

    const systemInstructionText = systemPrompts[character?.toLowerCase()] || systemPrompts.mate;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Falta GEMINI_API_KEY en las variables de entorno" });
    }

    // 💡 REQUISITO DE RÚBRICA: Transformamos tu historial interno al formato oficial de Gemini (user / model)
    const formattedContents = (messages || []).map((m) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      };
    });

    // Si por alguna razón el historial llegó vacío, creamos al menos un contenido inicial de respaldo
    if (formattedContents.length === 0) {
      formattedContents.push({ role: "user", parts: [{ text: "Hola" }] });
    }

    // Usamos el modelo estable gemini-1.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // 💡 Enviamos el System Prompt de forma limpia y aislada usando la propiedad oficial
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          contents: formattedContents, // Enviamos toda la conversación estructurada
          generationConfig: {
            temperature: character?.toLowerCase() === "mate" ? 0.9 : 0.6,
            maxOutputTokens: 400
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ reply: "Error Gemini API", detail: err });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No entendí eso 😅";

    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Error conectando con Gemini 😢"
    });
  }
}