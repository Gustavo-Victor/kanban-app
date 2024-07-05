import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HiMoon, HiSun } from "react-icons/hi"
import TaskForm from "./components/TaskForm";
import TaskSection from "./components/TaskSection";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));

  const toggleTheme = () => {

    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", JSON.stringify("light"));
      document.documentElement.classList.remove("dark");
    }
  }

  // useEffect(() => {
  //   if (tasks && tasks.length > 0) {
  //     console.log(tasks);
  //   }
  // }, [tasks]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks"));

    if (data) {
      setTasks([...data]);
    }

    if (!theme) {
      localStorage.setItem("theme", JSON.stringify("light"));
      setTheme("light");
      window.document.documentElement.classList.remove("dark");
    } else {
      if (theme == "dark") {
        window.document.documentElement.classList.add("dark");
      } else {
        window.document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-center" reverseOrder={false} />
      <div id="app" className="relative bg-slate-100 dark:bg-slate-950 w-screen h-auto min-h-screen flex flex-col items-center p-3 pb-4 gap-8 overflow-auto">
        <h1 className="text-2xl mt-16 sm:mt-3 text-slate-950 font-bold dark:text-slate-200">Kanban App</h1>
        <button onClick={toggleTheme} className="absolute sm:top-5 sm:right-5 bg-slate-200 flex items-center justify-center hover:bg-slate-300 text-slate-500 p-3 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200">
          {theme == "dark" ? (
            <HiSun />
          ) : (
            <HiMoon />
          )}
        </button>
        <TaskForm
          btnText={"Create"}
          setTasks={setTasks} />

        <TaskSection
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </DndProvider>
  )
}
