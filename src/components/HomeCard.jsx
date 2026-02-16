import { MapPin, Star, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const HomeCard = ({ home }) => {
  const location = useLocation();
  const isHomesPage = ["/homes", "/favourites"].includes(location.pathname);
  const homeId = home._id || home.id;
  const {
    isLoggedIn,
    token,
    user: currentUser,
    updateUserFavorites,
  } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);

  // Sync favorite state with user's favorites list whenever it changes
  useEffect(() => {
    if (currentUser?.favourites && homeId) {
      const isFav = currentUser.favourites.some(
        (fav) => (fav._id || fav || "").toString() === homeId.toString(),
      );
      setIsFavourite(isFav);
    }
  }, [currentUser?.favourites, homeId]);

  const toggleFavourite = async (e) => {
    console.log("toggleFavourite clicked for home:", home);
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login to save homes");
      return;
    }

    try {
      const url = isFavourite
        ? `${import.meta.env.VITE_API_URL}/favourites/delete/${homeId}`
        : `${import.meta.env.VITE_API_URL}/favourites`;

      const method = "POST";
      const body = isFavourite ? {} : JSON.stringify({ homeId: homeId });
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!isFavourite) headers["Content-Type"] = "application/json";

      const res = await fetch(url, {
        method,
        headers,
        body: isFavourite ? null : body,
      });

      if (res.ok) {
        const newFavState = !isFavourite;
        setIsFavourite(newFavState);
        // Update user's favorites in context
        updateUserFavorites(homeId, newFavState);
      } else {
        console.error("Failed to toggle favourite");
      }
    } catch (err) {
      console.error("Error toggling favourite", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">
      <Link to={`/homes/${homeId}`}>
        <img
          src={
            home.photo?.startsWith("http")
              ? home.photo
              : `${import.meta.env.VITE_API_URL}/${home.photo}`
          }
          alt={home.houseName}
          className="w-full h-48 object-cover"
          crossOrigin="anonymous"
        />
      </Link>
      <div className="p-4">
        <Link to={`/homes/${homeId}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-red-500 transition duration-300">
            {home.houseName}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {home.location}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-red-500">
            Rs{home.price} / night
          </span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1 fill-current" />
            <span className="text-gray-700">{home.rating}</span>
          </div>
        </div>

        {isHomesPage ? (
          <div className="flex space-x-2 mt-3">
            <Link
              to={`/homes/${homeId}`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded text-center transition duration-300"
            >
              Details
            </Link>
            <button
              onClick={toggleFavourite}
              className={`flex-1 flex items-center justify-center font-medium p-2 cursor-pointer rounded border transition duration-300 ${isFavourite ? "bg-red-50 text-red-500 border-red-500" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
            >
              <Heart
                className={`w-4 h-4 mr-1 ${isFavourite ? "fill-current" : ""}`}
              />
              {isFavourite ? "remove from favourite" : "Add to favourite"}
            </button>
          </div>
        ) : (
          <button className="bg-green-300 hover:bg-green-400 text-green-900 font-medium p-2 rounded w-full transition duration-300 mt-2">
            Book
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
