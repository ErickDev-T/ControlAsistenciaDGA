import { useApplications } from "../hooks/useApplications";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("es-DO") : "");

export default function Table() {
  const { data, loading, error } = useApplications();

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error)   return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden shadow bg-white">
        <thead className="bg-emerald-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Hora Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Entrada</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Hora Salida</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Fecha Salida</th>
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
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-slate-500" colSpan={6}>
                Sin datos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
