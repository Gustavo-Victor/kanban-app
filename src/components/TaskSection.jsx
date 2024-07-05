/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import TaskList from "./TaskList";


export default function TaskSection({ tasks, setTasks }) {
    const [tasksTodo, setTasksTodo] = useState([]);
    const [tasksDoing, setTasksDoing] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);    

    useEffect(() => {
        const todo = tasks.filter(task => task.status == "todo");
        const doing = tasks.filter(task => task.status == "doing");
        const done = tasks.filter(task => task.status == "done");
        setTasksTodo(todo);
        setTasksDoing(doing);
        setTasksDone(done);
    }, [tasks]);

    const statusArr = ["todo", "doing", "done"];

    return (
        <section className="flex flex-col gap-16 flex-wrap w-full max-w-96 justify-center mx-auto mb-5 sm:max-w-max sm:flex-row">
            {statusArr.map((status) => (
                <TaskList 
                    status={status} 
                    key={status}
                    tasks={tasks}
                    tasksTodo={tasksTodo}
                    tasksDoing={tasksDoing}
                    tasksDone={tasksDone}
                    setTasks={setTasks}
                     />
            ))}
        </section>
    )
}
