import React, { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";
import styles from './TaskForm.module.css';


function TaskForm() {
    const { addTask } = useTaskContext();
    const { theme } = useThemeContext();

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: 'medium',
    })
    const [showForm, setShowForm] = useState(false);
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
        addTask(taskData);
        setTaskData({
            title: '',
            description: '',
            priority: 'medium',
        })

    }

    if (showForm) {
        return (
            <div data-theme={theme} className={styles.taskFormContainer}>
                <h2>Add Task</h2>
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
                            rows='6'
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
                        <button onClick={() => setShowForm(false)} type="button" className={styles.cancelBtn} >Cancel</button>
                        <button className={styles.submitBtn} type='submit'>Submit</button>
                    </div>

                </form>
            </div>
        )
    }

    return (
        <div className={styles.addTaskContainer}>
            <button onClick={() => setShowForm(true)} className={styles.addTaskBtn}>Add Task</button>
        </div>
    )


};


export default TaskForm;