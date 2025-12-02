import React, { useState } from "react";
import './MovieExplorer.css';
import { movies } from "../data/data";
import './MovieCard.css';
import './FavMovie.css';

function getMovieLength(length) {
    const hours = Math.floor(length / 60);
    const minutes = length % 60;
    return `${hours + (hours > 1 ? 'hrs' : 'hr')} ${minutes + (minutes > 1 ? 'mins' : 'min')}`
}


function FavMovie({ movieID, handleFavlist , favlist}) {
    const movie = movies.find((movie) =>{
        return(movie.id === movieID)
    })

    function handleDelete(id){
        handleFavlist(id);
    }
    return (
        <div className='fav-movie'>
            <p>{`${movie.name}(${movie.yearReleased})`}</p>
            <img onClick={()=>handleDelete(movie.id)} src='./delete.svg' alt='delete'/>
        </div>
    )
}



function MovieCard({ handleFavlist,favlist, colorTheme, id, name, yearReleased, rating, director, cast, genre, durationMinutes, language, posterUrl, intro }) {
    // const [fav, setFav] = useState(false);
    function handleHeart(id) {
        // const newFav = !fav;
        // setFav(newFav);
        handleFavlist(id);
    }



    return (
        <div key={id} className={`movie-card ${colorTheme === 'light' ? 'mc-light-bg light-shadow' : 'mc-dark-bg dark-shadow'}`}>
            <img src={posterUrl} alt='movie poster' />
            <div className='movie-meta'>
                <h3 className={colorTheme === 'light' ? 'light-text' : 'dark-text'}  >{name}</h3>
                <i className="director-name">By : {director}</i>
                <div className='movie-meta-info'>
                    <span>{yearReleased}</span>
                    <div className="separator"></div>
                    <span>{getMovieLength(durationMinutes)}</span>
                </div>
                <div className='movie-genere-container'>
                    {
                        genre.map((item, index) => {
                            return (
                                <span key={index} className='genre-item'>{item}</span>
                            )
                        })
                    }
                </div>

                <div className='rating-container'>
                    <h4 className={colorTheme === 'light' ? 'light-text' : 'dark-text'}>Summary</h4>
                    <div className='rating'>
                        <img src='./star.svg' alt='star' />
                        <p>{rating}</p>
                    </div>
                </div>

                <div className='summary-text'>
                    {intro}
                </div>

                <div className='cast-container'>
                    {
                        cast.map((item, index) => {
                            return (
                                <i key={index} className='cast-item'>{item + (index < (cast.length - 1) ? ',' : '')}</i>
                            );
                        })
                    }
                </div>

                <div className='like-btn'>
                    <button onClick={() => handleHeart(id)} className={`add-to-fav ${favlist.includes(id) ? 'fav-added' : 'fav-not-added'}`}>
                        <img src='./like.svg' alt='fav' />
                        {
                            favlist.includes(id) ? <p>Favourited</p> : <p>Add To Favourite</p>
                        }

                    </button>
                </div>


            </div>

        </div>
    );
};


function MovieExplorer() {
    //theme management
    const [theme, setTheme] = useState('light');
    function handleToggleTheme() {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    //search term managment
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMovies = movies.filter((movie, index) => {
        const value = searchTerm.toLowerCase();
        return movie.name.toLowerCase().includes(value) ||
            movie.director.toLowerCase().includes(value) ||
            movie.cast.some(item => item.toLowerCase() === value) ||
            movie.intro.toLowerCase().includes(value);
    })

    function handleSearchReset(){
        setSearchTerm('');
    }

    //favourite management
    const [favlist, setFavlist] = useState([]);

    function handleFavlist(id) {
        favlist.includes(id) ? setFavlist(prevFavlist => prevFavlist.filter(item => item !== id)) : setFavlist(prevFavlist => [...prevFavlist, id])
    }


    return (
        <div className={`movies-explorer-card ${theme === 'light' ? 'light-bg' : 'dark-bg'}`}>
            <div className='theme-toggler'>
                <button onClick={handleToggleTheme} className={`theme-toggle-btn ${theme === 'light' ? 'light-bg' : 'dark-bg'}`}>
                    <img src={theme === 'light' ? './day.svg' : '/night.svg'} alt='theme' />
                    <p>Toggle theme</p>
                </button>
            </div>
            <div className='card-header'>
                <h1 className={`${theme === 'light' ? 'light-text' : 'dark-text'}`}>Movie Explorer</h1>
                <p>Search, filter and, select your favourite movies.</p>
            </div>

            <div className='search-container'>
                <input autoComplete="off" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="search" id='search' className={`${theme === 'light' ? 'light-shadow' : 'dark-shadow'}`} type='text' placeholder='Search movies (e.g. "Interstellar" ,"start")' />
                <button onClick={handleSearchReset} className='reset-btn'>
                    <img src='./reset.svg' alt='reset' />
                    <p>Reset</p>
                </button>
            </div>

            {
                searchTerm !=='' && (
                    <div className="search-results">
                        <p>{filteredMovies.length} results for "{searchTerm}"</p>
                    </div>
                )
            }


            <div className='movies-container'>
                <div className='movies'>
                    <h2 className={`${theme === 'light' ? 'light-text' : 'dark-text'}`}>Movies</h2>
                    <div className='movies-grid'>
                        {
                            filteredMovies.length >0 ? (
                                filteredMovies.map((movie, index) => {
                                return (
                                    <MovieCard favlist={favlist} handleFavlist={handleFavlist} key={index} colorTheme={theme} {...movie} />
                                )
                            })
                            ) :
                            (
                                <div className="empty-favourite"><p>No Movies Found!</p></div>
                            )
                            
                        }
                    </div>
                </div>
                <div className='favourite-movies'>
                    <h2 className={`${theme === 'light' ? 'light-text' : 'dark-text'}`}>Favourite Movies</h2>
                    <div className="fav-movie-container">
                        {
                            favlist.length>0 ?(
                                favlist.map((fav, index) => {
                                return (<FavMovie favlist={favlist} handleFavlist={handleFavlist} key={index} movieID={fav} />)
                            })
                            ) :(
                                <div className="empty-favourite"><p>You do not have any favourite movies!</p></div>
                            )
                            
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MovieExplorer;