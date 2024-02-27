import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
          <div className="max-w-xs">
            <h1 className="font-bold text-2xl text-indigo-600">Ticket Nexus</h1>
            <p className="leading-relaxed mt-2 text-[15px]">
              You can always meet us around the corners where we plan and hold
              events for you. Now come and discover experiences out of this
              world with us.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
          <ul className="space-y-4">
            <h4 className="text-gray-800 font-medium">Pages</h4>
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

          <ul className="space-y-4">
            <h4 className="text-gray-800 font-medium">Company</h4>
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

          <ul className="space-y-4">
            <h4 className="text-gray-800 font-medium">FAQS</h4>
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
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 Ticket Nexus All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style> */}
    </footer>
  );
};

export default Footer;
