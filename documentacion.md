
**Iniciar con el Proyecto:
```javascript 

npm create vite@latest

framework: React

Variant: Typescript + SWC 

cd pruebatecnica

npm install 

npm run dev

```

Dependencias Adicionales Instaladas:

```javascript
npm install tailwindcss tailwindcss/vite axios prettier prettier-plugin-tailwindcss react-router-dom
```

**Función Principal:**

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";

import Home from "./Home";

import Todo from "./Todo";

import Login from "./Login";

  

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Layout />}>

<Route index element={<Home />} />

<Route path="login" element={<Login />} />

<Route path="todo" element={<Todo />} />

</Route>

</Routes>

</BrowserRouter>

);

}

  

export default App;
```

Aquí se hace todo el setup principal incluyendo rutas y layouts.

**Layout Principal:**

```javascript 
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
```

Este es el layout principal que consta de las páginas principales y el footer que está en todas las páginas.

**Página Home:**

```javascript 
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

fill="currentColor "

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
```

Página inicial que va ver el usuario, sirve para darle una buena introducción a la aplicación para el usuario usuario, tiene el componente carrousel el cual exploraremos más adelante.

**Componente Login:** 

```javascript 
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
```

 Página que se encarga de hacer el login y almacenar el token en el localstorage para su posterior uso.

Página Todo:

```javascript 
import { JSX, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Notification from "../components/Notification";

  

interface Task {

id: number;

title: string;

description: string | null;

is_completed: boolean;

created_at: string;

}

  

function Todo(): JSX.Element {

const navigate = useNavigate();

const item: string | null = localStorage.getItem("token");

let token: string = "";

let newTask: { title: string; description: string } = {

title: "",

description: "",

};

const [tasks, setTasks] = useState<Task[]>([]);

const [page, setPage] = useState<number>(1);

const [loading, setLoading] = useState<boolean>(true);

const [showDescription, setShowDescription] = useState<boolean[]>([]);

const [addTask, setAddTask] = useState<boolean>(false);

  

const [show, setShow] = useState<boolean>(false);

const [description, setDescription] = useState<string>("");

const [title, setTitle] = useState<string>("");

  

if (item === null) {

navigate("/login");

} else {

token = item;

}

  

const getTasks = async () => {

setShow(true);

setTitle("Cargando Tareas");

setDescription("Espere un momento por favor...");

axios

.get(

`https://gsi-interviews.camiapp.net/to-do/tasks?limit=5&order=-created_at&page=${page}`,

{

headers: {

Authorization: `Bearer ${token}`,

},

},

)

.then((response) => {

console.log(response.data.data);

setTasks(response.data.data);

tasks.forEach(() => {

setShowDescription((prev) => [...prev, false]);

});

setLoading(false);

setTitle("Tareas Cargadas");

setDescription("Las tareas han sido cargadas correctamente");

})

.catch((error) => {

console.log("Error getting tasks " + error);

});

};

  

useEffect(() => {

getTasks();

}, [token, page]);

  

async function deleteTask(id: number) {

setShow(true);

setTitle("Eliminando Tarea");

setDescription("Espere un momento por favor...");

axios

.delete(`https://gsi-interviews.camiapp.net/to-do/tasks/delete/${id}`, {

headers: {

Authorization: `Bearer ${token}`,

},

})

.then((response) => {

console.log(response.data.data);

setTitle("Tarea Eliminada");

setDescription("La tarea ha sido eliminada");

getTasks();

})

.catch((error) => {

console.log("Error deleting task " + error);

});

}

  

async function updateCheck(id: number) {

axios

.patch(

`https://gsi-interviews.camiapp.net/to-do/tasks/update/${id}`,

null,

{

headers: {

Authorization: `Bearer ${token}`,

},

},

)

.then((response) => {

console.log(response.data.data);

})

.catch((error) => {

console.log("Error deleting task " + error);

});

}

  

async function createTask(taskTitle: string, taskDescription: string) {

const emailAddress = localStorage.getItem("email");

console.log(emailAddress + " " + taskTitle + " " + taskDescription);

axios

.post(

`https://gsi-interviews.camiapp.net/to-do/tasks/create`,

{

user_email: emailAddress,

title: taskTitle,

description: taskDescription,

},

{

headers: {

Authorization: `Bearer ${token}`,

},

},

)

.then((response) => {

console.log(response.data.data);

getTasks();

})

.catch((error) => {

console.log("Error deleting task " + error);

});

}

  

function showTasks(element: Task, index: number): JSX.Element {

return (

<div

className="bg-background-secondary rounded-lg px-6 py-4"

key={element.id}

>

<Notification

visible={show}

title={title}

description={description}

setVisible={setShow}

/>

<button

className="border-primary mb-1 flex w-full justify-between border-b-1 transition-transform hover:scale-102"

onClick={() => {

let temp = [...showDescription];

temp[index] = !temp[index];

setShowDescription(temp);

}}

>

<div className="flex w-full items-center">

<input

className="me-2 scale-150"

type="checkbox"

defaultChecked={element.is_completed}

onClick={(e) => e.stopPropagation()}

onChange={(event) => {

let tempTasks = tasks;

tempTasks[index].is_completed = event.target.checked;

setTasks(tempTasks);

updateCheck(element.id);

}}

/>

<div className="mx-auto mb-4 justify-center text-center text-xl font-bold">

{element.title}

</div>

  

<div>

{!showDescription[index] ? (

<svg

className="text-primary scale-180"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="m280-400 200-200 200 200H280Z" />

</svg>

) : (

<svg

className="text-primary scale-180"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="M480-360 280-560h400L480-360Z" />

</svg>

)}

</div>

</div>

</button>

{showDescription[index] && (

<>

<div className="text-secondary mb-4 w-full flex-col">

{element.description}

</div>

<button

className="button bg-danger hover:bg-h-danger mx-auto"

onClick={() => deleteTask(element.id)}

>

<svg

className="me-2"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />

</svg>

Eliminar Tarea

</button>

</>

)}

</div>

);

}

  

return (

<div className="my-10">

<Notification

title="Tarea Eliminada"

description="La tarea ha sido eliminada"

setVisible={setShow}

visible={show}

/>

  

{loading && (

<div className="flex h-full flex-col items-center justify-center">

<div className="spinner"></div>

<div className="text-accent">Loading Tasks ...</div>

</div>

)}

<div className="mb-6 flex w-full">

<button className="button" onClick={() => setAddTask(!addTask)}>

<svg

className="me-2"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />

</svg>

Añadir Tarea

</button>

<button className="button ms-auto" onClick={() => setPage(page - 1)}>

<svg

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />

</svg>

</button>

  

<div className="bg-primary text-light mx-2 rounded-lg px-4 py-2 font-bold">

{page}

</div>

<button className="button" onClick={() => setPage(page + 1)}>

<svg

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />

</svg>

</button>

</div>

{addTask && (

<div className="card mx-auto mb-6 lg:max-w-[500px]">

<div className="mb-8 text-3xl font-bold">Nueva Tarea</div>

<div className="text-primary mb-1 text-xl font-bold">Título</div>

<input

type="text"

className="input mb-6"

onChange={(e) => {

newTask.title = e.target.value;

}}

/>

<div className="text-primary mb-1 text-xl font-bold">Descripción</div>

<textarea

className="input mb-6"

onChange={(e) => {

newTask.description = e.target.value;

}}

/>

<button

className="button mx-auto"

onClick={() => createTask(newTask.title, newTask.description)}

>

<svg

className="me-2"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="#e8eaed"

>

<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />

</svg>

Crear Tarea

</button>

</div>

)}

<div className="responsive-grid">{!loading && tasks.map(showTasks)}</div>

</div>

);

}

  

export default Todo;
```

Página que se encarga de la gestión de tareas, incluye  todas las operaciones básicas del CRUD.

Función Mostrar Tareas: 
```javascript 
function showTasks(element: Task, index: number): JSX.Element {

return (

<div

className="bg-background-secondary rounded-lg px-6 py-4"

key={element.id}

>

<Notification

visible={show}

title={title}

description={description}

setVisible={setShow}

/>

<button

className="border-primary mb-1 flex w-full justify-between border-b-1 transition-transform hover:scale-102"

onClick={() => {

let temp = [...showDescription];

temp[index] = !temp[index];

setShowDescription(temp);

}}

>

<div className="flex w-full items-center">

<input

className="me-2 scale-150"

type="checkbox"

defaultChecked={element.is_completed}

onClick={(e) => e.stopPropagation()}

onChange={(event) => {

let tempTasks = tasks;

tempTasks[index].is_completed = event.target.checked;

setTasks(tempTasks);

updateCheck(element.id);

}}

/>

<div className="mx-auto mb-4 justify-center text-center text-xl font-bold">

{element.title}

</div>

  

<div>

{!showDescription[index] ? (

<svg

className="text-primary scale-180"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="m280-400 200-200 200 200H280Z" />

</svg>

) : (

<svg

className="text-primary scale-180"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="M480-360 280-560h400L480-360Z" />

</svg>

)}

</div>

</div>

</button>

{showDescription[index] && (

<>

<div className="text-secondary mb-4 w-full flex-col">

{element.description}

</div>

<button

className="button bg-danger hover:bg-h-danger mx-auto"

onClick={() => deleteTask(element.id)}

>

<svg

className="me-2"

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />

</svg>

Eliminar Tarea

</button>

</>

)}

</div>

);

}
```

Función dentro de la página de todo que es encarga especificamente de mostrar cada tarea y de todas las operaciones que se hacen en cada tarea (externo sería: paginación, notificaciones, agregar nueva tarea, etc.).

**Componente Notificaciones:** 

```javascript 
import { JSX, useEffect } from "react";

  

interface NotificationProps {

title: string;

description: string;

visible: boolean;

setVisible: (visible: boolean) => void;

}

  

const Notification = ({

title,

description,

visible,

setVisible,

}: NotificationProps): JSX.Element => {

useEffect(() => {

const timer = setTimeout(() => {

setVisible(false);

}, 5000);

return () => clearTimeout(timer);

}, [visible]);

  

return (

<>

{visible && (

<div className="bg-background-secondary fixed bottom-30 left-1/2 w-80 -translate-x-1/2 transform rounded-md p-4 shadow-lg">

<div className="flex items-start justify-between">

<div>

<h3 className="text-primary mb-4 border-b-2 text-lg font-semibold">

{title}

</h3>

<p className="text-primary text-sm">{description}</p>

</div>

<button

onClick={() => setVisible(false)}

className="text-primary hover:text-accent ml-4"

>

<svg

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="currentColor"

>

<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />

</svg>

</button>

</div>

</div>

)}

</>

);

};

  

export default Notification;
```

Componente que se encarga de hacer cualquier tipo de alerta, se usó para enviar mensajes de feedback al usuario de las acciones que requieran api's.

**Componente Spinner:** 

```javascript 
const Spinner = () => (

<div className="flex h-full items-center justify-center">

<div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

</div>

);

export default Spinner;
```

Componente que se usa para la carga de las tareas.

**Componente Carrousel:**

```javascript 
import { JSX, useState } from "react";

  

interface Props {

images: string[];

captions: string[];

}

  

const Carousel = ({ images, captions }: Props): JSX.Element => {

const [currentIndex, setCurrentIndex] = useState(0);

  

const nextSlide = () => {

setCurrentIndex((prevIndex) =>

prevIndex === images.length - 1 ? 0 : prevIndex + 1,

);

};

  

const prevSlide = () => {

setCurrentIndex((prevIndex) =>

prevIndex === 0 ? images.length - 1 : prevIndex - 1,

);

};

  

return (

<div className="relative w-full overflow-hidden">

<div

className="flex transition-transform duration-500"

style={{ transform: `translateX(-${currentIndex * 100}%)` }}

>

{images.map((src, index) => (

<div key={index} className="relative w-full flex-shrink-0">

<div className="absolute inset-0 mx-2 flex items-center justify-center">

<span className="bg-primary/80 bg-opacity-50 rounded p-2 text-center text-3xl font-bold text-white">

{captions[index]}

</span>

</div>

<img

className="aspect-square w-full rounded-3xl object-cover md:aspect-16/9 md:max-h-[250px] lg:max-h-[300px] xl:max-h-[400px] 2xl:max-h-[500px]"

src={src}

alt={`Slide ${index}`}

/>

</div>

))}

</div>

<button

onClick={prevSlide}

className="button absolute top-1/2 left-4 -translate-y-1/2 transform px-2"

>

<svg

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="#e8eaed"

>

<path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />

</svg>

</button>

<button

onClick={nextSlide}

className="button absolute top-1/2 right-4 -translate-y-1/2 transform px-2"

>

<svg

xmlns="http://www.w3.org/2000/svg"

height="24px"

viewBox="0 -960 960 960"

width="24px"

fill="#e8eaed"

>

<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />

</svg>

</button>

<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">

{images.map((_, index) => (

<button

key={index}

onClick={() => setCurrentIndex(index)}

className={`h-3 w-3 rounded-full ${

currentIndex === index ? "bg-white" : "bg-gray-400"

}`}

/>

))}

</div>

</div>

);

};

  

export default Carousel;
```

Este componente es un componente clásico de carrousel con imágenes y texto pasado como propiedades.