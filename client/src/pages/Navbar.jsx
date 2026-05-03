import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">Team Task Manager</h1>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
          Dashboard
        </Link>

        <Link to="/projects" className="text-gray-700 hover:text-indigo-600 font-medium">
          Projects
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
