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
          <a href="#advert-fee-invoices">Advertisement</a>
          <ul>
          <li><Link to={'/AdvertFeeInvoices'} onClick={toggleForm}> View Fee Invoices</Link></li>
          </ul>
        </li>
        <li>
          <a href="#billing-info">Billing</a>
          <ul>
          <li><Link to={'/billing_details'} onClick={toggleForm}> View Billing details</Link></li>
          <li><Link to={'/billing_info'} onClick={toggleForm}> View Billing Info</Link></li>
          </ul>
        </li>
        <li>
          <a href="#add-event">Event</a>
          <ul>
            <li><Link to={'/event'} onClick={toggleForm}> View Events</Link></li>
            <li><Link to={'/new_Event'} onClick={toggleForm}> Add a New Event</Link></li>
            <li><Link to={'/EventHistory'} onClick={toggleForm}> Event History</Link></li>
          </ul>
        </li>
        
        
        <li>
          <a href="#ticket-count">Tickets</a>
          <ul>
          <li><Link to={'/TicketCount'} onClick={toggleForm}> View Ticket Count</Link></li>
          <li><Link to={'/Booking'} onClick={toggleForm}> View Tickets Booked</Link></li>
          <li><Link to={'/TicketHistory'} onClick={toggleForm}> View Ticket History</Link></li>
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