import styles from "./index.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {createTask, getAllTasks} from "@lib/api";

export default function IndexPage() {

    const [input, setInput] = useState("")
    const [task, setTask] = useState([])


    useEffect(() => {
        const loadTasks = async () => {
            try {
                const task = await getAllTasks()
                setTask(task)
            } catch (e) {

            }
        }
        loadTasks()
    }, [task])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createTask({task: input})
    }

    return (
        <div className={styles.posts}>
            <h1>Welcome to my project!</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}/>
                <button type="submit">Send</button>
            </form>

            <h2>Get Task:</h2>
            {task.map((t) => {
                return (
                    <div key={t._id}>
                        {t.task}
                    </div>
                )
            })}
        </div>
    )
}