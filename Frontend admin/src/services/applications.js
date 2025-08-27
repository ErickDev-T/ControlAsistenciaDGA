export async function getApplications(signal) {
  // Si configuraste proxy en Vite, usa "/api/Applications/listed"
  const res = await fetch("https://localhost:44384/api/Applications/listed", { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
