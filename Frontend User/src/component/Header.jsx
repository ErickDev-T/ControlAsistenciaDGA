import Logo from "../assets/dgaLogo.svg";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-full h-[50vh] bg-gradient-to-tr from-blue-900 via-blue-500 to-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="items-center">
          <div className="grid absolute grid-cols-2 top-3 left-3">
            <img src={Logo} alt="DGA Logo" className="max-h-21 w-auto" />
            <div className="text-lg text-white">
              <p className="font-thin">Plataforma de</p>
              <p className="font-bold">REGISTRO</p>
              <p className="font-bold">ASISTENCIA</p>
            </div>
          </div>
        </div>

        <nav className="absolute top-5 right-10 text-2xl space-x-8 text-white font-medium hidden sm:flex">
          <a href="/">INICIO</a>
          <a href="/">GUÍA DE USO</a>
          <a href="#">AYUDA</a>
        </nav>
      </div>

      <div className="mt-25 h-25 max-w-200 bg-[#155594] flex justify-center items-center shadow-2xl">
        <p className="text-4xl font-semibold text-white">
          Bienvenido al portal de asistencia
        </p>
      </div>

      <div className="text-white flex justify-center">
        <div className="font-bold mt-10 text-4xl max-w-5xl grid  gap-6 text-center md:text-center">
          <p>En este portal encontrara todos los formularios necesarios de asistencia</p>
        </div>
      </div>
    </header>
  );
}
