import logo from '../assets/dgaLogo.svg';


// src/component/Header.jsx
export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo + nombre */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-25 rounded-lg ">
            <h1 className="text-4xl font-bold">
              <img src={logo}/>
            </h1>

          </div>
          <span className="text-white font-semibold text-lg">Portal Asistencia</span>
        </div>

        {/* Links (pegados a la izquierda en pantallas grandes) */}
        <nav className="hidden md:flex items-center gap-6 ml-10">
          <a href="#inicio" className="text-white hover:text-slate-100 transition">algo</a>
          <a href="#inicio" className="text-white hover:text-slate-100 transition">para </a>
          <a href="#inicio" className="text-white hover:text-slate-100 transition">el nav </a>


        </nav>

        {/* Botón */}
        <a
          href="#"
          className="hidden sm:inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-100 transition"
        >
          Refrescar
        </a>
      </div>
    </header>
  );
}
