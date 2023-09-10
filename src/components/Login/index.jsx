import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${apiUrl}auth/dashboardLogin`, {
        email,
        password,
      });
      if (response.status === 200) {
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

  return (
    <div className="login-container">
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
    </div>
  );
};

export default LoginForm;
