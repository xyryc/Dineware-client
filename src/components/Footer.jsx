import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-20 pb-4 mt-10">
      <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3 px-6 lg:px-20">
        {/* Logo and Motto */}
        <div className="space-y-4">
          <p className="text-4xl font-bebas-neue tracking-widest font-dancing-script">
            Dineware
          </p>
          <p className="text-base italic font-roboto text-gray-600 dark:text-gray-400">
            {`"Savor every bite, embrace every flavor."`}
          </p>
          <p className="text-sm font-roboto text-gray-600 dark:text-gray-400">
            Experience culinary excellence with our specially crafted dishes.
          </p>
          <div className="flex items-center space-x-3 text-sm font-roboto">
            <FaPhone />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3 text-sm font-roboto">
            <FaEnvelope />
            <span>info@dineware.com</span>
          </div>
          <div className="flex items-center space-x-3 text-sm font-roboto">
            <FaMapMarkerAlt />
            <span>123 Culinary Lane, Foodie City, FC 98765</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bebas-neue tracking-widest font-dancing-script">
            Quick Links
          </h3>
          <nav className="mt-4 grid grid-flow-row gap-2 text-sm font-roboto">
            <a href="#" className="link link-hover">
              Menu
            </a>
            <a href="#" className="link link-hover">
              Reservations
            </a>
            <a href="#" className="link link-hover">
              Events & Catering
            </a>
            <a href="#" className="link link-hover">
              Contact Us
            </a>
          </nav>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bebas-neue tracking-widest font-dancing-script">Follow Us</h3>
          <p className="text-sm font-roboto text-gray-600 dark:text-gray-400">
            Stay updated with our latest news and exclusive offers.
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="#"
              className="p-3 rounded-full bg-base-300 hover:bg-primary hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-base-300 hover:bg-primary hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-base-300 hover:bg-primary hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-base-300 pt-4 text-center text-sm font-roboto text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Dineware. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
