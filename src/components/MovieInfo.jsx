import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { API } from "../axios";
import animationData from "../images/loading.json";
import favorite from "../images/favorite.png";
import unfavorite from "../images/unfavorite.png";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function MovieInfo() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(true);

  useEffect(() => {
    API.get(`/movie/${id}?api_key=1f41d562736ffa5f54236b91efaa9a76&`).then(
      (response) => setMovie(response.data)
    );
  }, []);

  useEffect(() => {
    if (movie) {
      setLoading(false);
    }
  }, [movie]);

  function handleFavorite(e) {
    e.preventDefault();
    setFavorites(!favorites);
  }

  if (loading) {
    return <Lottie options={defaultOptions} height={400} width={400} />;
  }

  return (
    <div className="movieInfo">
      <div className="img-side">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt="img"
        />
        <h3>Relised: {movie.release_date}</h3>
        <div class="fav">
          {favorites === true ? (
            <div onClick={handleFavorite} class="text">
              <p>Add to favorites</p>
              <img className="fav-img" src={favorite} alt="df" />
            </div>
          ) : (
            <div onClick={handleFavorite} class="text">
              <p>Remove to favorites</p>
              <img className="fav-img" src={unfavorite} alt="imges" />
            </div>
          )}
        </div>
      </div>
      <div className="info-side">
        <h1>{movie.original_title}</h1>
        <p>
          <span className="colorized"> Language</span> -{" "}
          {movie.original_language}
        </p>
        <p>
          <span className="colorized">Production companies</span> -{" "}
          {movie.production_companies.map((comp) => (
            <span>{comp.name}, </span>
          ))}
        </p>
        <p>
          <span className="colorized">Duration</span> - {movie.runtime} min
        </p>
        <p>
          <span className="colorized">Rating</span> - {movie.vote_average}
        </p>
        <p>
          <span className="colorized">Budget</span> - {movie.budget}
        </p>
        <p>
          <span className="colorized">Genres</span> -{" "}
          {movie.genres.map((el) => (
            <span>{el.name}, </span>
          ))}
        </p>
        <p className="togline">{movie.tagline}</p>
        <hr style={{ marginTop: "10px" }} />
        <hr />
        <p>{movie.overview}</p>
        <hr />
        <hr />
      </div>
    </div>
  );
}
