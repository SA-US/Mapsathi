import React from "react";
import Link from "next/link"; // If you're using Next.js
import "swiper/css"; // Only if your Navbar needs Swiper styling (optional)
// Define the nav items array
const navItems = [
  { label: "Home", href: "/" }, // In Next.js, homepage is "/"
  { label: "Packages", href: "/Pages/packages" },
  { label: "Maps", href: "/Pages/maps" },
  { label: "Key Attraction", href: "/Pages/keyattractions" },
  { label: "About Us", href: "/Pages/aboutus" },
];

const Navbar = () => {
  return (
    <nav className="bg-gray-200 text-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer hover:text-gray-900 transition ">
            <Link href="/">MapSathi</Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-gray-900 transition duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded hover:bg-gray-300 transition cursor-pointer z-10 ">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
