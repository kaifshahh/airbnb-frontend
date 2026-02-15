import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HostHomesPage = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const handleDelete = async (homeId) => {
    if (!window.confirm("Are you sure you want to delete this home?")) {
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/host/delete-home/${homeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete home");
      }

      // Remove the deleted home from state
      setHomes(homes.filter((home) => home._id !== homeId));
      alert("Home deleted successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/host/host-home-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch host homes");
        }
        return res.json();
      })
      .then((data) => {
        setHomes(data.homes);
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
    <div className="mt-6">
      <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
        My Hosted Homes
      </h2>
      <div className="mb-6 text-center">
        <Link
          to="/host/host-add-home"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Home
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {homes.length > 0 ? (
          homes.map((home) => (
            <div key={home._id} className="relative">
              <HomeCard home={home} />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Link
                  to={`/host/edit/${home._id}?editing=true`}
                  className="bg-blue-500 text-white p-2 rounded text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(home._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-xs cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No homes hosted yet.</p>
        )}
      </div>
    </div>
  );
};

export default HostHomesPage;
