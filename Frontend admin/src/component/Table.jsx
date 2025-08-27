// src/components/Table.jsx
import { useState } from "react";
import { useApplications } from "../hooks/useApplications";
import { FileText, Check, X } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("es-DO") : "");

export default function Table() {
  const { data, loading, error } = useApplications();

  // Estado del diálogo
  const [dialog, setDialog] = useState({
    open: false,
    action: null, // "accept" | "reject"
    row: null,
  });

  // Abrir documento (aquí pones tu lógica real)
  const handleViewDoc = (r) => {
    // Ejemplo: window.open(r.urlDocumento, "_blank");
    alert(`Abrir documento de ${r.nombreApellido} (código ${r.codigo})`);
  };

  // Abrir confirm dialog para aceptar o rechazar
  const openConfirm = (action, row) => {
    setDialog({ open: true, action, row });
  };

  // Llamar API al confirmar (simulado)
  const doConfirm = async () => {
    const { action, row } = dialog;
    try {
      // Ejemplo:
      // await fetch(`/api/Applications/${row.codigo}/${action}`, { method: "POST" });
      console.log(`Acción '${action}' aplicada a código ${row.codigo}`);
      // Muestra feedback rápido
      alert(
        `${action === "accept" ? "Aceptado" : "Rechazado"}: ${row.nombreApellido} (#${row.codigo})`
      );
    } catch (err) {
      alert("Ocurrió un error al procesar la acción");
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  const dialogText =
    dialog.action === "accept"
      ? { title: "¿Aceptar solicitud?", desc: "Confirmas que esta solicitud será aprobada." }
      : { title: "¿Rechazar solicitud?", desc: "Esta acción es irreversible." };

  const tone = dialog.action === "accept" ? "success" : "destructive";
  const confirmLabel = dialog.action === "accept" ? "Aceptar" : "Rechazar";

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden shadow bg-white">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Hora Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Hora Salida</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Salida</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((r) => (
            <tr key={r.codigo} className="hover:bg-slate-50">
              <td className="px-4 py-3">{r.codigo}</td>
              <td className="px-4 py-3">{r.nombreApellido}</td>
              <td className="px-4 py-3">{r.horaEntrada}</td>
              <td className="px-4 py-3">{fmtDate(r.fechaEntrada)}</td>
              <td className="px-4 py-3">{r.horaSalida}</td>
              <td className="px-4 py-3">{fmtDate(r.fechaSalida)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    className="text-indigo-500 hover:text-indigo-700"
                    title="Ver documento"
                    onClick={() => handleViewDoc(r)}
                  >
                    <FileText size={20} />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-700"
                    title="Aceptar"
                    onClick={() => openConfirm("accept", r)}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    title="Rechazar"
                    onClick={() => openConfirm("reject", r)}
                  >
                    <X size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-slate-500" colSpan={7}>
                Sin datos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={dialog.open}
        onClose={() => setDialog((d) => ({ ...d, open: false }))}
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
