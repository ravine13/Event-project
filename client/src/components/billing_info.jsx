import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

function BillingInfo() {
    const [billingInfos, setBillingInfos] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [billingDetails, setBillingDetails] = useState('');
    const [user, setUser] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5555/billing_info');
            setBillingInfos(response.data);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedId) {
            const response = await axios.patch(`http://localhost:5555/billing_info/${selectedId}`, {
                payment_method: paymentMethod,
                billing_details: billingDetails,
                user: user
            });

            console.log(response.data);
        } else {
            const response = await axios.post('http://localhost:5555/billing_info', {
                payment_method: paymentMethod,
                billing_details: billingDetails,
                user: user
            });

            console.log(response.data);
        }
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5555/billing_info/${id}`);
        console.log(response.data);
    };

    return (
        <div className='billing-details'>

        {/* This should be in a different page */}
        
            {/* <form onSubmit={handleSubmit}>
                <label>
                    Payment Method:
                    <input type="text" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} />
                </label>
                <label>
                    Billing Details:
                    <input type="text" value={billingDetails} onChange={e => setBillingDetails(e.target.value)} />
                </label>
                <label>
                    User:
                    <input type="text" value={user} onChange={e => setUser(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form> */}

            {billingInfos.map(info => (
                <div key={info.id}>
                    <p>Payment Method: {info.payment_method}</p>
                    <p>Billing Details: {info.billing_details}</p>
                    <p>User: {info.user}</p>
                    <button onClick={() => handleDelete(info.id)}>Delete</button>
                    <button onClick={() => {
                        setPaymentMethod(info.payment_method);
                        setBillingDetails(info.billing_details);
                        setUser(info.user);
                        setSelectedId(info.id);
                    }}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default BillingInfo;
