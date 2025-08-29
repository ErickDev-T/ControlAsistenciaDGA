import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import logo from "../assets/dgaLogo.svg";
import { X as XIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="DGA" className="h-12 w-auto select-none" />
          <div className="flex flex-col leading-tight">
            <span className="text-[25px] text-white font-semibold">Portal Asistencia</span>
            <p className="text-[12px] text-white font-semibold">Dirección general de aduanas</p>
          </div>
        </div>


        {/* Enlaces */}
        <div>
          <h4 className="text-white font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
            <li><a href="#solicitudes" className="hover:text-white">Solicitudes</a></li>
            <li><a href="#reportes" className="hover:text-white">Reportes</a></li>
            <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contáctanos</h4>
          <p className="text-sm">info@aduanas.gob.do</p>
          <p className="text-sm mb-3">Tel: (809) 123-4567</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/aduanard" className="hover:text-white"><Facebook size={18} /></a>
            <a href="https://x.com/aduanard" className="hover:text-white"><XIcon size={18} /></a>
            <a href="https://www.linkedin.com/company/dga-rd/" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="mailto:info@aduanas.gob.do" className="hover:text-white"><Mail size={18} /></a>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DGA · Todos los derechos reservados.
      </div>
    </footer>
  );
}
