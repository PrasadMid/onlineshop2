import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-700 text-slate-300 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <NavLink to="/" className="text-2xl font-bold hover:text-slate-100 transition-all duration-300 ease-in-out">
          Prasad Joshi
        </NavLink>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-xl"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`absolute md:static bg-slate-700 w-full md:w-auto transition-all duration-300 ease-in 
            ${open ? "top-14 left-0 p-4 block" : "hidden md:flex"} md:gap-6`}
        >
          {["Product", "About", "Contact"].map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block rounded py-2 md:py-0 px-4 border-b border-gray-100
                  transition-all duration-300 ease-in-out transform hover:scale-110
                  hover:text-slate-400 lg:hover:bg-transparent lg:border-0 lg:p-0
                  ${isActive ? "text-stone-100 font-semibold" : "text-gray-100"}`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
