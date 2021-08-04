import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MovieProvider } from "./contexts/movieContext";
import NavTabs from "./components/NavTabs";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Favorites from "./components/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import useLocalStorage from "./customHooks/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MovieInfo from "./components/MovieInfo";

function App() {
  const [user, setUser] = useLocalStorage("user", "");
  const [posts, setPosts] = useLocalStorage("posts", []);

  const addPost = (title, content) => {
    setPosts((prevPosts) => {
      return [...prevPosts, { title, content, user }];
    });
  };

  function handleLogin(username) {
    setUser(username);
  }

  function handleLogout() {
    setUser("");
  }

  return (
    <Router>
      <MovieProvider>
        <div className="navbar">
          <NavTabs user={user} handleLogout={handleLogout} />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home posts={posts} />
              </Route>
              <ProtectedRoute
                exact
                path="/Favorites"
                user={user}
                addPost={addPost}
                component={Favorites}
              />
              <Route path="/Favorites"></Route>
              <Route path="/SignIn">
                <SignIn handleLogin={handleLogin} />
              </Route>
              <Route path="/movieInfo/:id">
                <MovieInfo />
              </Route>
            </Switch>
          </div>
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;
