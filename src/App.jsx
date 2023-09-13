import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login";
// import OTPValidation from "./components/OTP Validation";
import UsersData from "./components/Users";
import NotFound from "./components/NotFoundPage";
import RefreshTokens from "./components/RefreshToken";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* <Route path="/otpverification" element={<OTPValidation />} /> */}
        <Route path="/userdata" element={<UsersData />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {/* Call the Refresh Token Function */}
      <RefreshTokens />
    </>
  );
}

export default App;
