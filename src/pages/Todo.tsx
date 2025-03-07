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
