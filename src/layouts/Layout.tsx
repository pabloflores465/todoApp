import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="grid px-4 bg-background min-h-[100dvh] w-full grid-rows-[1fr_auto]">
      <Outlet />
      <footer className="text-primary border-t-2 border-primary py-4 px-6 min-h-[100px]">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-sm">
            &copy; {new Date().getFullYear()} To Do App. Todos los derechos
            reservados.
          </div>
          <div className="flex space-x-4">
            <a href="/privacy" className="hover:text-accent transition-colors">
              Política de Privacidad
            </a>
            <a href="/terms" className="hover:text-accent transition-colors">
              Términos de Servicio
            </a>
            <a href="/contact" className="hover:text-accent transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
