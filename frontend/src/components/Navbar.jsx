import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = ({ isDark, setIsDark }) => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b ${
      isDark ? "bg-white/10 border-white/20" : "bg-white/80 border-indigo-100"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-indigo-900"}`}>
          Prep<span className="text-yellow-400">AI</span>
        </div>

        {/* Nav Links */}
        <div className={`flex items-center gap-8 text-sm font-semibold ${isDark ? "text-white/90" : "text-indigo-800"}`}>
          <ScrollLink to="hero" smooth={true} duration={500}
            className="cursor-pointer hover:text-yellow-400 transition">Home</ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500}
            className="cursor-pointer hover:text-yellow-400 transition">About</ScrollLink>
          <ScrollLink to="explore" smooth={true} duration={500}
            className="cursor-pointer hover:text-yellow-400 transition">Explore</ScrollLink>
          <Link to="/login"
            className="bg-yellow-300 text-indigo-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg">
            Login
          </Link>

          {/* Dark/Light Toggle */}
          {setIsDark && (
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                isDark ? "bg-indigo-600" : "bg-yellow-300"
              }`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-all duration-300 flex items-center justify-center text-xs ${
                isDark ? "left-0.5 bg-white" : "left-6 bg-white"
              }`}>
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;