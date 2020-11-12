import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleStarChange = (id) => (e) => {
      const newStars = movie.stars.map((star, sid) => {
        if(id !== sid) return star;
        return e.target.value
      })
    setMovie({ ...movie, stars: newStars});
  };

  const postChanges = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        console.log(res);
        // props.setMovieList(res.data);
        console.log(movie)
        push("/");
      })
      .then((err) => {
        console.log(err);
      });
  };

  const addStar = e => {
      e.preventDefault();
      setMovie({ ...movie, stars: [...movie.stars, '']})
  }

  return (
    <div className='form-container'>
      <h2>Add A Movie</h2>
      <form onSubmit={postChanges}>
        <label>
          Title:
          <input
            type='text'
            name='title'
            value={movie.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Director:
          <input
            type='text'
            name='director'
            value={movie.director}
            onChange={handleChange}
          />
        </label>
        <label>
          Metascore:
          <input
            type='number'
            name='metascore'
            value={movie.metascore}
            onChange={handleChange}
          />
        </label>
        <button onClick={addStar}>Add New Star</button>
        {movie.stars.map((val, idx) => {
          let starName = `star${idx}`;
          return (
            <div key={idx}>
              <label htmlFor={starName}>
                <input
                  type='text'
                  name={starName}
                  data-id={idx}
                  id={starName}
                  className='name'
                  onChange={handleStarChange(idx)}
                  value={movie.stars[idx]}
                />
              </label>
            </div>
          );
        })}
        <button type='submit' value='submit' className='submit-button'>
          Submit Changes
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
