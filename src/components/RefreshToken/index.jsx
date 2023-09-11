import axios from "axios";
import Cookies from "js-cookie";

const RefreshTokens = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("API: ", apiUrl);

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    console.log("Old Access Token :", accessToken); // console Tokens
    console.log("Old Refresh Token :", refreshToken); // console Tokens

    if (!accessToken || !refreshToken) {
      console.error("Access token or refresh token not found in cookies.");
      return;
    }

    const response = await axios.post(`${apiUrl}/auth/refreshAccessToken`, {
      // accessToken: accessToken,
      refreshToken: refreshToken,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 10 / (24 * 60) });
      Cookies.set("refreshToken", refreshToken, { expires: 10 / (24 * 60) });
      console.log("New AccessToken: ", accessToken);
      console.log("New RefreshToken: ", refreshToken);
      const newAccessToken = accessToken;

      return newAccessToken; // Refresh the AccessToken
    } else {
      console.error("Token refresh failed.");
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error);
  }
};

export default RefreshTokens;
