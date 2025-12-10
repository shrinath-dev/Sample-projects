import React from "react";
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";
import styles from './TaskSearch.module.css';

function TaskSearch() {

    const { searchTerm, setSearch } = useTaskContext();
    return (
        < div className={styles.searchContainer} >
            <input
                autoComplete="off"
                name='search'
                type='text'
                value={searchTerm}
                placeholder="Search for a task..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </div >
    )

}

export default TaskSearch;