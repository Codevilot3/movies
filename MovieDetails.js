import React, { useState, useEffect } from 'react';
import './home.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({});
  const [videoUrl, setVideoUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=bcc703647d81ec7788b8fc5ca4141c59`);
      setMovieDetails(data);
      const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=bcc703647d81ec7788b8fc5ca4141c59`);
      if (videoResponse.data.results.length > 0) {
        setVideoUrl(`https://www.youtube.com/embed/${videoResponse.data.results[0].key}`);
      }
    }
    fetchMovieDetails();
  }, [id]);

  const handlePlayVideo = () => {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'block';
  }

  const handleCloseModal = () => {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none';
  }

  return (
    <div className="movie-details">
      {Object.keys(movieDetails).length === 0 ?
        <p>Loading...</p> :
        <>
          <div className="left-column">
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.overview}</p>
            <p>Rating: {movieDetails.vote_average}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Language: {movieDetails.original_language}</p>
          </div>
          <div className="right-column">
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
            {videoUrl !== '' &&
              <div className="play-button" onClick={handlePlayVideo}>
                <i className="fa fa-play"></i>
              </div>
            }
          </div>
        </>
      }
      <div id="videoModal" className="modal" onClick={handleCloseModal}>
        <div className="modal-content">
          <iframe src={videoUrl} title={movieDetails.title}></iframe>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
