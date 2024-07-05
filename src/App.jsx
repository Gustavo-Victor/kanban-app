import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
      <div id="app" className="relative bg-slate-100 dark:bg-slate-950 w-screen mx-auto min-h-screen flex flex-col items-center p-3 pb-4 gap-14">
        <h1 className="text-2xl mt-16 sm:mt-3 text-slate-950 font-bold dark:text-slate-200">Kanban App</h1>
        <button onClick={toggleTheme} className="absolute sm:top-5 sm:right-5 bg-slate-200 hover:bg-slate-300 text-slate-500 p-3 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200">
          {theme == "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
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
