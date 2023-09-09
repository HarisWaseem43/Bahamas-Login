import axios from "axios";

const VerificationAPI = {
  verifyOTP: async (otp) => {
    try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${apiUrl}auth/verifyOTP`, { otp });
    //   return response.data;
    console.log(response);
    } catch (error) {
        console.log(error);
    //   throw error;
    }
  },
};

export default VerificationAPI;
