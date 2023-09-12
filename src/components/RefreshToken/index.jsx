import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../Redux/authSlice";

const RefreshTokens = () => {
  const dispatch = useDispatch();

  const refreshToken = Cookies.get("refreshToken");
  // console.log("RefreshToken /refreshToken: ", refreshToken);

  const refreshTokens = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      if (!refreshToken) {
        console.error("Refresh token not found in Redux state.");
        return;
      }

      const response = await axios.post(`${apiUrl}/auth/refreshAccessToken`, {
        refreshToken: refreshToken,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        // console.log("New AccessToken: ", accessToken);
        // console.log("New RefreshToken: ", refreshToken);

        Cookies.set("accessToken", accessToken, { expires: 10 / (24 * 60) });
        Cookies.set("refreshToken", refreshToken, {
          expires: 10 / (24 * 60),
        });

        dispatch(setAccessToken(accessToken));
      } else {
        console.error("Token refresh failed.");
      }
    } catch (error) {
      console.error("Error refreshing tokens:", error);
    }
  };

  // Call the refreshTokens function when the component mounts
  useEffect(() => {
    refreshTokens();
  }, [refreshToken]);

  return null;
};

export default RefreshTokens;
