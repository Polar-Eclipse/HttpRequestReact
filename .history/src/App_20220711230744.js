import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
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
    const response = await fetch("https://swapi.dev/api/films/");
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
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
