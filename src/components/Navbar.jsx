import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Heart,
  Calendar,
  Briefcase,
  PlusCircle,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Navbar entrance animation - only run once
    const ctx = gsap.context(() => {
      gsap.from("header", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []); // Run only once on mount

  // Mobile menu slide animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        // Slide in animation
        gsap.fromTo(
          mobileMenuRef.current,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
        );

        // Stagger menu items
        gsap.from(mobileMenuRef.current.querySelectorAll("li"), {
          opacity: 0,
          x: -20,
          stagger: 0.05,
          duration: 0.3,
          delay: 0.1,
        });
      } else {
        // Slide out animation
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `${
      isActive(path) ? "bg-white/20 font-semibold" : "hover:bg-white/10"
    } py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2`;

  const mobileNavLinkClass = (path) =>
    `${
      isActive(path)
        ? "bg-red-100 text-red-600 font-semibold"
        : "hover:bg-gray-50"
    } py-3 px-4 rounded-xl flex items-center gap-2 transition-all duration-200`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:justify-between md:items-center">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-pink-600">
                airbnb
              </span>
            </Link>

            {/* Main Navigation Links */}
            {isLoggedIn && (
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    to="/homes"
                    className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-red-50"
                  >
                    <Home className="w-4 h-4" />
                    Homes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favourites"
                    className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-red-50"
                  >
                    <Heart className="w-4 h-4" />
                    Favourites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookings"
                    className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-red-50"
                  >
                    <Calendar className="w-4 h-4" />
                    Bookings
                  </Link>
                </li>
                {user?.userType === "host" && (
                  <>
                    <li>
                      <Link
                        to="/host/host-home-list"
                        className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-red-50"
                      >
                        <Briefcase className="w-4 h-4" />
                        My Listings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/host/host-add-home"
                        className="bg-linear-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:scale-105"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add Home
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-linear-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-full transition-all duration-300 font-medium hover:shadow-lg hover:scale-105"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName || "User"}
                  </span>
                </div>
                <button
                  className="text-gray-700 hover:text-red-500 py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-red-50 border border-gray-200"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-9 h-9 bg-linear-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-pink-600">
                airbnb
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="mt-4 py-4 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <ul className="flex flex-col space-y-1 px-3">
                {isLoggedIn && (
                  <>
                    {/* User Info */}
                    <li className="mb-3 px-4 py-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-linear-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link
                        to="/homes"
                        className={mobileNavLinkClass("/homes")}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Home className="w-5 h-5" />
                        Homes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/favourites"
                        className={mobileNavLinkClass("/favourites")}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="w-5 h-5" />
                        Favourites
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bookings"
                        className={mobileNavLinkClass("/bookings")}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Calendar className="w-5 h-5" />
                        Bookings
                      </Link>
                    </li>
                    {user?.userType === "host" && (
                      <>
                        <li className="pt-2 mt-2 border-t border-gray-200">
                          <Link
                            to="/host/host-home-list"
                            className={mobileNavLinkClass(
                              "/host/host-home-list",
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Briefcase className="w-5 h-5" />
                            My Listings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/host/host-add-home"
                            className="bg-linear-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <PlusCircle className="w-5 h-5" />
                            Add New Home
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="pt-2 mt-2 border-t border-gray-200">
                      <button
                        className="w-full text-left text-red-600 hover:bg-red-50 py-3 px-4 rounded-xl flex items-center gap-2 transition-all duration-200"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/signup"
                        className="hover:bg-gray-50 py-3 px-4 rounded-xl block text-gray-700 font-medium transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="bg-linear-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl block text-center font-medium hover:shadow-lg transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
