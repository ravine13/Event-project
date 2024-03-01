import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <aside style={{ backgroundColor: '#F9FAFB', borderRight: '1px solid #D1D5DB', marginTop: '5rem', color: '#4B5563', padding: '1rem', width: '16rem', flexShrink: 0 }}>
        <div style={{ marginTop: '2.5rem' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
              <Link to={"/AdvertFeeInvoices"}>View Fee Invoices</Link>
            </li>
            <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
              <a href="#billing-info" onClick={() => toggleMenu("billing")}>
                Billing
              </a>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/billing_details"}>View Billing details</Link>
                </li>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/billing_info"}>View Billing Info</Link>
                </li>
              </ul>
            </li>
            <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
              <a href="#add-event" onClick={() => toggleMenu("event")}>
                Event
              </a>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/event"}>View Events</Link>
                </li>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/new_Event"}>Add a New Event</Link>
                </li>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/EventHistory"}>Event History</Link>
                </li>
              </ul>
            </li>
            <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
              <a href="#ticket-count" onClick={() => toggleMenu("ticket")}>
                Tickets
              </a>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/TicketCount"}>View Ticket Count</Link>
                </li>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/booked"}>View Tickets Booked</Link>
                </li>
                <li style={{ width: '100%', padding: '0.5rem 0', transition: 'all 0.15s ease-in-out' }}>
                  <Link to={"/TicketHistory"}>View Ticket History</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <main style={{ flex: 1, marginTop: '5rem', padding: '1rem' }}>
        <div style={{ padding: '1rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to Admin Dashboard</h1>
        </div>
      </main>
    </div>
  );
};

export default Admin;
