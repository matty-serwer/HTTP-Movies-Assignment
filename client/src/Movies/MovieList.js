import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function MovieList({ movies }) {

  const { push } = useHistory();
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      <button class='add-button' onClick={()=>{push(`/add-movie`)}}>Add Movie</button>
    </div>
  );
}

export default MovieList;
