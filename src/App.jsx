import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import './App.css';

const API_KEY = 'your_api_key_here'; // Replace with your actual key
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch movies
  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}${query}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || 'No movies found.');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    }
    setLoading(false);
  };

  // Trigger search on searchTerm change (debounced via useEffect)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500); // 500ms debounce to avoid too many API calls
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;