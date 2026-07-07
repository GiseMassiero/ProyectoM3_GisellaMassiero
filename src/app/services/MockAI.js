import { characters } from "../../data/characters.js";

export async function mockSendMessage(text, characterKey = "mate") {
  await new Promise(r => setTimeout(r, 600));

  const key = (characterKey || "mate").toLowerCase();
  const character = characters[key] || characters.mate;

  const baseReplies = {
    mate: [
      "¡Yeehaw! eso suena increíble 😄",
      "No sé mucho de eso, pero seguro lo resolvemos juntos 🚗",
      "En Radiator Springs siempre encontramos la forma 👍"
    ],

    mcqueen: [
      "Kachow! eso suena como un desafío 🏁",
      "Estoy listo para cualquier carrera o problema ⚡",
      "La velocidad y la actitud lo son todo 🚗💨"
    ],

    hudson: [
      "La experiencia enseña más que la velocidad.",
      "No todas las carreras se ganan rápido.",
      "Observa primero, actúa después."
    ],

    sally: [
      "A veces lo importante es disfrutar el camino 💙",
      "Radiator Springs siempre tiene algo que enseñar.",
      "Todo mejora con calma y perspectiva."
    ]
  };

  const list = baseReplies[key] || baseReplies.mate;

  const reply = list[Math.floor(Math.random() * list.length)];

  return reply;
}