import React from "react";
import styles from './FilterControl.module.css';
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";


function FilterControl() {
    const { filter, setFilter } = useTaskContext();
    const filterValues = ['all', 'pending', 'completed'];

    return (
        <div className={styles.filterContainer}>
            <p>Filter By Status:</p>
            <div className={styles.filterItems}>
                {
                    filterValues.map((item) => (
                        <div onClick={() => setFilter(item)} key={item} className={`${styles.filterItem} ${filter === item ? styles.selectedFilter : ''} `}>
                            {item}
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default FilterControl;