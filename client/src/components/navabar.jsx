import { Link } from "react-router-dom";

function Navbar() {
  
  
  
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
        <Link id="log-list" to="/authpage/signup">
          Login
        </Link>
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