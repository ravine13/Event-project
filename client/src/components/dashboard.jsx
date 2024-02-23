import { useState} from "react";
import "../App.css";
import { Link} from "react-router-dom";
// import TicketCount from "./TicketCount";





function Dashboard() {


    const [showForm, setShowForm] = useState(false);
    // const [ticketCount, setTicketCount] = useState(0);

    const toggleForm = () => {
      setShowForm(!showForm);
    };


    
    // useEffect(() => {
    //   fetchTicketData("http://localhost:5555/events");
    //   .then(response => response.json())
    //     .then(data => {})
    // }, []); 
  
    // const fetchTicketData = () => {
      
    //   fetch('/ticket_data')
    //     .then(response => response.json())
    //     .then(data => {
    //       const totalCount = data.reduce((acc, ticket) => acc + ticket.quantity, 0);
    //       setTicketCount(totalCount);
    //     })
    //     .catch(error => console.error('Error fetching ticket data:', error));
    // };



  return (
    <div className="dashboard">
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul className="dropdown">
        <li>
          <a href="#ticket-history">Ticket History</a>
          <ul>
            <li><a href="#ticket-history">View Ticket History</a></li>
          </ul>
        </li>
        <li>
          <a href="#event-history">Event History</a>
          <ul>
            <li><a href="#event-history">View Event History</a></li>
          </ul>
        </li>
        <li>
          <a href="#add-event">Add Event</a>
          <ul>
            <li><Link to={'/new_Event'} onClick={toggleForm}> Addd a New Event</Link></li>
          </ul>
        </li>
        <li>
          <a href="#billing-info">Billing Info</a>
          <ul>
            <li><a href="#billing-info">View Billing Info</a></li>
          </ul>
        </li>
        <li>
          <a href="#advert-fee-invoices">Advert Fee Invoices</a>
          <ul>
            <li><a href="#advert-fee-invoices">View Advert Fee Invoices</a></li>
          </ul>
        </li>
        <li>
          <a href="#ticket-count">Ticket Count for Event</a>
          <ul>
            <li><a href="#ticket-count">View Ticket Count</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="content">
      <h1>Welcome to Your Dashboard</h1>
        {/* <TicketCount count={ticketCount} /> */}
    </div>
  </div>
);
}

export default Dashboard;