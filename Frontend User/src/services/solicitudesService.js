export async function uploadFile(codigo, file, signal) {
  if (!codigo) throw new Error("Falta el código de la solicitud");
  if (!file) throw new Error("Selecciona un archivo");

  const url = `/api/Uploads/${encodeURIComponent(codigo)}`;

  const fd = new FormData();
  fd.append("file", file); // el nombre del campo debe ser 'file'

  const res = await fetch(url, { method: "POST", body: fd, signal });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `No se pudo subir el archivo (HTTP ${res.status})`);
  }
  // Respuesta esperada url: "...", tipo: "image/png"
  return res.json();
}


export async function saveSolicitudFromCode(payload, signal) {
  const res = await fetch("/api/Solicitudes/from-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${txt}`);
  }
  return res.json();
}
