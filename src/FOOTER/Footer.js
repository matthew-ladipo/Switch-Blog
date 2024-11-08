import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter, FaGithub, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 md:px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Company Info */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-white">&copy; 2023 SWITCH Blog</p>
          <p className="text-sm">All Rights Reserved</p>
        </div>
        
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-center md:text-left">
          <li>
            <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition duration-300">Contact Us</a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 md:space-x-6 justify-center">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Facebook"
          >
            <CiFacebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="X (formerly Twitter)"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
