// src/services/solicitudes.js

// (Opcional) si tienes un endpoint para subir archivos (multipart/form-data)
export async function uploadFile(file, signal) {
  // Cambia la URL si tu backend usa otra ruta (p. ej. /api/Files/upload)
  const url = "https://localhost:44351/api/Files/upload";
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(url, { method: "POST", body: fd, signal });
  if (!res.ok) throw new Error("No se pudo subir el archivo");
  // Se espera que el backend devuelva { url: "https://...", contentType: "application/pdf" }
  return res.json();
}

/**
 * Guarda una solicitud usando el endpoint from-code
 * body esperado por tu Swagger:
 * {
 *   code, entryDate, entryTime, exitDate, exitTime, documentUrl, documentType
 * }
 */
export async function saveSolicitudFromCode(payload, signal) {
  const res = await fetch("https://localhost:44351/api/Solicitudes/from-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Error al guardar la solicitud");
  }
  return res.json(); // o .text() si tu API devuelve texto
}
