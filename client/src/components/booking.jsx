// Booking.jsx
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
    <div className="font-[sans-serif] p-4 min-h-screen">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="lg:col-span-2 max-lg:order-1">
          <h2 className="text-3xl font-extrabold text-gray-100">
            Book for the event
          </h2>
          <p className="text-gray-100 text-base mt-6">
            Complete your transaction swiftly and securely with our easy-to-use
            payment process.
          </p>
          <form className="mt-12 max-w-lg">
            <div className="grid gap-6">
              {/* Payment options */}
              <div>
                <label className="text-gray-100 text-sm block mb-2">
                  Payment Option:
                </label>
                <select
                  className="px-4 py-3.5 bg-gray-100 text-gray-900 w-full text-sm border rounded-md outline-none"
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
                  {/* ... (same as your existing code) */}
                </>
              )}

              {/* Display Paypal details if selected */}
              {formData.paymentOption === "paypal" && (
                <>
                  {/* ... (same as your existing code) */}
                </>
              )}

              {/* Display M-Pesa details if selected */}
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
              className="mt-6 w-40 py-3.5 text-sm bg-gray-900 text-white rounded-md"
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
