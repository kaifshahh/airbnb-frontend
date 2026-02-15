const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Airbnb
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted platform for unique stays and unforgettable
              experiences around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/homes"
                  className="hover:text-red-400 transition-colors"
                >
                  Browse Homes
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="hover:text-red-400 transition-colors"
                >
                  Become a Host
                </a>
              </li>
              <li>
                <a
                  href="/favourites"
                  className="hover:text-red-400 transition-colors"
                >
                  My Favourites
                </a>
              </li>
              <li>
                <a
                  href="/bookings"
                  className="hover:text-red-400 transition-colors"
                >
                  My Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Safety Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Cancellation Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@airbnb.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Travel St, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Airbnb. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
