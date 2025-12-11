import React from "react";
import './App.css';
import TaskProvider from "./contexts/TaskContext/TaskContext";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import Header from "./components/Header/Header";
import { useThemeContext } from "./contexts/ThemeContext/ThemeContext";
import TaskSearch from "./components/TaskSearch/TaskSearch";
import FilterControl from "./components/FilterControls/FilterControls";
import UndoActions from "./components/UndoActions/UndoActions";


function App() {

    const { theme } = useThemeContext();
    return (
        <TaskProvider>
            <div data-theme={theme} className="main-container">
                <header>
                    <Header />
                </header>
                <main>
                    <TaskForm />
                    <TaskSearch />
                    <FilterControl />
                    <TaskList />
                    <UndoActions />
                </main>
            </div>
        </TaskProvider>
    )
}

export default App;