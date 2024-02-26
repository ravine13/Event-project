import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { EventsContext } from "../App";

function Navbar() {
  let { token_exists, handleLogOutTokenBlock, signedIn } =
    useContext(EventsContext);

  return (
    <div id="nav">
      <div id="logo-stf">
        <div id="under-ln">
          <span id="top-ln">T</span> &<span id="top-ln"> N</span>
        </div>
        <div id="under-ln">
          <span>_______ __</span>
        </div>
      </div>

      <div></div>

      <div className="nav-list">
        <div>
          <input id="srch-bar" placeholder="Search Event"></input>
        </div>
        <div>
          <Link id="log-list" to="/home">
            Home
          </Link>
        </div>
        <div>
          <Link id="log-list" to="/event">
            Events
          </Link>
        </div>
        <div>
          <Link to="AdminDash">Admin</Link>
        </div>

        <div className="log_div">
          {token_exists || signedIn ? (
            <NavLink
              to="/authpage/signup"
              className="log_link p-1 px-2 border border-primary rounded-pill"
              exact="true"
              onClick={handleLogOutTokenBlock}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/authpage/signup"
              className="log_link p-1 px-2 border border-primary rounded-pill"
              exact="true"
            >
              Login
            </NavLink>
          )}
        </div>

        <div>
          <Link to="/event">
            <button id="tck-btn" type="button">
              Buy Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
