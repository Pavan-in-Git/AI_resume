import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { fadeInUp, hoverScale } from "./Animations";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                                ResuMate
                            </span>
                        </Link>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${
                                location.pathname === "/"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/upload"
                            className={`text-sm font-medium transition-colors ${
                                location.pathname === "/upload"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Upload Resume
                        </Link>
                        <Link
                            to="/features"
                            className={`text-sm font-medium transition-colors ${
                                location.pathname === "/features"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Features
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-colors ${
                                location.pathname === "/about"
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block"
                    >
                        <Link
                            to="/upload"
                            className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Get Started
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>
                {/* Mobile dropdown */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="space-y-2 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-4 shadow-lg">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                    location.pathname === "/" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/upload"
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                    location.pathname === "/upload" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                Upload Resume
                            </Link>
                            <Link
                                to="/features"
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                    location.pathname === "/features" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                Features
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                    location.pathname === "/about" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                About
                            </Link>
                            <div className="pt-2">
                                <Link
                                    to="/upload"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex w-full items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Get Started
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
