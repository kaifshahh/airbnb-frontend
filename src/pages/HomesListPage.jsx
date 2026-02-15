import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeCard from "../components/HomeCard";

gsap.registerPlugin(ScrollTrigger);

const HomesListPage = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch homes");
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
  }, []);

  useEffect(() => {
    if (loading || homes.length === 0) return;

    // Animate title
    gsap.from(".homes-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate home cards with stagger
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll(".home-card-item");
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [loading, homes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="homes-title text-4xl font-bold text-center text-gray-800 mb-8">
        Explore All Homes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {homes.length > 0 ? (
          homes.map((home) => (
            <div key={home._id} className="home-card-item">
              <HomeCard home={home} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No homes available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomesListPage;
