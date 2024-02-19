import "../App.css";

function Navbar() {
  return (
    <div>
      <header>
        <div className="nav">
          <div className="nav-dt">
            <div className="logo">
              <span className="logo">TAGO - Del</span>
            </div>
            <div className="nav-list">
                <button>Home</button>              
                <button>Login</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;