import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UsersData = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState(" ");

  const accessToken = useSelector((state) => state.auth.accessToken);
  //   console.log(accessToken);

  const getAPIData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(`${apiUrl}dashboard/users/getAllUsers`, {
        headers,
      });
      if (response.status === 200) {
        // console.log(response.data.data);
        setMyData(response.data.data);
      } else {
        return <div>Something Went Wrong</div>;
      }
    } catch (error) {
      //   console.log("Error :", error);
      setIsError(error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAPIData();
    }
  }, [accessToken]);

  return (
    <>
      <h1>Users Data</h1>
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
