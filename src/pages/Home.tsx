import { JSX } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Carrousel from "../components/Carrousel";

function Home(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="bg-background flex h-full w-full items-center py-6 max-md:flex-col">
      <div className="md:ms-8 lg:flex-col">
        <div className="mb-10 flex justify-center px-4 text-center text-3xl leading-relaxed font-bold">
          ToDo App, TU tienes el control de TU vida
        </div>
        <div className="text-secondary mx-2 mb-8 text-justify md:me-10 md:max-w-[700px]">
          Una aplicación de tareas simple, que te ayuda a organizar tu vida, sin
          distracciones, ni complicaciones, ni características innecesarias.
          Solo una aplicación simple de todo que te ayuda a organizar tu vida,
          ayudate a ser más productivo.
        </div>
        <button
          className="button mx-auto mb-10"
          onClick={() => navigate("/login")}
        >
          <svg
            className="me-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor  "
          >
            <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" />
          </svg>
          Comienza Aquí
        </button>
      </div>
      <Carrousel
        images={[
          "https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg",
          "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "https://images.pexels.com/photos/777155/pexels-photo-777155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ]}
        captions={["Sé Libre", "Sé Productivo", "Sé Feliz"]}
      />
    </div>
  );
}

export default Home;
