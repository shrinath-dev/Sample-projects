import React, {useState} from "react";
import './MovieExplorer.css';
import { movies } from "../data/data";


function MovieExplorer(){

    //theme management
    const [theme, setTheme] = useState('light');
    function handleToggleTheme(){
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }


    return(
        <div className={`movies-explorer-card ${theme === 'light' ? 'light-bg' : 'dark-bg'}`}>
            <div className='theme-toggler'>
                
            </div>
            <div className='card-header'>
                <h1>Movie Explorer</h1>
                <p>Search, filter and, select your favourite movies.</p>
            </div>
        </div>
    );
}

export default MovieExplorer;