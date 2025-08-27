import { useState, useMemo } from "react";
import { useApplications } from "../hooks/useApplications";
import ConfirmDialog from "./ConfirmDialog";
import Swal from "sweetalert2";
// import { handleViewDoc } from "../utils/alertDoc";
import { Search, FileText, Check, X } from "lucide-react";

const isImageUrl = (url) => /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url || "");
const isPdfUrl   = (url) => /\.pdf$/i.test(url || "");
const fmtDate    = (iso) => (iso ? new Date(iso).toLocaleDateString("es-DO") : "");

const norm = (v) =>
  (v ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export default function Table() {
  const { data, loading, error } = useApplications();

  // hooks dentro del componente
  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState({
    open: false,
    action: null, // accept | reject
    row: null,
  });

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return data || [];
    return (data || []).filter((r) => {
      const byCodigo = String(r.codigo).includes(query.trim());
      const byNombre = norm(r.nombreApellido).includes(q);
      return byCodigo || byNombre;
    });
  }, [data, query]);

  const handleViewDoc = (r) => {
    const url = r.urlDocumento;
    const type = (r.documentoTipo || "").toLowerCase();

    if (!url) {
      Swal.fire({
        icon: "info",
        title: `Documento de ${r.nombreApellido}`,
        text: "Este registro aún no tiene documento vinculado.",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    const isImg = type.startsWith("image/") || isImageUrl(url);
    const isPdf = type === "application/pdf" || isPdfUrl(url);

    const htmlImg = `
      <a href="${url}" target="_blank" rel="noopener">
        <img src="${url}" alt="Documento de ${r.nombreApellido}"
             style="max-width: 520px; width: 100%; border-radius: 12px; cursor: zoom-in; box-shadow: 0 6px 24px rgba(0,0,0,.15);" />
      </a>
      <p style="margin-top:10px; color:#475569;">Código: ${r.codigo}</p>
    `;

    const htmlPdf = `
      <div style="width:100%; max-width:900px;">
        <iframe src="${url}" style="width:100%; height:75vh; border:0; border-radius:8px; box-shadow: 0 6px 24px rgba(0,0,0,.15);" title="PDF"></iframe>
        <p style="margin-top:10px; color:#475569;">Código: ${r.codigo}</p>
      </div>
    `;

    const htmlFallback = `
      <p style="margin:0 0 6px;">No se puede previsualizar este tipo de archivo.</p>
      <a href="${url}" target="_blank" rel="noopener" style="text-decoration:underline;">Abrir en pestaña</a>
      <p style="margin-top:10px; color:#475569;">Código: ${r.codigo}</p>
    `;

    Swal.fire({
      title: `Documento de ${r.nombreApellido}`,
      html: isImg ? htmlImg : isPdf ? htmlPdf : htmlFallback,
      showCancelButton: true,
      confirmButtonText: "Abrir en pestaña",
      cancelButtonText: "Cerrar",
      reverseButtons: true,
      width: isPdf ? 900 : "auto",
    }).then((res) => {
      if (res.isConfirmed) window.open(url, "_blank", "noopener");
    });
  };

  const openConfirm = (action, row) => {
    setDialog({ open: true, action, row });
  };

  const doConfirm = async () => {
    const { action, row } = dialog;
    try {
      // await fetch(`/api/Applications/${row.codigo}/${action}`, { method: "POST" });
      console.log(`Acción '${action}' aplicada a código ${row.codigo}`);
      Swal.fire({
        icon: action === "accept" ? "success" : "info",
        title: action === "accept" ? "Solicitud aceptada" : "Solicitud rechazada",
        text: `${row.nombreApellido} (#${row.codigo})`,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al procesar la acción",
      });
    } finally {
      // cierra el diálogo pase lo que pase
      setDialog({ open: false, action: null, row: null });
    }
  };
  //si los doc estan cargando
  if (loading) return <div className="p-6">Cargando...</div>;
  //si no carga la tabla
  //if (error)   return <div className="p-6 text-red-600">Error: {error}</div>;

  // textos seguros cuando no hay acción seleccionada
  const dialogText =
    dialog.action === "accept"
      ? { title: "¿Aceptar solicitud?", desc: "Confirmas que esta solicitud será aprobada." }
      : dialog.action === "reject"
      ? { title: "¿Rechazar solicitud?", desc: "Esta acción es irreversible." }
      : { title: "", desc: "" };

  const tone         = dialog.action === "accept" ? "success" : "destructive";
  const confirmLabel = dialog.action === "accept" ? "Aceptar" : "Rechazar";

  return (
    <div className="overflow-x-auto p-6">
      {/* ✅ Barra de búsqueda dentro del return */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código o nombre..."
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700"
          >
            Limpiar
          </button>
        )}
      </div>

      <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden shadow bg-white">
        <thead className="bg-blue-400 text-white">
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
        <tbody className="divide-y divide-slate-200">
          {filtered.map((r) => (
            <tr key={r.codigo} className="hover:bg-slate-50">
              <td className="px-4 py-3">{r.codigo}</td>
              <td className="px-4 py-3">{r.nombreApellido}</td>
              <td className="px-4 py-3">{fmtDate(r.fechaEntrada)}</td>
              <td className="px-4 py-3">{r.horaEntrada}</td>
              <td className="px-4 py-3">{fmtDate(r.fechaSalida)}</td>
              <td className="px-4 py-3">{r.horaSalida}</td>

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

          {/* ✅ usa filtered.length para el estado vacío */}
          {filtered.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-slate-500" colSpan={7}>
                {query ? "Sin resultados para tu búsqueda." : "Sin datos para mostrar."}
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
