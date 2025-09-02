import { Link } from "react-router-dom";
import { ClipboardList, FilePlus, ListChecks, BarChart3 } from "lucide-react";

const CARDS = [
  {
    to: "/FormStandar",
    title: "Formulario 1",
    desc: "Registrar asistencia estándar.",
    icon: ClipboardList,
  },
  {
    to: "/formulario2",
    title: "Formulario 2",
    desc: "Registro por código y horario.",
    icon: FilePlus,
  },
  {
    to: "/solicitudes",
    title: "Solicitudes",
    desc: "Ver, aceptar o rechazar solicitudes.",
    icon: ListChecks,
  },
  {
    to: "/reportes",
    title: "Reportes",
    desc: "Genera reportes y exporta datos.",
    icon: BarChart3,
  },
];

function Card({ to, title, desc, Icon }) {
  return (
    <div className="group rounded-2xl bg-white shadow-md ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-900/90 text-white p-2.5 transition-transform group-hover:scale-105">
            <Icon size={22} aria-hidden="true" />
          </div>
          <h3 className="text-slate-900 font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-slate-600 text-sm mt-2">{desc}</p>

        <div className="mt-4">
          <Link
            to={to}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            aria-label={`Ir a ${title}`}>
            Ir
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900">Portal de Asistencia</h1>
        <p className="text-slate-600 mt-1">Elige una opción para continuar.</p>

        {/* Grid responsivo */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CARDS.map(({ to, title, desc, icon: Icon }) => (
            <Card key={title} to={to} title={title} desc={desc} Icon={Icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
