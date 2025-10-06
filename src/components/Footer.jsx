import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-indigo-900 via-gray-900 to-gray-800 text-gray-200 pt-12 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">ERP Clouds</h2>
            <p className="text-gray-400 text-sm">
              Smart ERP solutions to manage your business efficiently. Collaborate, organize, and grow seamlessly.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Home", "About Us", "Features", "Pricing", "Contact"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: <a href="mailto:support@erpclouds.com" className="hover:text-white transition-colors">support@erpclouds.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 234 567 890</a></li>
              <li>Address: 123 Cloud Street, Tech City</li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} ERP Clouds. All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
}
