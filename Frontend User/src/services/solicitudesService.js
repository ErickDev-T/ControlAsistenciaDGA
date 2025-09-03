export async function uploadFile(file, signal) {
  const url = "https://localhost:44351/api/Files/upload";
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(url, { method: "POST", body: fd, signal });
  if (!res.ok) throw new Error("No se pudo subir el archivo");
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
