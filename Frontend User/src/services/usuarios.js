// src/services/usuarios.js
export async function getUsuarioByCode(code, signal) {
  if (!code) throw new Error("Código requerido");

  const res = await fetch(`/api/usuarios/by-code?codigo=${encodeURIComponent(code)}`, {
    signal,
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    // el backend a veces devuelve 404 con usuario no encontrado"
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json(); // { id, codigo, nombreApellido }
}
