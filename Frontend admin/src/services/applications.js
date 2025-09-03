export async function getApplications(signal) {
  const res = await fetch(`/api/Solicitudes/listed`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Borrar únicamente por Id
export async function deleteApplication(id) {
  const res = await fetch(`/api/Solicitudes/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
  return true;
}

