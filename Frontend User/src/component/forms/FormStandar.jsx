import { useState } from "react";
import { getUsuarioByCode } from "../../services/usuarios";
import { saveSolicitudFromCode } from "../../services/solicitudesService";
import { uploadFileBySolicitudId } from "../../services/uploads";

function newRow() {
  return {
    _id: crypto.randomUUID(),
    codigo: "",
    nombre: "",
    entryDate: "",
    entryTime: "",
    exitDate: "",
    exitTime: "",
    file: null,
    _status: "idle", // idle | fetching | ok | err
    _errMsg: "",
  };
}

export default function FormStandarExcelLike() {
  const [rows, setRows] = useState([newRow()]);
  const [submitting, setSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const addRow = () => {
    const last = rows[rows.length - 1];

    if (
      !last.codigo?.toString().trim() ||
      !last.entryDate ||
      !last.entryTime ||
      !last.exitDate ||
      !last.exitTime
    ) {
      setErrMsg("Completa la última fila antes de agregar una nueva.");
      return;
    }

    setErrMsg("");
    setRows((rs) => [...rs, newRow()]);
  };

  const removeRow = (id) =>
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r._id !== id) : rs));

  const patchRow = (id, patch) =>
    setRows((rs) => rs.map((r) => (r._id === id ? { ...r, ...patch } : r)));

  const onCellChange = (id, key, value) => patchRow(id, { [key]: value });

  const onCodeKeyDown = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCodeLookup(id);
    }
  };

  const handleCodeLookup = async (id) => {
    const row = rows.find((r) => r._id === id);
    const codigo = (row?.codigo ?? "").toString().trim();
    if (!codigo) return;

    patchRow(id, { _status: "fetching", _errMsg: "" });
    const ctrl = new AbortController();
    try {
      const data = await getUsuarioByCode(codigo, ctrl.signal);
      const nombre = data?.nombreApellido ?? "";
      if (!nombre) {
        patchRow(id, { _status: "err", _errMsg: "Usuario sin nombre", nombre: "" });
      } else {
        patchRow(id, { _status: "ok", _errMsg: "", nombre });
      }
    } catch (e) {
      patchRow(id, { _status: "err", _errMsg: "Empleado no existe", nombre: "" });
    }
  };

  const validateAll = () => {
    for (const r of rows) {
     // if (!r.codigo?.toString().trim()) return "Falta el código en alguna fila.";
      if (!r.entryDate) return "Falta la fecha de entrada en alguna fila.";
      if (!r.entryTime) return "Falta la hora de entrada en alguna fila.";
      if (!r.exitDate) return "Falta la fecha de salida en alguna fila.";
      if (!r.exitTime) return "Falta la hora de salida en alguna fila.";
    }
    return "";
  };

  const onSubmitAll = async (e) => {
    e?.preventDefault?.();
    setOkMsg("");
    setErrMsg("");

    const v = validateAll();
    if (v) {
      setErrMsg(v);
      return;
    }

    setSubmitting(true);
    try {
      await Promise.all(
        rows.map(async (r) => {
          const payload = {
            code: Number(r.codigo),
            entryDate: r.entryDate, // YYYY-MM-DD
            entryTime: r.entryTime, // HH:MM
            exitDate: r.exitDate || null,
            exitTime: r.exitTime || null,
            documentUrl: null,
            documentType: null,
          };

          const ctrl = new AbortController();
          const sol = await saveSolicitudFromCode(payload, ctrl.signal);
          const solicitudId = sol?.id ?? sol?.data?.id ?? sol?.solicitudId ?? null;
          if (!solicitudId) throw new Error("No se pudo obtener el ID de la solicitud");

          if (r.file) {
            await uploadFileBySolicitudId(solicitudId, r.file, ctrl.signal);
          }
        })
      );

      setOkMsg(`Se guardaron ${rows.length} registro(s) correctamente.`);
      setRows([newRow()]);
    } catch (e) {
      setErrMsg(e?.message || "Ocurrió un error al guardar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 mr-3 ml-3">

      <form onSubmit={onSubmitAll} className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-700">Carga tipo Excel</h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addRow}
              className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
            >
              + Agregar fila
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Guardando..." : "Enviar todo"}
            </button>
          </div>
        </div>

        {errMsg && (
          <div className="mb-3 text-sm font-medium text-red-700 bg-red-50 px-3 py-2 rounded-md border border-red-100">
            {errMsg}
          </div>
        )}
        {okMsg && (
          <div className="mb-3 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-md border border-green-100">
            {okMsg}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-emerald-50 text-slate-700">
                <th className="w-10 border border-slate-200 font-semibold text-center">#</th>
                <th className="border border-slate-200 font-semibold">Código</th>
                <th className="border border-slate-200 font-semibold">Nombre y Apellido</th>
                <th className="border border-slate-200 font-semibold">Fecha Ent</th>
                <th className="border border-slate-200 font-semibold">Hora Ent</th>
                <th className="border border-slate-200 font-semibold">Fecha Sal</th>
                <th className="border border-slate-200 font-semibold">Hora Sal</th>
                <th className="border border-slate-200 font-semibold">Archivo</th>
                <th className="w-20 border border-slate-200 font-semibold text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, idx) => (
                <tr key={r._id} className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 text-center align-middle">{idx + 1}</td>

                  {/* Código */}
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={r.codigo}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, "");
                        onCellChange(r._id, "codigo", onlyNums);
                      }}
                      onKeyDown={(e) => onCodeKeyDown(e, r._id)}
                      onBlur={() => handleCodeLookup(r._id)}
                      placeholder="Ej.: 1001"
                      className="w-full h-9 rounded-md border border-blue-200 px-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />

                    {r._status === "fetching" && (
                      <div className="mt-0.5 text-[11px] text-slate-500">Buscando…</div>
                    )}
                    {r._status === "err" && (
                      <div className="mt-0.5 text-[11px] text-red-600">{r._errMsg}</div>
                    )}
                  </td>

                  {/* Nombre */}
                  <td className="border border-slate-200 p-1">
                    <input
                      type="text"
                      value={r.nombre}
                      disabled
                      placeholder="—"
                      className="w-full h-9 rounded-md border border-blue-200 px-2 bg-gray-50 text-gray-600"
                    />
                  </td>

                  {/* Fecha/Hora entrada */}
                  <td className="border border-slate-200 p-1">
                    <input
                      type="date"
                      value={r.entryDate}
                      onChange={(e) => onCellChange(r._id, "entryDate", e.target.value)}
                      className="w-full h-9 rounded-md border border-blue-200 px-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="time"
                      value={r.entryTime}
                      onChange={(e) => onCellChange(r._id, "entryTime", e.target.value)}
                      className="w-full h-9 rounded-md border border-blue-200 px-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />
                  </td>

                  {/* Fecha/Hora salida */}
                  <td className="border border-slate-200 p-1">
                    <input
                      type="date"
                      value={r.exitDate}
                      onChange={(e) => onCellChange(r._id, "exitDate", e.target.value)}
                      className="w-full h-9 rounded-md border border-blue-200 px-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />
                  </td>
                  <td className="border border-slate-200 p-1">
                    <input
                      type="time"
                      value={r.exitTime}
                      onChange={(e) => onCellChange(r._id, "exitTime", e.target.value)}
                      className="w-full h-9 rounded-md border border-blue-200 px-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                    />
                  </td>

                  {/* Archivo */}
                  <td className="border border-slate-200 p-1">
                    <input
                      type="file"
                      onChange={(e) =>
                        onCellChange(r._id, "file", e.target.files?.[0] ?? null)
                      }
                      accept="application/pdf,image/*"
                      className="block w-full text-xs file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                  </td>

                  {/* Acciones por fila */}
                  <td className="border border-slate-200 p-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(r._id)}
                      className="px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-100"
                      title="Eliminar fila"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Barra inferior de acciones */}
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={addRow}
            className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
          >
            + Agregar fila
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Guardando..." : "Enviar todo"}
          </button>
        </div>
      </form>
    </div>

  );
}
