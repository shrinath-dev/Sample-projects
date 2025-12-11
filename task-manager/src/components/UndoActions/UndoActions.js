import React from "react";
import { useTaskContext } from "../../contexts/TaskContext/TaskContext";
import styles from './UndoActions.module.css';

function UndoActions() {

    const { canUndo, undoAction } = useTaskContext();
    return (
        <button disabled={!canUndo} onClick={() => undoAction()} className={`${styles.undoBtn} ${canUndo ? styles.active : styles.disabled}`}>
            <img src='./undo.svg' alt='undo' />
            Undo
        </button>
    )

}

export default UndoActions;