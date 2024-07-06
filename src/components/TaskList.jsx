/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useEffect } from "react";
import { notify } from "../utils/notifications";
import { useDrag, useDrop } from "react-dnd";
import { HiMinusCircle, HiPencil } from "react-icons/hi";


export default function TaskList({
    status, tasks, tasksTodo, tasksDoing, tasksDone, setTasks
}) {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => handleDndTask(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    let bg = "bg-slate-500 dark:bg-slate-600";
    let text = "Todo";
    let tasksToMap = tasksTodo || [];

    if (status == "doing") {
        bg = "bg-purple-500 dark:bg-purple-600";
        text = "Doing"
        tasksToMap = tasksDoing;
    } else if (status == "done") {
        bg = "bg-green-500 dark:bg-green-600"
        text = "Done";
        tasksToMap = tasksDone;
    }

    // const displayModal = (display) => {
    //     const modal = window.document.getElementById("modal-container");
    //     if(display) {
    //         modal.classList.remove("hide"); 
    //     } else {
    //         modal.classList.add("hide"); 
    //     }
    // }

    // const handleToggleModalTask = (task) => {
    //     displayModal(true); 
    //     setTaskToUpdate(task); 
    // }

    const handleDeleteTask = (id) => {
        setTasks(prevState => {
            const updatedTasks = tasks.filter(task => task.id != id);
            localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
            return updatedTasks;
        });
        notify("success", "Task deleted");
    }

    const handleDndTask = (id) => {
        setTasks(prevState => {
            const list = prevState.map(task => {
                if (task.id == id) {
                    return { ...task, status: status }
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify([...list]));
            notify("success", "Task status changed");
            return [...list];
        });
    }

    return (
        <div ref={drop} className={`${isOver ? "bg-slate-200 dark:bg-slate-700" : ""} sm:w-64`}>
            <TaskHeader
                text={text}
                bg={bg}
                count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map((task) => (
                <TaskBody
                    key={task.id}
                    tasks={tasks}
                    task={task}
                    handleDelete={handleDeleteTask} />
            ))}
        </div>
    )
}

function TaskHeader({ text, bg, count }) {
    return (
        <div className={`${bg} flex gap-2 items-center min-h-12 px-4  rounded-md uppercase text-sm text-white`}>
            <h4>{text}</h4>
            <span className="bg-white h-5 p-2 text-black rounded-full flex justify-center items-center">{count}</span>
        </div>
    )
}

function TaskBody({ tasks, task, handleDelete }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    // console.log(isDragging)

    return (
        <div
            ref={drag}
            className={` ${isDragging ? "opacity-25" : "opacity-100"} bg-gray-50 relative p-4 mt-8 shadow-md rounded-md cursor-grab dark:bg-slate-800 dark:text-slate-300`}>
            <p>{task.name}</p>
            <button className="absolute bottom-2 right-2 text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <HiMinusCircle className="text-xl opacity-70" onClick={() => handleDelete(task.id)} />
            </button>
        </div>
    )
}