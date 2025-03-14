import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-[#0d9488] rounded-full">
        <div className="navbar-start">
          <a
            className="btn btn-ghost text-xl rounded-full text-[#facc15] "
            style={{ fontFamily: "Emblema One" }}
          >
            COMEDU : Reunion
          </a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-5 w-80 p-2 shadow bg-[#0d9488] text-white "
            >
              <li>
                <Link to="/">
                  <button className="text-lg">ส่งข้อความขึ้นจอ</button>
                </Link>
              </li>
              <li>
                <Link to="/admin">
                  <button className="text-lg">ติดต่อเรา</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
