export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 to-slate-900 shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} Registro Asistencia. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}