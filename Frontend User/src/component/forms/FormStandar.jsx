import { useState } from "react";
import { getUsuarioByCode } from "../../services/usuarios";
import { saveSolicitudFromCode, uploadFile } from "../../services/solicitudesService"; // 👈

export default function FormStandar() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [entryDate, setEntryDate] = useState("");   // yyyy-mm-dd
  const [entryTime, setEntryTime] = useState("");   // HH:mm
  const [exitDate, setExitDate] = useState("");     // yyyy-mm-dd
  const [exitTime, setExitTime] = useState("");     // HH:mm
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const onBuscar = async () => {
    setErr("");
    setOkMsg("");
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

  const validate = () => {
    if (!codigo?.toString().trim()) return "Ingresa un código";
    if (!entryDate) return "Ingresa la fecha de entrada";
    if (!entryTime) return "Ingresa la hora de entrada";
    // salida opcional: si pones hora/fecha salida, mejor que estén ambas
    if ((exitDate && !exitTime) || (!exitDate && exitTime))
      return "Completa ambos campos de salida (fecha y hora) o deja ambos vacíos";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOkMsg("");

    const msg = validate();
    if (msg) return setErr(msg);

    const ctrl = new AbortController();
    try {
      setSubmitting(true);

      // 1) Si hay archivo y tienes un endpoint de upload, súbelo primero
      let documentUrl = null;
      let documentType = null;

      if (file) {
        // Si no tienes endpoint, comenta estas líneas y deja documentUrl/documentType en null
        const up = await uploadFile(file, ctrl.signal);
        documentUrl = up?.url ?? null;
        documentType = up?.contentType ?? (file.type || null);
      }

      // 2) Armar payload que tu API espera
      const payload = {
        code: Number(codigo),     // <- tu endpoint usa "code"
        entryDate,                // "2025-09-01"
        entryTime,                // "08:00"
        exitDate: exitDate || null,
        exitTime: exitTime || null,
        documentUrl,
        documentType
      };

      // 3) Guardar
      await saveSolicitudFromCode(payload, ctrl.signal);

      setOkMsg("Solicitud guardada con éxito ✅");
      // Limpia campos (deja nombre por si lo quieres conservar)
      // setNombre(""); // si quieres resetear también el nombre
      setEntryDate("");
      setEntryTime("");
      setExitDate("");
      setExitTime("");
      setFile(null);
    } catch (e2) {
      setErr(e2.message || "No se pudo guardar");
    } finally {
      setSubmitting(false);
    }
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
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          placeholder="Fecha entrada"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />
        <input
          type="time"
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
          placeholder="Hora entrada"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />
        <input
          type="date"
          value={exitDate}
          onChange={(e) => setExitDate(e.target.value)}
          placeholder="Fecha salida"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />
        <input
          type="time"
          value={exitTime}
          onChange={(e) => setExitTime(e.target.value)}
          placeholder="Hora salida"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />

        {/* documento */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="col-span-1 md:col-span-2 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />

        {/* error / ok */}
        {err && (
          <div className="col-span-1 md:col-span-2 text-sm text-red-600">{err}</div>
        )}
        {okMsg && (
          <div className="col-span-1 md:col-span-2 text-sm text-green-600">{okMsg}</div>
        )}

        {/* enviar */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Guardando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
