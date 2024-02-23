import { Dropdown } from './components/dropdown';




function Dashboard() {
    

    return (
        <div className="dashboard-container">

            <div className="sales-card">

            <p>Service</p>
            <Dropdown>
                <p>Booking</p>
                <p>Tickets</p>
                <p>Billing</p>
            </Dropdown>
            
            
            </div>
            <div className="middle-container">
                <div className="numbers-place"><h3>marketing dashboard</h3></div>
                <div className="random-box"><h3>Dash Routes</h3></div>

            </div>
        
        
        
        
        </div>
    );
  
}
export default Dashboard;