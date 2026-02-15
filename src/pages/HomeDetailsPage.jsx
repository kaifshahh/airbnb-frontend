import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Heart } from "lucide-react";

const HomeDetailsPage = () => {
  const { homeId } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // TODO: Fetch from backend

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/homes/${homeId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch home details");
        }
        return res.json();
      })
      .then((data) => {
        setHome(data.home);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [homeId]);

  const toggleFavourite = () => {
    // TODO: Implement API call to add/remove favourite
    setIsFavourite(!isFavourite);
  };

  if (loading)
    return <div className=" min-h-screen text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className=" min-h-screen text-center mt-10 text-red-500">
        Error: {error}
      </div>
    );
  if (!home)
    return (
      <div className=" min-h-screen text-center mt-10">Home not found</div>
    );

  return (
    <div className="min-h-screen bg-white shadow-lg rounded-lg p-8 mt-10 max-w-6xl mx-auto">
      <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
        Details of {home.houseName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={`${import.meta.env.VITE_API_URL}/${home.photo}`}
            alt={home.houseName}
            className="w-full h-96 object-cover"
            crossOrigin="anonymous"
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{home.description}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {home.location}
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Price</h3>
            <p className="text-green-600 text-xl font-bold">
              Rs{home.price} / night
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Rating</h3>
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="ml-2 text-lg">{home.rating} / 5</span>
            </div>
          </div>

          <div className="mt-2">
            <button
              onClick={toggleFavourite}
              className={`flex items-center px-4 py-2 rounded-lg border transition duration-300 ${
                isFavourite
                  ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                  : "bg-white text-red-500 border-red-500 hover:bg-red-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${isFavourite ? "fill-current" : ""}`}
              />
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetailsPage;
