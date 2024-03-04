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
    fetch("https://event-project.onrender.com/new_booking", {
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
    <div className="d-flex align-items-center justify-content-center" style={{ fontFamily: 'sans-serif', padding: '1rem', minHeight: '100vh' }}>
      <div className="d-flex align-items-center justify-content-center" style={{ maxWidth: '96rem', width: '100%', margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#F3F4F6' }}>
            Book for the event
          </h2>
          <p style={{ color: '#F3F4F6', fontSize: '1rem', marginTop: '1.5rem' }}>
            Complete your transaction swiftly and securely with our easy-to-use
            payment process.
          </p>
          <form className="mt-12 max-w-lg">
            <div className="grid gap-6">
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

          
              {/* Display card payment details if selected */}
              {formData.paymentOption === "card" && (
                <>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvopLT8JCd_dKpUzE7kUIyW5WIaXjVytAKA&usqp=CAU" alt="NA" />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder's Name"
                    className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="expDate"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                      value={formData.expDate}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="cvvNumber"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                      value={formData.cvvNumber}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Display Paypal details if selected */}
              {formData.paymentOption === "paypal" && (
                <>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBruR0EDIS7IV0QVnT08qljzTPWe2tV1mf9A&usqp=CAU" alt="NA" />
                <input
                  type="email"
                  name="paypalEmail"
                  placeholder="Paypal Email"
                  className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                  value={formData.paypalEmail}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="paypalEmail"
                  placeholder="Password"
                  className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
                  value={formData.paypalpassword}
                  onChange={handleChange}
                />

              </>
              )}
              
              {formData.paymentOption === "mpesa" && (
                <>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntSglBCes5pRM4RLPVdf_zOhxcBE9oh-ZVQ&usqp=CAU" alt="NA" />
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