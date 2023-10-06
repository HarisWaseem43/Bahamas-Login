import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../Redux/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpemail, setOTPEmail] = useState("");
  const [otpcode, setOTPCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [purpose, setPurpose] = useState("ADMIN_LOGIN");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isLoginConfirmed, setIsLoginConfirmed] = useState(false);

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
        setIsLoginConfirmed(true);
        setOTPEmail(email);
        return response.data;
      } else {
        return <div>Something Went Wrong</div>;
      }
    } catch (error) {
      return error.message;
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    // Ensure that only digits are entered and limit the input to 1 character
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 1);

    // Update the OTP array at the specified index
    const newOTP = [...otpcode];
    newOTP[index] = sanitizedValue;
    setOTPCode(newOTP);

    // Focus on the next input field, if available
    if (index < inputRefs.length - 1 && sanitizedValue !== "") {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otpcode[index] === "") {
      // Move focus to the previous input field and clear one character from it
      inputRefs[index - 1].current.focus();
      const newOTP = [...otpcode];
      newOTP[index - 1] = "";
      setOTPCode(newOTP);
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

      if (response.status === 200) {
        navigate("/userdata");
        const { accessToken, refreshToken } = response.data;
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));

        Cookies.set("refreshToken", refreshToken, { expires: 10 / (24 * 60) });
        Cookies.set("accessToken", accessToken, { expires: 10 / (24 * 60) });

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
      {/* LOGIN and OTPVerification Form */}
      {isLoginConfirmed ? (
        <>
          {/* OTP Verification Form */}
          <form onSubmit={handleOTPValidation}>
            <h2>OTP Veridication</h2>
            {/* OTP Form */}
            <div className="form-group-1">
              <label>Email:</label>
              <input
                type="email"
                value={otpemail}
                onChange={(e) => setOTPEmail(e.target.value)}
              />
            </div>
            <div>
              {otpcode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength={1}
                  ref={inputRefs[index]}
                />
              ))}
            </div>
            {/* <div className="form-group">
              <label>OTP Code:</label>
              <input
                type="password"
                value={otpcode}
                onChange={(e) => setOTPCode(e.target.value)}
                required
              />
            </div> */}
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
        </>
      ) : (
        //Login Form
        <form onSubmit={handleSubmitForm}>
          <h2>Login</h2>
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
      )}
    </div>
  );
};

export default LoginForm;
