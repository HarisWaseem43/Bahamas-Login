import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../Redux/authSlice";
import { useNavigate } from "react-router";

const OTPValidation = () => {
  const [email, setEmail] = useState("");
  const [otpcode, setOTPCode] = useState("");
  const [purpose, setPurpose] = useState("ADMIN_LOGIN");
  const [verificationStatus, setVerificationStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOTPForm = async (e) => {
    e.preventDefault();
    console.log("Email :", email);
    console.log("OTP-Code :", otpcode);
    console.log("Purpose :", purpose);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      console.log("API: ", apiUrl);

      const response = await axios.post(`${apiUrl}auth/verifyOTP`, {
        email: email,
        otpCode: otpcode,
        purpose: purpose,
      });

      // console.log("Response Status: ", response.status);
      // console.log("Response Data: ", response.data);

      if (response.status === 200) {
        navigate("/otpverification/userdata");
        const accessToken = response.data.accessToken;
        // console.log(accessToken);
        dispatch(setAccessToken(accessToken));

        setVerificationStatus("OTP Verified!");
        // console.log(response.data);

        return response.data;
      } else {
        setVerificationStatus("OTP Verification Failed");
      }
    } catch (error) {
      // console.error("Error: ", error);
      setVerificationStatus("An error occurred while verifying OTP.");
      return error.message;
    }
  };

  return (
    <div className="login-container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleOTPForm}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>OTP Code:</label>
          <input
            type="password"
            value={otpcode}
            onChange={(e) => setOTPCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Purpose:</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
        <p>{verificationStatus}</p>
      </form>
    </div>
  );
};

export default OTPValidation;
