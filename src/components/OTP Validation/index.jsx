import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../Redux/authSlice";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const OTPValidation = () => {
  const [email, setEmail] = useState("haris.jinnbyte@yopmail.com");
  const [otpcode, setOTPCode] = useState("");
  const [purpose, setPurpose] = useState("ADMIN_LOGIN");
  const [verificationStatus, setVerificationStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOTPForm = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(`${apiUrl}/auth/verifyOTP`, {
        email: email,
        otpCode: otpcode,
        purpose: purpose,
      });

      // console.log("Response Status: ", response.status);
      // console.log("Response Data: ", response.data);

      if (response.status === 200) {
        navigate("/otpverification/userdata");
        const { accessToken, refreshToken } = response.data;
        dispatch(setAccessToken(accessToken));

        Cookies.set("refreshToken", refreshToken, { expires: 10 / (24 * 60) });
        Cookies.set("accessToken", accessToken, { expires: 10 / (24 * 60) });

        // console.log("OTP AccessToken: ", accessToken);
        // console.log("OTP Refresh Token: ", refreshToken);

        setVerificationStatus("OTP Verified!");

        return response.data;
      } else {
        setVerificationStatus("OTP Verification Failed");
      }
    } catch (error) {
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
        <div className="form-group-1">
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
