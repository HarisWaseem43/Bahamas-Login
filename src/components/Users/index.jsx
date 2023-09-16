import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearTokens } from "../Redux/authSlice";

const UsersData = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState(" ");
  const [refreshCount, setRefreshCount] = useState(0);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = Cookies.get("newAccessToken");
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      if (currentTime < expirationTime) {
        alert("Token is still valid. You can't log out yet.");
        return;
      }
    }
    dispatch(clearTokens());
    navigate("/");
  };

  const getAPIData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `${apiUrl}/dashboard/users/getAllUsers`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        setMyData(response.data.data);
      } else if (response.status === 401) {
        if (refreshCount < 3) {
          const newAccessToken = Cookies.get("newAccessToken");
          // console.log("Cookies New Access Token", accessToken);

          const newHeaders = {
            Authorization: `Bearer ${newAccessToken}`,
          };
          const newResponse = await axios.get(
            `${apiUrl}/dashboard/users/getAllUsers`,
            {
              headers: newHeaders,
            }
          );

          if (newResponse.status === 200) {
            setMyData(newResponse.data.data);
          } else {
            setIsError("Something went wrong");
          }
          setRefreshCount(refreshCount + 1);
        } else {
          setIsError("Unauthorized. Please login again.");
          navigate("/");
        }
      } else {
        setIsError("Something went wrong");
      }
    } catch (error) {
      console.log("Error :", error);
      setIsError(error.message);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        if (accessToken) {
          await getAPIData();
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    if (navigate === "/" && accessToken) {
      navigate("/userdata");
    }
  }, [accessToken]);

  return (
    <>
      <h1>Users Data</h1>
      <button onClick={handleLogout}>Logout</button>
      {isError !== " " && <h3>Error: {isError}</h3>}

      <div className="grid">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Creation Date</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.creationDate}</td>
                <td>{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersData;
