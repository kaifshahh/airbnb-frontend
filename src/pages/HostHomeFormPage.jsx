import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HostHomeFormPage = () => {
  const { homeId } = useParams();
  const [searchParams] = useSearchParams();
  const editing = searchParams.get("editing") === "true";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    houseName: "",
    price: "",
    location: "",
    rating: "",
    description: "",
    photo: null,
  });
  // For photo preview or keeping existing photo logic, complex with file input.
  // backend expects 'photo' as file.

  const { token } = useAuth();

  useEffect(() => {
    if (editing && homeId) {
      fetch(
        `${import.meta.env.VITE_API_URL}/host/edit-home/${homeId}?editing=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.home) {
            setFormData({
              houseName: data.home.houseName,
              price: data.home.price,
              location: data.home.location,
              rating: data.home.rating,
              description: data.home.description,
              photo: null, // File inputs can't be set programmatically
            });
          }
        })
        .catch((err) => console.error("Failed to fetch home for editing", err));
    }
  }, [editing, homeId, token]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("houseName", formData.houseName);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("rating", formData.rating);
    data.append("description", formData.description);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    let url = `${import.meta.env.VITE_API_URL}/host/add-home`;
    if (editing) {
      url = `${import.meta.env.VITE_API_URL}/host/edit-home`;
      data.append("id", homeId); // Backend expects 'id' in body for edit
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, // fetch automatically sets Content-Type to multipart/form-data
      });

      if (response.ok) {
        console.log("Home saved successfully");
        navigate("/host/host-home-list");
      } else {
        console.error("Failed to save home");
      }
    } catch (err) {
      console.error("Error saving home", err);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {editing ? "Edit" : "Register"} Your Home on AirBnB
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="houseName"
          value={formData.houseName}
          onChange={handleChange}
          placeholder="Enter your House Name"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price Per Night"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="number"
          step="0.1"
          min="1"
          max="5"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="file"
          accept="image/*, .png, .jpg, .jpeg"
          name="photo"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={!editing} // Required only when adding new home
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your home"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          {editing ? "Update Home" : "Add Home"}
        </button>
      </form>
    </div>
  );
};

export default HostHomeFormPage;
