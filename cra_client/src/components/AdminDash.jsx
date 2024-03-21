import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="bg-gray-50 border-r mt-20 text-gray-600 px-4 md:px-8 md:w-64 flex-shrink-0">
        <div className="mt-10">
          <ul className={activeMenu === "advert" ? "active" : ""}>
            <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
              <Link to={"/AdvertFeeInvoices"}>View Fee Invoices</Link>
            </li>
            <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
              <a href="#billing-info" onClick={() => toggleMenu("billing")}>
                Billing
              </a>
              <ul className={activeMenu === "billing" ? "active" : ""}>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/billing_details"}>View Billing details</Link>
                </li>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/billing_info"}>View Billing Info</Link>
                </li>
              </ul>
            </li>
            <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
              <a href="#add-event" onClick={() => toggleMenu("event")}>
                Event
              </a>
              <ul className={activeMenu === "event" ? "active" : ""}>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/event"}>View Events</Link>
                </li>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/new_Event"}>Add a New Event</Link>
                </li>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/EventHistory"}>Event History</Link>
                </li>
              </ul>
            </li>
            <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
              <a href="#ticket-count" onClick={() => toggleMenu("ticket")}>
                Tickets
              </a>
              <ul className={activeMenu === "ticket" ? "active" : ""}>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/TicketCount"}>View Ticket Count</Link>
                </li>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/booked"}>View Tickets Booked</Link>
                </li>
                <li className="block w-full py-2 hover:border-indigo-600 hover:text-gray-900 duration-150">
                  <Link to={"/TicketHistory"}>View Ticket History</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 mt-20 px-4 md:px-8">
        <div className="p-4">
          <h1 className="text-6xl font-bold">Welcome to Admin Dashboard</h1>
        </div>
      </main>
    </div>
  );
};

export default Admin;
