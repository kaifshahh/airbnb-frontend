import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import "../pages/HomePage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useRef(null);

  useEffect(() => {
    // Only run animations once on mount
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".form-field", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []); // Empty dependency array - run only once

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.email, formData.password);
      console.log("Login successful");

      // Success animation
      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.3,
        onComplete: () => navigate("/"),
      });
    } catch (err) {
      setError(err.message);

      // Error shake animation
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power1.inOut" },
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-white to-pink-50 py-12 px-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div
        ref={formRef}
        className="relative z-10 backdrop-blur-lg bg-white/70 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-600 to-pink-600 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-semibold text-sm">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-red-500 hover:text-red-700 font-semibold"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-gray-500">
                New to Airbnb?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className="inline-block w-full py-3 px-4 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
