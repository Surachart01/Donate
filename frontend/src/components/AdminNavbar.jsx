import React from "react";
import Reunion from "../images/ComLogo.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase_config";

const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("auth");
      window.location.reload();
      window.location.href = "/login";
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

const AdminNavbar = ({ displayName, photoURL }) => {
  return (
    <div>
      <div className="navbar bg-[#1d4ed8]">
        <div className="navbar-start">
          <div className="dropdown mt-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/admin"}>
                <a>Confirmation</a>
                </Link>
              </li>
              <li>
                <Link to={"/history"}>
                  <a>History</a>
                </Link>
              </li>
              <li>
                <a>Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/admin">
            <a className="btn btn-ghost text-xl">
              <img src={Reunion} width={100} />
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          <div>{displayName}</div>
          <div className="dropdown dropdown-end mr-3 ml-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={photoURL} />
              </div>
            </div>
          </div>
          <button className="btn btn-error btn-circle" onClick={logout}>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
