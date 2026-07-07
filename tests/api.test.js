import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessage } from "../src/app/services/api.js";

// Globalizamos el mock de fetch para simular el comportamiento de la red
global.fetch = vi.fn();

describe("Pruebas unitarias para el servicio de API (sendMessage)", () => {
  
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Debe retornar la respuesta parseada correctamente cuando el servidor responde con éxito", async () => {
    // Simulamos una respuesta exitosa (status 200) de nuestra Serverless Function
    const mockApiResponse = { reply: "¡Ka-chow! Listo para la carrera." };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const mockHistory = [{ role: "user", text: "Hola Rayo" }];
    const result = await sendMessage(mockHistory, "mcqueen");

    // Verificaciones (Assertions)
    expect(fetch).toHaveBeenCalledWith("/api/functions", expect.any(Object));
    expect(result).toEqual({ reply: "¡Ka-chow! Listo para la carrera." });
  });

  it("Debe lanzar un error cuando la Serverless Function devuelve un estado que no es OK (ej: 500)", async () => {
    // Simulamos un fallo en el servidor de Vercel (status 500)
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const mockHistory = [{ role: "user", text: "Hola Mate" }];

    // Verificamos que la promesa sea rechazada y lance el error esperado
    await expect(sendMessage(mockHistory, "mate")).rejects.toThrow("Error en el servidor: 500");
  });

  it("Debe capturar errores de red o excepciones inesperadas", async () => {
    // Simulamos que directamente se cayó el servidor o falló la conexión física de red
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    const mockHistory = [{ role: "user", text: "Hola Sally" }];

    await expect(sendMessage(mockHistory, "sally")).rejects.toThrow("Network Error");
  });
});