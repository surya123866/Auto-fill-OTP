import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
          
        })
        .then((otp) => {
          setOtp(otp.code);
          console.log(otp);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
  });

  return (
    <div className="App">
      <h1>Hello TaxiWars!</h1>
      <h2>Your OTP is: {otp}</h2>
    </div>
  );
};

export default App;
