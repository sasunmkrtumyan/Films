import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import signin from "../images/signin.png";
import signout from "../images/signout.ico";
import favorites from "../images/favorites.png";

export default function NavTabs({ user, handleLogout }) {
  let history = useHistory();

  function handleSignOut() {
    history.push("/signin");
    handleLogout();
  }

  return (
    <div className="nav">
      <div style={{ padding: "10px" }} className="link middling">
        <Link to="/">
          <img
            className="img"
            style={{ width: "50px", height: "50px", marginLeft: "30px" }}
            src={logo}
            alt="logo"
            title="HOME"
          />
        </Link>
        <Link to="/Favorites">
          <img
            className="img"
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "20px",
              marginBottom: "5px",
            }}
            src={favorites}
            alt="logo"
            title="Favorites"
          />
        </Link>
      </div>
      <div className="link last-link">
        {user ? (
          <img
            onClick={handleSignOut}
            style={{ width: "50px", height: "50px", marginRight: "20px" }}
            className="img"
            src={signout}
            alt="logo"
            title="SignOut"
          />
        ) : (
          <Link to="/SignIn">
            <img
              style={{ width: "50px", height: "50px", marginRight: "20px" }}
              className="image"
              src={signin}
              alt="logo"
              title="SignIn"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
