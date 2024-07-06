/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { notify } from "../utils/notifications";
import { v4 as uuidv4 } from "uuid";


export default function TaskForm({ setTasks, btnText }) {
    const initialState = {
        id: "",
        name: "",
        status: "todo",
    }
    const [task, setTask] = useState(initialState);

    const handleChangeTask = (e) => {
        setTask(prevState => {
            return {
                ...prevState,
                id: uuidv4(),
                name: e.target.value,
                status: "todo"
            };
        })
    }

    const createTask = (task) => {
        if (task) {
            setTasks(prevTasks => {
                const list = [...prevTasks, task];
                localStorage.setItem("tasks", JSON.stringify(list));
                notify("success", "Task created");
                return list;
            });
        }
    }

    // const updateTask = (task) => {
    //     const list = tasks.map(t => {
    //         if(String(t.id) == String(task.id)) {
    //             return task; 
    //         }else {
    //             return t;
    //         }
    //     }); 
    //     console.log(list); 
    //     setTasks(list); 
    // }

    const handleSubmit = (e) => {
        const modal = window.document.getElementById("modal-container");
        e.preventDefault();
        if (task.name.length < 4) {
            notify("error", "Task must have more than 3 characters.");
            return;
        }
        if (task.name.length > 50) {
            notify("error", "Task must not have more than 50 characters.");
            return;
        }

        // if (taskToUpdate || btnText == "Edit") {
        //     updateTask(task);
        //     notify("success", "Task updated");
        //      if (!modal.classList.contains("hide")) {
        //          modal.classList.add("hide");
        //      }
        // } 
        
     
            createTask(task);
        
        
        setTask(initialState);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                id="name"
                value={task.name || ""}
                onChange={handleChangeTask}
                placeholder="Enter some text..."
                maxLength={50}
                className="rounded-md mr-4 h-12 outline-none bg-white-50 px-2 w-full md:min-w-64 mb-5 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-400"
            />
            <button className="bg-cyan-500 dark:bg-cyan-900 outline-none rounded-md text-white px-4 py-2 h-12 dark:hover:bg-cyan-800 hover:bg-cyan-600">{btnText}</button>
        </form>
    )
}
