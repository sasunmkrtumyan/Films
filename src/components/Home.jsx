import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../axios";
import { useMovie } from "../contexts/movieContext";
import favorite from "../images/favorite.png";
import unfavorite from "../images/unfavorite.png";

export default function Home() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(true);

  const { state, dispatch } = useMovie();

  useEffect(() => {
    API.get(`/movie/popular?api_key=1f41d562736ffa5f54236b91efaa9a76`).then(
      (response) => dispatch({ type: "SET_MOVIES", payload: response.data })
    );
  }, []);

  useEffect(() => {
    if (search) {
      API.get(
        `/search/movie?api_key=1f41d562736ffa5f54236b91efaa9a76&query=${search}`
      ).then((response) =>
        dispatch({ type: "SET_MOVIES", payload: response.data })
      );
    }
  }, [search]);

  function handleFavorite(e) {
    e.preventDefault();
    setFavorites(!favorites);
  }

  return (
    <div className="home">
      <h1 className="heading-text">Latest filmes</h1>
      <div className="search-div">
        <input
          className="search"
          placeholder="Search ..."
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="wrapper">
        {state.movies?.results?.map((item) => (
          <Link to={`/movieInfo/${item.id}`}>
            <div className="card container" key={item.id}>
              <img
                className="movie-img image"
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                alt="k"
              />
              <div class="middle">
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
              <p>{item.title}</p>
              <p>{item.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
