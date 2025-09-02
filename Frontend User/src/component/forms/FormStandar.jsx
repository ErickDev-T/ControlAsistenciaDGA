import { useState } from "react";
import { getUsuarioByCode } from "../../services/usuarios";

export default function FormStandar() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onBuscar = async () => {
    setErr("");
    const c = (codigo ?? "").toString().trim();
    if (!c) return setErr("Ingresa un código");

    const ctrl = new AbortController();
    try {
      setLoading(true);
      const data = await getUsuarioByCode(c, ctrl.signal);
      setNombre(data?.nombreApellido ?? "");
      if (!data?.nombreApellido) setErr("Usuario sin nombre registrado");
    } catch (e) {
      setNombre("");
      setErr(e.message || "No se pudo buscar");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Formulario 1</h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* codigo + buscar + nombre */}
        <div className="flex gap-2 col-span-1 md:col-span-2">
          <input
            type="text"
            inputMode="numeric"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onBuscar()}
            placeholder="Código"
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
          />
          <button
            type="button"
            onClick={onBuscar}
            disabled={loading}
            className="px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            aria-label="Buscar por código"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y Apellido"
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
          />
        </div>

        {/* fechas y horas */}
        <input type="date" placeholder="Fecha entrada" className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20" />
        <input type="time" placeholder="Hora entrada" className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20" />
        <input type="date" placeholder="Fecha salida" className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20" />
        <input type="time" placeholder="Hora salida" className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20" />

        {/* documento */}
        <input type="file" className="col-span-1 md:col-span-2 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20" />

        {/* error */}
        {err && (
          <div className="col-span-1 md:col-span-2 text-sm text-red-600">{err}</div>
        )}

        {/* enviar */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button type="submit" className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
