import React, { } from "react";
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import TaskItem from "../TaskItem/TaskItem";
import styles from './TaskList.module.css';


function TaskList() {
    const { theme } = useThemeContext();
    const { tasks, searchTerm } = useTaskContext();

    return (
        <div data-theme={theme} className={styles.tasksGrid}>
            <h2>Tasks({tasks.length})</h2>

            {
                tasks.length > 0 ? (
                    tasks.map((task) => {
                        return <TaskItem key={task.id} task={task} />
                    })
                ) : (
                    <div className={styles.noTask}>
                        <p>No task found, add some task to continue.</p>
                    </div>
                )
            }
        </div>
    )
}

export default TaskList;