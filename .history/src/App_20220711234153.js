import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback
  const fetchMoviesHandler = useCallback(async () => {
    //code 20-60
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    //fetch method to get promise
    //first method
    // await fetch("https://swapi.dev/api/films/")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovies = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseData: movieData.release_date,
    //       };
    //     });
    //     setMovies(transformedMovies);
    //   });

    // method 2
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }
      const data = await response.json();

      const transformedMovies = await data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  // elegant code
  // let content = <p>Found on movies</p>;
  // if (movie.length > 0) {
  //   content = <MoviesList movies={movies} />;
  // }
  // if (error) {
  //   content = <p>{ error}</p>
  // }
  // if (isLoading) {
  //   content=<p>Loading</p>
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
        {/* { content} */}
      </section>
    </React.Fragment>
  );
}

export default App;
