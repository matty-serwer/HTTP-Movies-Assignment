import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const changeStar = (id) => (e) => {
      const newStars = movie.stars.map((star, sid) => {
        if(id !== sid) return star;
        return e.target.value
      })
    setMovie({ ...movie, stars: newStars});
  };

  const putChanges = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        push("/");
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='form-container'>
      <form onSubmit={putChanges}>
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
        {movie.stars.map((star, id) => (
          <label>
            Star: 
            <input
              type='text'
              value={star}
              onChange={changeStar(id)}
            />
          </label>
        ))}

        <button className='submit-button'>Submit Changes</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
