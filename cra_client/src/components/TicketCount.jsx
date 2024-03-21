import { useEffect, useState} from "react";

function TicketCount() {

  const [ticketsCount, setTicketsCount] = useState(0);

  const handleBuyTicket = () => {
    setTicketsCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    fetchTicketData();
  }, []); 
  
  const fetchTicketData = () => {
    
    const data = [
      
    ];

    const totalCount = data.reduce((acc, ticket) => acc + ticket.quantity, 0);
    setTicketsCount(totalCount);
  };



  return (
    <div>
       <h1 className="text-center">Tickets Count: {ticketsCount}</h1>
      <button onClick={handleBuyTicket}>Buy Ticket</button>






    </div>
  )
}

export default TicketCount