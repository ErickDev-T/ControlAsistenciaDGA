import Logo from "../assets/dgaLogo.svg";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-full h-[75px] bg-slate-900">

      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-3 items-center gap-4">
        {/* Col 1: Logo + texto */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="DGA Logo" className="h-10 w-auto"/>
          <div className="leading-tight text-white">
            <p className="text-xs font-light">Plataforma de</p>
            <p className="text-sm font-semibold">REGISTRO</p>
            <p className="text-sm font-semibold -mt-1">ASISTENCIA</p>
          </div>
        </div>

        {/* Col 2: Nav (centrado, solo desde md) */}
        <nav className="hidden md:flex justify-center gap-8 text-white font-medium">
          <a href="/" className="hover:underline underline-offset-4">INICIO</a>
          <a href="/" className="hover:underline underline-offset-4">GUÍA DE USO</a>
          <a href="#" className="hover:underline underline-offset-4">AYUDA</a>
        </nav>

        {/* Col 3: 3 bolas con iconos (al final) */}
        <div className="flex justify-end items-center gap-2">
          <button
            type="button"
            title="Notificaciones"
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg transition" >
            🔔
            <span className="sr-only">Notificaciones</span>
          </button>
          <button
            type="button"
            title="Ayuda"
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg transition">
            ❓
            <span className="sr-only">Ayuda</span>
          </button>
          <button
            type="button"
            title="Perfil"
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg transition">
            👤
          </button>
        </div>
      </div>




    </header>
  );
}
