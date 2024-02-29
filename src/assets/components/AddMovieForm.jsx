import React, { useState } from 'react';

function AddMovieForm({ onMovieAdded }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genres, setGenres] = useState('');
  const [inTheaters, setInTheaters] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const movieData = {
      title,
      director,
      releaseYear: parseInt(releaseYear, 10),
      genres: genres.split(',').map(genre => genre.trim()),
      inTheaters,
    };

    const API_URL = 'http://localhost:4000/api/movies';
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRuYW50YWoxIiwiaWQiOiI2NWMyOGI3N2RiNTQyOGM3ZGU5M2EyOTMiLCJpYXQiOjE3MDkxOTk1MTEsImV4cCI6MTcwOTI4NTkxMX0.BJhOhxgH_Kl1iozytGuywZIUJ8Fn9Qty5sXi0NRgCmM'; 

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie. Please try again.');
      }

      const responseData = await response.json();
      console.log('Movie added:', responseData);

      // Call the onMovieAdded function passed from the parent component
      // This function could fetch the updated movies list or append the new movie to the existing list
      onMovieAdded(responseData);

      // Reset form fields to initial state
      setTitle('');
      setDirector('');
      setReleaseYear('');
      setGenres('');
      setInTheaters(false);

    } catch (error) {
      console.error('Adding movie failed:', error);
      alert('Adding movie failed. Please check console for details.'); // Example of simple error feedback
    }
  };

  return (
    <div className="add-movie-form p-4 bg-white shadow rounded">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)} className="form-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseYear" className="form-label">Release Year</label>
          <input type="number" id="releaseYear" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} className="form-input" />
        </div>

        <div className="mb-3">
          <label htmlFor="genres" className="form-label">Genres (comma-separated)</label>
          <input type="text" id="genres" value={genres} onChange={(e) => setGenres(e.target.value)} className="form-input" />
        </div>

        <div className="mb-3">
          <label>
            <input type="checkbox" checked={inTheaters} onChange={(e) => setInTheaters(e.target.checked)} />
            In Theaters
          </label>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
