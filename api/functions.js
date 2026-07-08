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

    const systemInstructionText = systemPrompts[character?.toLowerCase()] || systemPrompts.mate;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Falta configuración de API" });
    }

    // Aseguramos que el historial sea válido
    const formattedContents = (messages || []).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text || "" }]
    }));

    // IMPORTANTE: Gemini falla si el primer mensaje en 'contents' es 'model'. 
    // Si el historial empieza con model, lo filtramos o lo ajustamos.
    const validContents = formattedContents.length > 0 && formattedContents[0].role === 'model' 
      ? formattedContents.slice(1) 
      : formattedContents;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { // Cambio clave: el nombre del campo suele ser con guion bajo
            parts: [{ text: systemInstructionText }]
          },
          contents: validContents,
          generationConfig: {
            temperature: character?.toLowerCase() === "mate" ? 0.9 : 0.6,
            maxOutputTokens: 400
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de Gemini:", JSON.stringify(errorData));
      return res.status(500).json({ reply: "Error al consultar a Hudson 🛠️" });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "¡Fallo de motor! No obtuve respuesta.";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Error crítico:", error);
    res.status(500).json({ reply: "Error interno del servidor" });
  }
}