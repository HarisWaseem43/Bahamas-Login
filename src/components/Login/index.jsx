import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../Redux/authSlice";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpemail, setOTPEmail] = useState("");
  const [otpcode, setOTPCode] = useState("");
  const [purpose, setPurpose] = useState("ADMIN_LOGIN");
  const [verificationStatus, setVerificationStatus] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${apiUrl}/auth/dashboardLogin`, {
        email,
        password,
      });
      if (response.status === 200) {
        // navigate("/otpverification");
        // console.log(response);
        return response.data;
      } else {
        return <div>Something Went Wrong</div>;
      }
    } catch (error) {
      // console.error("Error: ", error);
      return error.message;
    }
  };

  const handleOTPValidation = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(`${apiUrl}/auth/verifyOTP`, {
        email: otpemail,
        otpCode: otpcode,
        purpose: purpose,
      });

      // console.log("Response Status: ", response.status);
      // console.log("Response Data: ", response.data);

      if (response.status === 200) {
        navigate("/userdata");
        const { accessToken, refreshToken } = response.data;
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));

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
      {/* LOGIN Form */}
      <h2>Login</h2>
      <form onSubmit={handleSubmitForm}>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* OTP Form */}
      <h2>OTP Verification</h2>
      <form onSubmit={handleOTPValidation}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={otpemail}
            onChange={(e) => setOTPEmail(e.target.value)}
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

export default LoginForm;
