// services/uploads.js
export async function uploadFileBySolicitudId(solicitudId, file, signal) {
  if (!solicitudId) throw new Error("Falta el ID de la solicitud");
  if (!file) throw new Error("Selecciona un archivo");

  const url = `/api/Uploads/${encodeURIComponent(solicitudId)}`;
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(url, { method: "POST", body: fd, signal });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `No se pudo subir el archivo (HTTP ${res.status})`);
  }
  return res.json(); // { url, tipo }
}
