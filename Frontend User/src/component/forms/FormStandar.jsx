export default function FormStandar() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Formulario 1</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Código + Buscar */}
        <div className="flex gap-2 col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Código"
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
          />
          <button
            type="button"
            className="px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Buscar
          </button>
          <input
            type="text"
            placeholder="Nombre y Apellido"
            className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
          />
        </div>

        {/* Fechas y horas */}
        <input
          type="date"
          placeholder="Fecha entrada"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />
        <input
          type="time"
          placeholder="Hora entrada"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />

        <input
          type="date"
          placeholder="Fecha salida"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />
        <input
          type="time"
          placeholder="Hora salida"
          className="rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />

        {/* Documento */}
        <input
          type="file"
          className="col-span-1 md:col-span-2 rounded-md border-slate-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900/20"
        />

        {/* Botón enviar */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
