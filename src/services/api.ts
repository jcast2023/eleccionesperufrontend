import type { Respuestas, Resultado } from "../types/encuesta";

// Centralizamos la base de la URL. 
// Si Vite no encuentra la variable, usará localhost por defecto.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const enviarRespuestas = async (
  respuestas: Respuestas
): Promise<Resultado[]> => {
  // Usamos la constante API_BASE_URL
  const response = await fetch(`${API_BASE_URL}/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(respuestas),
  });

  if (!response.ok) {
    throw new Error(`Error en el match: ${response.status}`);
  }

  return response.json();
};

export const compararCandidatos = async (c1: number, c2: number) => {
  // Usamos la constante API_BASE_URL y template literals
  const res = await fetch(
    `${API_BASE_URL}/comparar-full?c1=${c1}&c2=${c2}`
  );

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }

  return res.json();
};