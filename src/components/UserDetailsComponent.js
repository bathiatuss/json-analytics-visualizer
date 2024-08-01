import { useEffect, useState } from "react";
import { fetchDataFromApi, refreshData } from "../services/apiService";

function UserDataDetailsComponent() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    getData();
  }, []);

  const handleRefresh = async () => {
    try {
      const data = await refreshData();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  {
    if (error) return <p>Error: {error}</p>;
    if (loading) return <p>Loading</p>;
    if (!userData) return <p>No user data available</p>;
  }
  return (
    <div>
      <h1>Random User Data</h1>
      <img src={userData.largeImage}></img>
      <h2>{`Full Name: ${userData.title} ${userData.firstName} ${userData.lastName}`}</h2>
      <button onClick={handleRefresh}>Fetch a new user data</button>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {/*data must be stringified again.*/}
    </div>
  );
}

export default UserDataDetailsComponent;
