import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState("0000");
  const [support, setSupport] = useState("Checking...");

  useEffect(() => {
    const handleFormSubmit = (e) => {
      e.preventDefault();

      const input = document.querySelector(
        'input[autocomplete="one-time-code"]'
      );
      if (!input) return;

      const ac = new AbortController();
      const form = input.closest("form");
      if (form) {
        form.addEventListener("submit", () => {
          ac.abort();
        });
      }

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOtp(otp.code);
          input.value = otp.code;
          if (form) form.submit();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    if (!("OTPCredential" in window)) {
      setSupport("Supported");
    } else {
      setSupport("Not Supported");
    }

    window.addEventListener("DOMContentLoaded", handleFormSubmit);

    return () => {
      window.removeEventListener("DOMContentLoaded", handleFormSubmit);
    };
  }, []);

  return (
    <form className="App">
      <input autoComplete="one-time-code" required />
      <input type="submit" />
      <p>{otp}</p>
      <p>{support}</p>
    </form>
  );
}

export default App;
