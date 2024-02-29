import React from 'react';

export default function MoviesList({ movies, setMovies }) {
    const handleDelete = async (movieId) => {
        const API_URL = `http://localhost:4000/api/movies/${movieId}`;
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRuYW50YWoxIiwiaWQiOiI2NWMyOGI3N2RiNTQyOGM3ZGU5M2EyOTMiLCJpYXQiOjE3MDkxOTk1MTEsImV4cCI6MTcwOTI4NTkxMX0.BJhOhxgH_Kl1iozytGuywZIUJ8Fn9Qty5sXi0NRgCmM';

        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: {
                    'auth-token': authToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the movie.');
            }

            // Directly update the state to remove the deleted movie
            const updatedMovies = movies.filter(movie => movie._id !== movieId);
            setMovies(updatedMovies);

        } catch (error) {
            console.error('Error deleting movie:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="movies-container">
            {movies.length > 0 ? (
                <ul className="movies-grid">
                    {movies.map((movie, index) => (
                        <li key={index} className="movie-item">
                            <div className="movie-info">
                                <h3>{movie.title} ({movie.releaseYear})</h3>
                                <p>Directed by: {movie.director}</p>
                                <p>Genres: {movie.genres.join(', ')}</p>
                                <p>{movie.inTheaters ? 'Now in theaters!' : 'Not currently in theaters.'}</p>
                                <button className='delete-btn' onClick={() => handleDelete(movie._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies to display.</p>
            )}
        </div>
    );
}


