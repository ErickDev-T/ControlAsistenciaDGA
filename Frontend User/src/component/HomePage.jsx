import { Link } from "react-router-dom";
import { ClipboardList, FilePlus, ListChecks, BarChart3 } from "lucide-react";

/** Data de tarjetas */
const CARDS = [
  {
    to: "/FormStandar",
    title: "De un día para otro",
    desc: "Registrar asistencia estándar.",
    icon: ClipboardList,
  },
  {
    to: "/FormSameDay",
    title: "Mismo día",
    desc: "Registro por código y horario.",
    icon: FilePlus,
  },
  {
    to: "/solicitudes",
    title: "Solicitudes",
    desc: "Ver, aceptar o rechazar .",
    icon: ListChecks,
  },


];

/** card con theme azul */
function Card({ to, title, desc, Icon }) {
  return (
    <div
      className={[
        "group relative rounded-2xl overflow-hidden",
        "bg-white",
        "border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300",
        "hover:-translate-y-0.5 will-change-transform",
      ].join(" ")}
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-16 -right-20 h-40 w-40 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-transparent blur-2xl" />
        <div className="absolute -bottom-16 -left-20 h-40 w-40 bg-gradient-to-br from-blue-300/20 via-indigo-200/10 to-transparent blur-2xl" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="h-20 flex items-start gap-4">
          <div
            className={[
              "shrink-0 rounded-xl p-3",
              "bg-blue-600 text-white",
              "shadow-md transition-transform duration-300",
              "group-hover:scale-105",
            ].join(" ")}>

            {Icon ? <Icon size={22} className="sm:size-6" aria-hidden="true" /> : null}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-blue-900 font-semibold text-[20px] truncate">
              {title}
            </h3>
            {desc ? (
              <p className="tmt-1 text-slate-600 text-[15px] leading-relaxed">
                {desc}
              </p>
            ) : null}
          </div>
        </div>

        {/* accion */}
        <div className="mt-5">
          <Link
            to={to}
            className={[
              "inline-flex items-center gap-2 rounded-lg",
              "px-4 py-2 text-sm font-medium",
              "bg-blue-900 text-white hover:bg-blue-800",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-900",
              "transition-all",
            ].join(" ")}
            aria-label={`Ir a ${title}`}>
            Ir
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-slate-900">
      <div className="min-h-[calc(75vh)] bg-gradient-to-b from-blue-50 via-white to-blue-50 mr-3 ml-3 rounded-t-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-10 text-center mt-20">

              <h1 className="mt-4 text-4xl sm:text-7xl font-light text-black">
                Gestión de asistencia sin
              </h1>
              <h1 className="mt-4 text-4xl sm:text-7xl font-light text-black">
                complicaciones
              </h1>
              <p className="text-black font-[poppins] mt-10 text-3xl sm:text-2xl">
                Todos los formularios de asistencia, en un solo lugar.
              </p>
            </header>

            {/* grid responsivo */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {CARDS.map(({ to, title, desc, icon: Icon }) => (
                  <Card key={title} to={to} title={title} desc={desc} Icon={Icon} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
