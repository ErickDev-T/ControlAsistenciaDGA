// src/components/Table.jsx
import { useMemo, useState } from "react";
import { useApplications } from "../hooks/useApplications";
import ConfirmDialog from "./ConfirmDialog";
import Swal from "sweetalert2";
import { handleViewDoc } from "../utils/alertDoc";
import { Search, FileText, Check, X } from "lucide-react";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("es-DO") : "");
const norm = (v) =>
  (v ?? "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

// selectedDate en formato YYYY-MM-DD
export default function Table({ selectedDate = "", controller }) {
  const local = useApplications();
  const { data, loading, error, remove } = controller ?? local;

  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState({ open: false, action: null, row: null });

  const openConfirm = (action, row) => setDialog({ open: true, action, row });
  const closeConfirm = () => setDialog({ open: false, action: null, row: null });

  const filtered = useMemo(() => {
    let rows = Array.isArray(data) ? data : [];

    const q = norm(query.trim());
    if (q) {
      rows = rows.filter((r) => {
        const codigo = String(r.codigo ?? r.Codigo ?? "");
        const nombre = norm(r.nombreApellido ?? r.NombreApellido ?? "");
        return codigo.includes(query.trim()) || nombre.includes(q);
      });
    }

    if (selectedDate) {
      rows = rows.filter((r) => {
        const raw = r.fechaEntrada ?? r.FechaEntrada ?? null;
        if (!raw) return false;
        const d = new Date(raw);
        const key =
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`;
        return key === selectedDate;
      });
    }

    return rows;
  }, [data, query, selectedDate]);

  // confirmando de acciones
  const doConfirm = async () => {
    const { action, row } = dialog;
    if (!row) return;

    try {
      if (action === "reject") {
        const id = row.codigo ?? row.Codigo;
        await remove(id); // llama al hook para borrar y actualizar estado

        Swal.fire({
          icon: "success",
          title: "Solicitud eliminada",
          text: `${row.nombreApellido ?? row.NombreApellido ?? ""} (#${id})`,
          timer: 1400,
          showConfirmButton: false,
        });
      } else if (action === "accept") {
        Swal.fire({
          icon: "success",
          title: "Solicitud aceptada",
          text: `${row.nombreApellido ?? row.NombreApellido ?? ""} (#${
            row.codigo ?? row.Codigo
          })`,
          timer: 1400,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "No se pudo completar", text: err.message || "Error" });
    } finally {
      closeConfirm();
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error)   return <div className="p-6 text-red-600">Error: {String(error)}</div>;

  const dialogText =
    dialog.action === "accept"
      ? { title: "¿Aceptar solicitud?", desc: "Confirmas que esta solicitud será aprobada." }
      : dialog.action === "reject"
      ? { title: "¿Rechazar solicitud?", desc: "Esta acción eliminará el registro de la base de datos." }
      : { title: "", desc: "" };

  const tone = dialog.action === "accept" ? "success" : "destructive";
  const confirmLabel = dialog.action === "accept" ? "Aceptar" : "Rechazar";

  return (
    <div className="overflow-x-auto p-6">
      {/* busqueda */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código o nombre..."
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700">
            Limpiar
          </button>
        )}
        <span className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg shadow text-sm font-medium whitespace-nowrap">
          Pendientes: {filtered.length}
        </span>
      </div>

      {/* tabla */}
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-white text-blue sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Entrada</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Hora Entrada</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Salida</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Hora Salida</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r, i) => {
                const codigo = r.codigo ?? r.Codigo;
                const nombre = r.nombreApellido ?? r.NombreApellido ?? "";
                const fechaEntrada = r.fechaEntrada ?? r.FechaEntrada ?? null;
                const fechaSalida  = r.fechaSalida  ?? r.FechaSalida  ?? null;
                const horaEntrada  = r.horaEntrada  ?? r.HoraEntrada  ?? "";
                const horaSalida   = r.horaSalida   ?? r.HoraSalida   ?? "";

                return (
                  <tr
                    key={codigo}
                    className={`transition-colors ${i % 2 ? "bg-slate-50/50" : "bg-white"} hover:bg-slate-100`}>
                    <td className="px-4 py-3">{codigo}</td>
                    <td className="px-4 py-3">{nombre}</td>
                    <td className="px-4 py-3">{fmtDate(fechaEntrada)}</td>
                    <td className="px-4 py-3">{horaEntrada}</td>
                    <td className="px-4 py-3">{fmtDate(fechaSalida)}</td>
                    <td className="px-4 py-3">{horaSalida}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 ring-1 ring-inset ring-indigo-200"
                          title="Ver documento"
                          onClick={() => handleViewDoc(r)}>
                          <FileText size={18} />
                        </button>
                        <button
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-emerald-600 bg-emerald-50 hover:bg-emerald-100 ring-1 ring-inset ring-emerald-200"
                          title="Aceptar"
                          onClick={() => openConfirm("accept", r)}>
                          <Check size={18} />
                        </button>
                        <button
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 ring-1 ring-inset ring-rose-200"
                          title="Rechazar"
                          onClick={() => openConfirm("reject", r)}>
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-200">
                      😕 {query ? "Sin resultados para tu búsqueda." : "Sin datos para mostrar."}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={dialog.open}
        onClose={closeConfirm}
        onConfirm={doConfirm}
        title={dialogText.title}
        description={dialogText.desc}
        confirmLabel={confirmLabel}
        cancelLabel="Cancelar"
        tone={tone}
      />
    </div>
  );
}
