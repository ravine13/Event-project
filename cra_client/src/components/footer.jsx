import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer style={{ color: '#6B7280', backgroundColor: '#F9FAFB', paddingLeft: '1rem', paddingTop: '1.25rem', paddingBottom: '1.25rem', maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <div style={{ gap: '1.5rem', justifyContent: 'space-between', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: '16rem' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6366F1' }}>Ticket Nexus</h1>
            <p style={{ lineHeight: '1.25rem', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
              You can always meet us around the corners where we plan and hold
              events for you. Now come and discover experiences out of this
              world with us.
            </p>
          </div>
        </div>
        <div style={{ flex: 1, marginTop: '2.5rem', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
          <ul style={{ gap: '1rem' }}>
            <h4 style={{ color: '#1F2937', fontWeight: '500' }}>Pages</h4>
            <li>
              <a href="/home">Homes</a>
            </li>
            <li>
              <a href="/event">Events</a>
            </li>
            <li>
              <a href="/authpage/signup">Login</a>
            </li>
          </ul>

          <ul style={{ gap: '1rem' }}>
            <h4 style={{ color: '#1F2937', fontWeight: '500' }}>Company</h4>
            <li>
              <a href="/">Invest</a>
            </li>
            <li>
              <a href="/">Partner</a>
            </li>
            <li>
              <a href="/">Insurance Policy</a>
            </li>
          </ul>

          <ul style={{ gap: '1rem' }}>
            <h4 style={{ color: '#1F2937', fontWeight: '500' }}>FAQS</h4>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Customer service</a>
            </li>
            <li>
              <a href="/">Partnership</a>
            </li>
            <li>
              <a href="/">Terms & conditions</a>
            </li>
            <li>
              <a href="/">Privacy & Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #D1D5DB', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
        <div style={{ marginTop: '1rem' }}>
          © 2024 Ticket Nexus All rights reserved.
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <li style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </li>

            <li style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>

            <li style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </li>

            <li style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
