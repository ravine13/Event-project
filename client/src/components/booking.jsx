import React, { useState } from "react";
import "../App.css";
import PaymentForm from "./paymentForm";

const Booking = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvvNumber: "",
    phoneNumber: "",
    paymentOption: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingDetails = () => {
    fetch("http://127.0.0.1:5555/new_booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handlePaymentOption = (option) => {
    setFormData({
      ...formData,
      paymentOption: option,
    });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '96rem', width: '100%', margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#F3F4F6' }}>
            Book for the event
          </h2>
          <p style={{ color: '#F3F4F6', fontSize: '1rem', marginTop: '1.5rem' }}>
            Complete your transaction swiftly and securely with our easy-to-use
            payment process.
          </p>
          <form style={{ marginTop: '3rem', maxWidth: '18rem' }}>
            <div style={{ display: 'grid', gridGap: '1.5rem' }}>
              <div>
                <label style={{ color: '#F3F4F6', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Payment Option:
                </label>
                <select
                  style={{ paddingLeft: '1rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', backgroundColor: '#F3F4F6', color: '#1F2937', width: '100%', fontSize: '0.875rem', borderWidth: '1px', borderRadius: '.375rem', outline: 'none' }}
                  name="paymentOption"
                  onChange={(e) => handlePaymentOption(e.target.value)}
                  value={formData.paymentOption}
                  required
                >
                  <option value="">Select Payment Option</option>
                  <option value="card">Card</option>
                  <option value="paypal">Paypal</option>
                  <option value="mpesa">M-Pesa</option>
                </select>
              </div>
              {formData.paymentOption === "card" && (
                <>
              
                </>
              )}
              {formData.paymentOption === "paypal" && (
                <>
                </>
              )}
              {formData.paymentOption === "mpesa" && (
                <>
                  <PaymentForm
                    phoneNumber={formData.phoneNumber}
                    setPhoneNumber={(value) =>
                      setFormData({ ...formData, phoneNumber: value })
                    }
                    handleSubmit={handleBookingDetails}
                  />
                </>
              )}
            </div>
            <button
              type="button"
              style={{ marginTop: '1.5rem', width: '10rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '0.875rem', backgroundColor: '#1F2937', color: 'white', borderRadius: '.375rem' }}
              onClick={handleBookingDetails}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
