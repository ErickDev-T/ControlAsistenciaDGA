import { useState } from "react";
import { getUsuarioByCode } from "../../services/usuarios";
import { saveSolicitudFromCode, uploadFile } from "../../services/solicitudesService";

export default function FormStandar() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitTime, setExitTime] = useState("");
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
    if (!exitDate) return "Ingresa la fecha de salida";
    if (!exitTime) return "Ingresa la hora de salida";
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

      let documentUrl = null;
      let documentType = null;

      if (file) {
        const up = await uploadFile(file, ctrl.signal);
        documentUrl = up?.url ?? null;
        documentType = up?.contentType ?? (file.type || null);
      }

      const payload = {
        code: Number(codigo),
        entryDate,
        entryTime,
        exitDate: exitDate || null,
        exitTime: exitTime || null,
        documentUrl,
        documentType,
      };

      await saveSolicitudFromCode(payload, ctrl.signal);

      setOkMsg("✅ Solicitud guardada con éxito");
      setCodigo("");
      setNombre("");
      setEntryDate("");
      setEntryTime("");
      setExitDate("");
      setExitTime("");
      setFile(null);
    } catch (e2) {
      setErr(e2.message || "❌ No se pudo guardar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 mt-12">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Formulario de Registro
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* codigo + buscar + nombre */}
        <div className="flex gap-2 col-span-1 md:col-span-2">
          <input
            type="text"
            inputMode="numeric"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onBuscar()}
            placeholder="Código"
            className="flex-1 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          />
          <button
            type="button"
            onClick={onBuscar}
            disabled={loading}
            className="px-5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 transition"
            aria-label="Buscar por código"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          <input
            disabled
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y Apellido"
            className="flex-1 rounded-lg border border-blue-200 shadow-sm bg-gray-50 text-gray-600"
          />
        </div>

        {/* fechas y horas */}
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          className="rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
        <input
          type="time"
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
          className="rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
        <input
          type="date"
          value={exitDate}
          onChange={(e) => setExitDate(e.target.value)}
          className="rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />
        <input
          type="time"
          value={exitTime}
          onChange={(e) => setExitTime(e.target.value)}
          className="rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />

        {/* documento */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="col-span-1 md:col-span-2 rounded-lg border border-blue-200 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
        />

        {/* error / ok */}
        {err && (
          <div className="col-span-1 md:col-span-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {err}
          </div>
        )}
        {okMsg && (
          <div className="col-span-1 md:col-span-2 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-lg">
            {okMsg}
          </div>
        )}

        {/* enviar */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 transition"
          >
            {submitting ? "Guardando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
