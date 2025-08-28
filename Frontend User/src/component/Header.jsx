  // src/component/Header.jsx
  export default function Header() {
    return (
      <header className="w-full bg-gradient-to-r from-slate-900 to-slate-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo + nombre  */}
          <div>
            {/* <div className="text-xs text-white">Plataforma de</div> */}
            <div className="text-lg font-bold text-white">
              REGISTRO ASISTENCIA
            </div>
          </div>

          {/* Links (pegados a la izquierda en pantallas grandes) */}
          <nav className="space-x-8 text-white font-medium text-center hidden sm:flex">
            <a href="#">INICIO</a>
            <a href="#">GUIA DE USO</a>
            <a href="#">AYUDA</a>
          </nav>
       

          {/* Botón */}
          <a
            href="#"
            className="hidden sm:inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-slate-100 transition"
          >
            Empezar
          </a>
        </div>
      </header>
      
    );
  }
