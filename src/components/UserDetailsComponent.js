import { useEffect, useState } from "react";
import { fetchDataFromApi, refreshData } from "../services/apiService";

import TreeTableComponent from "./TreeTableComponent";

function UserDataDetailsComponent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const data = await fetchDataFromApi();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = async () => {
    try {
      const newData = await refreshData(); //fethes new data from
      setUserData(newData); //             /refresh fake endpoint
    } catch (err) {
      setError(err.message);
    }
  };

  {
    if (error) return <p>Error: {error}</p>;
    if (loading) return <p>Loading...</p>;
    if (!userData) return <p>No user data available</p>;
  }
  return (
    <div>
      <h1>Random User Data</h1>
      <img
        src={userData.picture.large}
        style={{ width: 250, height: 250 }}
        alt="Random User Image"
      ></img>
      <h2>{`Full Name: ${userData.name.title}. ${userData.name.first} ${userData.name.last}`}</h2>
      <button onClick={handleRefresh}>Fetch a new user data</button>
      <TreeTableComponent data={userData} />
      {/* TODO: DONE pass attributes: userData */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      data must be stringified again.
    </div>
  );
}

export default UserDataDetailsComponent;
