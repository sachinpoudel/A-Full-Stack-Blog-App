import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyEmailCode } from "../api";

const Verifycode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace to move to previous box
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit verification code
  const handleSubmit = async (e) => {
    e.preventDefault();
    const joinedCode = code.join("");
    setLoading(true);
    try {
      const response = await verifyEmailCode(joinedCode);
      console.log(response);
      setMessage("✅ Verification successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2s
    } catch (err) {
      console.error("Error verifying email code:", err);
      if (err.response) {
        console.error("Backend responded with:", err.response.data);
        setMessage(`❌ ${err.response.data.message || "Invalid code."}`);
      } else if (err.request) {
        console.error("No response received from server:", err.request);
        setMessage("❌ No response from server. Check your connection.");
      } else {
        console.error("Unexpected error:", err.message);
        setMessage("❌ An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Enter 6-Digit Verification Code
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border border-gray-400 rounded"
            />
          ))}
        </div>

       

        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        {message && (
          <div
            className={`p-2 rounded-md ${
              message.includes("successful")
                ? "bg-green-300 text-black-300"
                : "bg-red-300 text-white-300"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Verifycode;
