import { useState, useEffect } from 'react';
import MoviesList from "./assets/components/MoviesList";
import AddMovieForm from './assets/components/AddMovieForm';


function App() {
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    fetch('http://localhost:4000/api/movies')
      .then(response => response.json())
      .then(movie => setMovies(movie))
      .catch(error => console.error('Error:', error));
  };

  const handleMovieAdded = (newMovie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
    setShowAddForm(false); // Hide the add movie form
    setSuccessMessage('Movie added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  
    return (
      
      <div>
        <h1>Movies</h1>
        {successMessage && <div>{successMessage}</div>}
        {showAddForm ? (
          <>
          <AddMovieForm onMovieAdded={handleMovieAdded} />
          <button onClick={() => setShowAddForm(false)}>Back to movies</button>
          </>
        ) : (
          <>
            <button onClick={() => setShowAddForm(true)}>Add New Movie</button>
            <MoviesList movies={movies} setMovies={setMovies} />
          </>
        )}
      </div>
    );

}

export default App;
