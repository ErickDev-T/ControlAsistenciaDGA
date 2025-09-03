// src/component/Header.jsx
import { Calendar, X as XIcon } from "lucide-react";
import logo from "../assets/dgaLogo.svg";

export default function Header({ onDateChange, selectedDate = "", pendingCount }) {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 to-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* logo + nombre */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="DGA" className="h-12 w-auto select-none" />
          <div className="flex flex-col leading-tight">
            <span className="text-[25px] text-white font-semibold">Portal Asistencia</span>
            <p className="text-[12px] text-white font-semibold">Dirección general de aduanas</p>
          </div>
        </div>


        {/* links centro/izquierda */}


        <div className="flex items-center gap-3">

          {typeof pendingCount === "number" && (
            <span className="hidden sm:inline-block text-sm px-2.5 py-1 rounded-md bg-blue-600/20 text-blue-200 border border-blue-400/30">
              Pendientes totales: {pendingCount}
            </span>
          )}

          <p className="hidden sm:inline-block text-sm px-2.5 py-1 rounded-md bg-blue-600/20 text-blue-200 border border-blue-400/30">
            Filtro Entrada
          </p>



          {/* filtro por fecha */}
          <label className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md text-sm text-white/90 border border-white/10">
            <Calendar size={16} aria-hidden="true" />
            <input
              type="date"
              name="fecha-filtro"
              title="Filtrar por fecha"
              className="bg-transparent outline-none text-white placeholder-white/60 [color-scheme:dark]"
              value={selectedDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => onDateChange?.(e.target.value)}
              aria-label="Filtrar por fecha."
            />
            {selectedDate && (
              <button
                type="button"
                className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded hover:bg-white/20 text-white/80"
                onClick={() => onDateChange?.("")}
                title="Limpiar filtro"
                aria-label="Limpiar filtro de fecha"
              >
                <XIcon size={14} />
              </button>
            )}
          </label>
        </div>
      </div>
    </header>
  );
}
