import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";

import { useAuth } from "../context/AuthContext";

const FavouritesPage = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch favourites");
        }
        return res.json();
      })
      .then((data) => {
        setHomes(data.favouriteHomes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className=" min-h-screen mt-6">
      <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
        My Favourites
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {homes.length > 0 ? (
          homes.map((home) => <HomeCard key={home._id} home={home} />)
        ) : (
          <p className="text-gray-600">No favourites found.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
