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
        {myData.map((items) => {
          return (
            <div className="card" key={items.id}>
              <h4>Username: {items.username}</h4>
              <h4>Email: {items.email}</h4>
              <h4>Roll: {items.role}</h4>
              <h5>
                {items.creationDate} - {items.lastUpdated}
              </h5>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersData;
