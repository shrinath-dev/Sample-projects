import React, { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import styles from './TaskItem.module.css';
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";


function TaskItem({ task }) {

    const { theme } = useThemeContext();
    const { deleteTask, editTask, toggleTask } = useTaskContext();

    const [isEditing, setIsEditing] = useState(false);
    const [taskData, setTaskData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
    })
    const handleChange = (name, value) => {
        setTaskData({
            ...taskData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskData.title.trim()) {
            alert('Title can not be empty, please enter title to continue');
            return;
        }
        if (!taskData.priority.trim()) {
            alert('Priority can not be empty, please Select priority to continue');
            return
        }
        editTask(task.id, taskData);
        setIsEditing(false);
        // setTaskData({
        //     title: '',
        //     description: '',
        //     priority: 'medium',
        // })

    }

    if (isEditing) {
        return (
            <div data-theme={theme} className={styles.taskContainer}>
                <h2>Edit Task: {task.id}</h2>
                <form id='add-task' name='add-task' className={styles.taskForm} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor='title'>Title</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='Enter task title...'
                            value={taskData.title}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            name='description'
                            placeholder='Enter task description...'
                            value={taskData.description}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='priority'>Priority</label>
                        <select
                            name="priority"
                            value={taskData.value}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        >
                            <option value=''>Select priority</option>
                            <option value='low'>Low</option>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
                        </select>
                    </div>

                    <div className={styles.formBtn}>
                        <button className={styles.submitBtn} type='submit'>Submit</button>
                        <button onClick={() => setIsEditing(false)} type="button" className={styles.cancelBtn} >Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div data-theme={theme} className={styles.taskContainer}>
            <div className={styles.taskMeta}>
                <i><small className={styles.taskCreated}>Created At: {task.createdAt}</small></i>
                <i><small className={styles.taskUpdated}>Last Updated At: {task.lastUpdated}</small></i>
            </div>
            <div className={styles.taskItemHeader}>
                <h2 className={task.isCompleted ? styles.completed : ''}>{task.title}</h2>
                <p>{task.priority}</p>
            </div>

            <p className={`${styles.taskDescription} ${task.isCompleted ? styles.completed : ''}`}>{task.description}</p>
            <div className={styles.taskActions}>
                {
                    !task.isCompleted ? (<button onClick={() => toggleTask(task.id)}>Mark As Completed</button>) : (<p>Task is completed at: {task.completedAt}</p>)
                }
                <div className={styles.taskEditActions}>
                    <button disabled={task.isCompleted} className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;