import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Shield, Award } from "lucide-react";
import HomeCard from "../components/HomeCard";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const homesRef = useRef(null);

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
    if (loading) return;

    // Hero section animations - only run once
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-buttons",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );

    // Features scroll animations
    const featureCards = document.querySelectorAll(".feature-card");
    if (featureCards.length > 0) {
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Stats section
    const statItems = document.querySelectorAll(".stat-item");
    if (statItems.length > 0) {
      gsap.from(statItems, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
      });
    }

    // Small delay to ensure home cards are rendered
    const timer = setTimeout(() => {
      const homeCards = document.querySelectorAll(".home-card-wrapper");
      if (homeCards.length > 0) {
        gsap.from(homeCards, {
          scrollTrigger: {
            trigger: homesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.9,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]); // Only depend on loading, not homes

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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Glassmorphism container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="backdrop-blur-md bg-white/30 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h1 className="hero-title text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="hero-subtitle text-lg md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover unique homes, apartments, and experiences around the
              world. Your next adventure starts here.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/homes")}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Homes
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 backdrop-blur-md bg-white/40 border-2 border-white text-gray-800 font-bold rounded-full hover:bg-white/60 hover:scale-105 transition-all duration-300"
              >
                Become a Host
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card backdrop-blur-lg bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Unique Stays
              </h3>
              <p className="text-gray-600 text-center">
                From cozy apartments to luxurious villas, find accommodations
                that match your style and budget perfectly.
              </p>
            </div>

            <div className="feature-card backdrop-blur-lg bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Trusted & Secure
              </h3>
              <p className="text-gray-600 text-center">
                Book with confidence. All our listings are verified and our
                secure payment system protects every transaction.
              </p>
            </div>

            <div className="feature-card backdrop-blur-lg bg-white/60 p-8 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Best Experience
              </h3>
              <p className="text-gray-600 text-center">
                Exceptional hosts, amazing locations, and unforgettable
                experiences. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="stat-item backdrop-blur-md bg-white/10 p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-xl opacity-90">Properties Listed</p>
            </div>
            <div className="stat-item backdrop-blur-md bg-white/10 p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <p className="text-xl opacity-90">Happy Guests</p>
            </div>
            <div className="stat-item backdrop-blur-md bg-white/10 p-8 rounded-2xl">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-xl opacity-90">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Homes Section */}
      <section
        ref={homesRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Featured Homes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homes.length > 0 ? (
              homes.slice(0, 6).map((home) => (
                <div key={home._id} className="home-card-wrapper">
                  <HomeCard home={home} />
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No homes available yet.
              </p>
            )}
          </div>
          {homes.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/homes")}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                View All Homes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
