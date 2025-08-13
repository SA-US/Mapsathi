import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 border-t border-gray-300 py-6 h-20  w-full  flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side - Branding */}
        <p className="text-sm">&copy; {new Date().getFullYear()} MapSathi. All rights reserved.</p>

        {/* Center - Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <li className="hover:text-gray-800 transition-colors cursor-pointer">
            Privacy Policy
          </li>
          <li className="hover:text-gray-800 transition-colors cursor-pointer">
            Terms of Use
          </li>
          <li className="hover:text-gray-800 transition-colors cursor-pointer">
            Cookie Policy
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-gray-800 transition-colors"
          >
            🐦
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-gray-800 transition-colors"
          >
            📘
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-gray-800 transition-colors"
          >
            📸
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
