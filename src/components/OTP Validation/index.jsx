import { useState } from "react";
import VerificationAPI from "./VerificationAPI";

function OTPValidation() {
  const [otp, setOTP] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleVerify = async () => {
    try {
      const response = await VerificationAPI.verifyOTP(otp);
      setVerificationMessage(response.message);
    } catch (error) {
      setVerificationMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOTPChange}
        />
      </div>
      <button onClick={handleVerify}>Verify OTP</button>
      <p>{verificationMessage}</p>
    </div>
  );
}

export default OTPValidation;
