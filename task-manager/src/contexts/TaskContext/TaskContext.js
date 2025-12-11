import React, { useContext, createContext, useReducer, useMemo } from 'react';


const TaskContext = createContext();

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTaskcontext is not used inside a taskProvider')
    }

    return context;
}


// this is the initial state of our application one default task.
const initialState = {
    tasks: [
        {
            id: Date.now(),
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Task Manager Using React.',
            description: 'Plan, design, and develope a beautiful, elegant, responsive and modern task manager using React and context api. Use a modular approach. Deploy using netlify',
            priority: "high" || 'medium',
        },
        {
            id: Date.now() + 1,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Learn TypeScript Fundamentals',
            description: 'Complete TypeScript course covering types, interfaces, generics, and advanced patterns. Build a small CLI application to practice concepts.',
            priority: 'high'
        },
        {
            id: Date.now() + 2,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: true,
            title: 'Build Weather App with API Integration',
            description: 'Create a responsive weather application using OpenWeather API, React, and Tailwind CSS. Include geolocation support and 5-day forecast.',
            priority: 'medium'
        },
        {
            id: Date.now() + 3,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: true,
            title: 'Master CSS Grid and Flexbox',
            description: 'Practice advanced CSS layouts by recreating 5 popular website designs. Focus on responsive design patterns and modern CSS techniques.',
            priority: 'medium'
        },
        {
            id: Date.now() + 4,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Setup Authentication with Firebase',
            description: 'Implement user authentication system using Firebase Auth. Include email/password, Google sign-in, and protected routes in React app.',
            priority: 'high'
        },
        {
            id: Date.now() + 5,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: true,
            title: 'Create Portfolio Website',
            description: 'Design and develop personal portfolio showcasing projects, skills, and experience. Use React, Framer Motion for animations, and deploy on Vercel.',
            priority: 'medium'
        },
        {
            id: Date.now() + 6,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Learn Node.js and Express Basics',
            description: 'Build a RESTful API with Node.js and Express. Include CRUD operations, middleware, error handling, and MongoDB integration.',
            priority: 'high'
        },
        {
            id: Date.now() + 7,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Practice JavaScript Data Structures',
            description: 'Solve 20 LeetCode problems focusing on arrays, objects, maps, sets, and linked lists. Document solutions with time complexity analysis.',
            priority: 'medium'
        },
        {
            id: Date.now() + 8,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: false,
            title: 'Build E-commerce Product Page',
            description: 'Create interactive product page with image gallery, size selector, add to cart functionality, and shopping cart using Redux for state management.',
            priority: 'high'
        },
        {
            id: Date.now() + 9,
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
            completedAt: null,
            isCompleted: true,
            title: 'Study React Performance Optimization',
            description: 'Learn useMemo, useCallback, React.memo, and code splitting techniques. Optimize existing project and measure performance improvements.',
            priority: 'medium'
        },

    ],
    searchTerm: '',
    filter: 'all', // pending, completed
    history: [],
}

const ACTIONS = {
    'ADD_TASK': 'ADD_TASK',
    'DELETE_TASK': 'DELETE_TASK',
    'EDIT_TASK': 'EDIT_TASK',
    'TOGGLE_TASK': 'TOGGLE_TASK',
    'UNDO_ACTION': 'UNDO_ACTION',
    'SET_SEARCH': 'SET_SEARCH',
    'SET_FILTER': 'SET_FILTER',
}

const taskReducer = (state, action) => {

    const saveToHistory = (currentState) => {
        return ({
            ...currentState,
            history: [state, ...currentState.history.slice(0, 9)],
        })
    }
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            const newTask = {
                id: Date.now(),
                createdAt: new Date().toLocaleString(),
                lastUpdated: new Date().toLocaleString(),
                completedAt: null,
                isCompleted: false,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority || 'medium',
            }
            return saveToHistory({
                ...state,
                tasks: [newTask, ...state.tasks]
            });

        case ACTIONS.DELETE_TASK:
            return saveToHistory({
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            });

        case ACTIONS.EDIT_TASK:
            return saveToHistory({
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return ({
                            ...task,
                            ...action.payload.taskUpdateData,
                            lastUpdated: new Date().toLocaleString(),
                        })
                    }
                    return task;
                })
            });

        case ACTIONS.TOGGLE_TASK:
            return saveToHistory({
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload) {
                        return ({
                            ...task,
                            isCompleted: true,
                            completedAt: new Date().toLocaleString(),
                        })
                    }
                    return task;
                })
            })

        case ACTIONS.UNDO_ACTION:
            return ({
                ...state.history[0],
            })

        case ACTIONS.SET_SEARCH:
            return ({
                ...state,
                searchTerm: action.payload
            })

        case ACTIONS.SET_FILTER:
            return (
                {
                    ...state,
                    filter: action.payload,
                }
            )
        default:
            throw new Error(`unhandled action type: ${action.type}`)
    }

}




function TaskProvider({ children }) {

    const [state, dispatch] = useReducer(taskReducer, initialState);

    // dispatch function dispensers.

    const addTask = (taskData) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: taskData });
    }

    const deleteTask = (taskId) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    }

    const editTask = (taskId, taskUpdateData) => {
        dispatch({ type: ACTIONS.EDIT_TASK, payload: { id: taskId, taskUpdateData: taskUpdateData } })
    }

    const toggleTask = (id) => {
        dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id })
    }
    const undoAction = () => {
        dispatch({ type: ACTIONS.UNDO_ACTION });
    }
    const setSearch = (searchTerm) => {
        dispatch({ type: ACTIONS.SET_SEARCH, payload: searchTerm });
    }

    const setFilter = (filter) => {
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
    }

    const filteredTask = useMemo(() => {
        return (
            state.tasks.filter((task) => {
                const matchFilter = (
                    state.filter === 'all' ||
                    (state.filter === 'completed' && task.isCompleted) ||
                    (state.filter === 'pending' && !task.isCompleted)
                );
                const searchTerm = state.searchTerm.toLowerCase();
                const matchesSearch = (
                    searchTerm === '' ||
                    task.title.toLowerCase().includes(searchTerm) ||
                    task.description.toLowerCase().includes(searchTerm)
                )
                return matchFilter && matchesSearch;
            })
        )
    }, [state]);
    const canUndo = state.history.length > 0;
    // console.log(state);
    const value = {
        tasks: filteredTask,
        totalTasks: state.tasks.length,
        pendingTasks: state.tasks.filter((task) => !task.isCompleted).length,
        completedTasks: state.tasks.filter(task => task.isCompleted).length,
        canUndo: canUndo,
        searchTerm: state.searchTerm,
        filter: state.filter,
        addTask,
        deleteTask,
        editTask,
        toggleTask,
        undoAction,
        setSearch,
        setFilter,
    }


    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;