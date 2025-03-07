import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let email = "";
  const navigate = useNavigate();
  const getToken = async () => {
    let authToken = "";
    axios
      .post("https://gsi-interviews.camiapp.net/to-do/login", {
        email: `${email}`,
      })
      .then((response) => {
        authToken = response.data.data.token;
        localStorage.setItem("token", authToken);
        navigate("/todo");
        storeMail();
      })
      .catch((error) => {
        console.log("Error getting token " + error);
        authToken = "";
      });
  };

  function storeMail() {
    localStorage.setItem("email", `${email}`);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="lg:flex">
        <div className="card my-auto align-middle max-lg:mb-10 lg:me-8">
          <div className="mt-2 mb-8 flex justify-center text-center text-2xl font-bold">
            Hola, Por favor ingresa tu correo
          </div>
          <input
            className="input mb-6"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              email = (event.target as HTMLInputElement).value;
            }}
            type="email"
            placeholder="test@gmail.com"
          />
          <button className="button mx-auto" onClick={() => getToken()}>
            Submmit
          </button>
        </div>
        <div className="relative rounded-3xl bg-black lg:max-w-[500px] xl:max-w-[700px]">
          <video className="rounded-3xl opacity-60" autoPlay loop muted>
            <source src="https://videos.pexels.com/video-files/3140468/3140468-uhd_2560_1440_25fps.mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              Aumenta tu productividad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
