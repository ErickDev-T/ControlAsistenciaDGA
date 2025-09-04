import { useState, useEffect } from "react";
import { getUsuarioByCode } from "../../services/usuarios";
import { saveSolicitudFromCode, uploadFile } from "../../services/solicitudesService";
import { uploadFileBySolicitudId } from "../../services/uploads";

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

  useEffect(() => {
    setExitDate(entryDate || "");
  }, [entryDate]);

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
    // exitDate ya se iguala a entryDate
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

      // primero crear la solicitud sin documento 
      const payload = {
        code: Number(codigo),
        entryDate,
        entryTime,
        exitDate: entryDate,     //  igual a la de entrada
        exitTime: exitTime || null,
        documentUrl: null,
        documentType: null,
      };

      const sol = await saveSolicitudFromCode(payload, ctrl.signal);

      //obtener el id
      const solicitudId = sol?.id ?? sol?.data?.id ?? sol?.solicitudId ?? null;

      if (!solicitudId) {
        throw new Error("No se pudo obtener el ID de la solicitud");
      }

      // subir archivo si hay usando el ID
      let uploaded = null;
      if (file) {
        uploaded = await uploadFileBySolicitudId(solicitudId, file, ctrl.signal);
        // uploaded = { url, tipo }
      }

      setOkMsg("Solicitud guardada con éxito");
      setCodigo("");
      setNombre("");
      setEntryDate("");
      setEntryTime("");
      setExitDate("");
      setExitTime("");
      setFile(null);
      e.target.reset();
    } catch (e2) {
      setErr(e2.message || "No se pudo guardar");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 mt-12">
      <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">
        Formulario de Registro mismo dia
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Ingresa el código, confirma el nombre y completa fecha/hora. Adjunta un documento si aplica.
      </p>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Código + Buscar */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código del empleado <span className="text-red-500">*</span>
          </label>
          <div className="flex items-end gap-3">
            <input
              type="text"
              inputMode="numeric"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onBuscar()}
              placeholder="Ej.: 1001"
              className="flex-1 rounded-xl border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              aria-describedby="codigo-help"
            />
            <button
              type="button"
              onClick={onBuscar}
              disabled={loading}
              className="h-[42px] px-5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 transition"
              aria-label="Buscar por código"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
          <p id="codigo-help" className="mt-1 text-xs text-gray-500">
            Escribe el código y presiona <b>Buscar</b> para cargar el nombre.
          </p>
        </div>

        {/* Nombre */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre y Apellido
          </label>
          <input
            disabled
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="—"
            className="w-full rounded-xl border border-blue-200 px-3 py-2 shadow-sm bg-gray-50 text-gray-600"
          />
        </div>

        {/* Sección: Fechas y horas */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
              Fechas y horas
            </h3>
          </div>
        </div>

        {/* Fecha de entrada */}
        <div >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de entrada <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full h-11 rounded-xl border border-blue-200 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          />
          <p className="mt-1 text-xs text-gray-500">Día de inicio de la jornada.</p>
        </div>

        {/* Hora de entrada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de entrada <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            step="60"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            className="w-full h-11 rounded-xl border border-blue-200 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          />
          <p className="mt-1 text-xs text-gray-500">Ej.: 08:00</p>
        </div>

        {/* Hora de salida  */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de salida <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            step="60"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            className="w-full h-11 rounded-xl border border-blue-200 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          />
          <p className="mt-1 text-xs text-gray-500">Ej.: 16:00</p>
        </div>


        {/* Documento */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
              Documento de soporte (opcional)
            </h3>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adjuntar archivo
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            accept="image/*,application/pdf"
            className="w-full rounded-xl border border-blue-200 px-3 py-2 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          />
          <p className="mt-1 text-xs text-gray-500">
            Formatos permitidos: PDF o imagen.
          </p>
        </div>

        {/* Mensajes */}
        {err && (
          <div className="col-span-1 md:col-span-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
            {err + " error debugg xd"}
          </div>
        )}
        {okMsg && (
          <div className="col-span-1 md:col-span-2 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-100">
            {okMsg}
          </div>
        )}

        {/* Acciones */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 transition"
          >
            {submitting ? "Guardando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>

  );
}
