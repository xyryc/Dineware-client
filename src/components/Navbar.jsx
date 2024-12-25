import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink className={({isActive})=> isActive ? "underline hover:bg-transparent" : "" } to="/">Home</NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=> isActive ? "underline hover:bg-transparent" : "" } to="/foods">All Foods</NavLink>
      </li>

      <li>
        <NavLink className={({isActive})=> isActive ? "underline hover:bg-transparent" : "" } to="/gallery">Gallery</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 font-dancing-script px-2 py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Dineware
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          <ThemeToggle />
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full" title={user?.displayName}>
                  <img
                    alt={user?.displayName}
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/my-foods">My Foods</Link>
                </li>
                <li>
                  <Link to="/add-food">Add food</Link>
                </li>
                <li>
                  <Link to="/my-orders">My Orders</Link>
                </li>
              </ul>
            </div>

            <a className="btn btn-ghost" onClick={logOut}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="btn btn-ghost hover:text-red-600 bg-transparent outline-none border-none shadow-none"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost hover:text-red-600 bg-transparent outline-none border-none shadow-none"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
