/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { notify } from "../utils/notifications";
import { useDrag, useDrop } from "react-dnd";


export default function TaskList({
    status, tasks, tasksTodo, tasksDoing, tasksDone, setTasks
}) {

    const [{isOver}, drop] = useDrop(() => ({
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

    const deleteTask = (id) => {        
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
                if(task.id == id) {
                    return {...task, status: status}
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
                    handleDelete={deleteTask} />
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

    console.log(isDragging)

    return (
        <div
            ref={drag}
            className={` ${isDragging ? "opacity-25" : "opacity-100"} bg-gray-50 relative p-4 mt-8 shadow-md rounded-md cursor-grab dark:bg-slate-800 dark:text-slate-300`}>
            <p>{task.name}</p>
            <button className="absolute bottom-2 right-2 text-slate-400" onClick={() => handleDelete(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    )
}