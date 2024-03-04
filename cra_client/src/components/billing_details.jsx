import { useState, useEffect } from 'react';
import axios from 'axios';

function BillingDetails() {
    const [billingDetails, setBillingDetails] = useState([]);
    const [detail, setDetail] = useState('');
    const [name, setName] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://event-project.onrender.com/billing_details');
            setBillingDetails(response.data);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedId) {
            const response = await axios.patch(`https://event-project.onrender.com/billing_details/${selectedId}`, {
                detail: detail,
                name: name
            });

            console.log(response.data);
        } else {
            const response = await axios.post('https://event-project.onrender.com/billing_details', {
                detail: detail,
                name: name
            });

            console.log(response.data);
        }
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`https://event-project.onrender.com/billing_details/${id}`);
        console.log(response.data);
    };

    return (
        <div className='billing-details'>
            <form onSubmit={handleSubmit}>
                <label>
                    Detail:
                    <input type="text" value={detail} onChange={e => setDetail(e.target.value)} />
                </label>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            {billingDetails.map(detail => (
                <div key={detail.id}>
                    <p>Detail: {detail.detail}</p>
                    <p>Name: {detail.name}</p>
                    <button onClick={() => handleDelete(detail.id)}>Delete</button>
                    <button onClick={() => {
                        setDetail(detail.detail);
                        setName(detail.name);
                        setSelectedId(detail.id);
                    }}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default BillingDetails;