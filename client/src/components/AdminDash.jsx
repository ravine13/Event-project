import { useState} from "react";
import "../App.css";
import { Link} from "react-router-dom";






function Dashboard() {


  

  

    const [activeMenu, setActiveMenu] = useState(null);



    const toggleMenu = (menu) => {
      setActiveMenu(activeMenu === menu ? null : menu);
    };


  



   return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul className="dropdown">
          <li>
            <a href="#advert-fee-invoices" onClick={() => toggleMenu("advert")}>
              Advertisement
            </a>
            <ul className={activeMenu === "advert" ? "active" : ""}>
              <li>
                <Link to={'/AdvertFeeInvoices'}>View Fee Invoices</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#billing-info" onClick={() => toggleMenu("billing")}>
              Billing
            </a>
            <ul className={activeMenu === "billing" ? "active" : ""}>
              <li>
                <Link to={'/billing_details'}>View Billing details</Link>
              </li>
              <li>
                <Link to={'/billing_info'}>View Billing Info</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#add-event" onClick={() => toggleMenu("event")}>
              Event
            </a>
            <ul className={activeMenu === "event" ? "active" : ""}>
              <li><Link to={'/event'}>View Events</Link></li>
              <li><Link to={'/new_Event'}>Add a New Event</Link></li>
              <li><Link to={'/EventHistory'}>Event History</Link></li>
            </ul>
          </li>
          <li>
            <a href="#ticket-count" onClick={() => toggleMenu("ticket")}>
              Tickets
            </a>
            <ul className={activeMenu === "ticket" ? "active" : ""}>
              <li><Link to={'/TicketCount'}>View Ticket Count</Link></li>
              <li><Link to={'/booked'}>View Tickets Booked</Link></li>
              <li><Link to={'/TicketHistory'}>View Ticket History</Link></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to Your Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard