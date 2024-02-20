import '../App.css';

function Home() {
  return (
    <>
    <div  className="homed">

        <div id='hom'>
            <h1>Home</h1>
            <p>This is the home page.</p>
            <button>Check Events</button>  
        </div>
        <div id='advert-rm'>
            <p>advert area</p>
        </div>
        <div id=''></div>


          
    </div>
    <footer>
        <div className="footer-content">
          <div className="contact-info">
            <h3>Contact Us</h3>
            <p>Email: example@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div className="social-media">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;