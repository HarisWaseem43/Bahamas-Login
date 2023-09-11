import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import OTPValidation from "./components/OTP Validation";
import UsersData from "./components/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/otpverification" element={<OTPValidation />} />
        <Route path="/otpverification/userdata" element={<UsersData />} />
      </Routes>
    </>
  );
}

export default App;
