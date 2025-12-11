import React from "react";
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";
import styles from './TaskStats.module.css';
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";

function TaskStats() {

    const { totalTasks, pendingTasks, completedTasks } = useTaskContext();
    const { theme } = useThemeContext();
    return (
        <div data-theme={theme} className={styles.statSection}>
            <h2>Tasks Stats</h2>
            <div className={styles.statContainer}>
                <div className={styles.stat}>
                    <strong>Total Tasks : </strong> <span>{totalTasks}</span>
                </div>
                <div className={styles.stat}>
                    <strong>Completed Tasks : </strong> <span>{completedTasks}</span>
                </div>
                <div className={styles.stat}>
                    <strong>Pending Tasks : </strong> <span>{pendingTasks}</span>
                </div>
            </div>
        </div>
    )

}

export default TaskStats;