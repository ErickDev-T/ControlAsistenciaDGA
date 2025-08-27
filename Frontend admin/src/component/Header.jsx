// src/component/Header.jsx
export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + nombre */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-white font-semibold text-lg">Mi Sitio</span>
        </div>

        {/* Links (pegados a la izquierda en pantallas grandes) */}
        <nav className="hidden md:flex items-center gap-6 ml-10">
          <a href="#inicio" className="text-white hover:text-slate-100 transition">Inicio</a>
          <a href="#servicios" className="text-white hover:text-slate-100 transition">Servicios</a>
          <a href="#contacto" className="text-white hover:text-slate-100 transition">Contacto</a>
        </nav>

        {/* Botón */}
        <a
          href="#"
          className="hidden sm:inline-block bg-white text-emerald-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-100 transition"
        >
          Empezar
        </a>
      </div>
    </header>
  );
}
