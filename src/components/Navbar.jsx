import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <a>Home</a>
      </li>

      <li>
        <a>All Foods</a>
      </li>

      <li>
        <a>Gallery</a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Dineware
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full" title={user?.displayName}>
                  <img alt={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>My Foods</a>
                </li>
                <li>
                  <a>Add food</a>
                </li>
                <li>
                  <a>My Orders</a>
                </li>
              </ul>
            </div>

            <a className="btn" onClick={logOut}>
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
