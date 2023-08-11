import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  //when the screen is less than 768px, the navbar will be hidden
  useEffect(() => {
    handleShow();
  }, [user]);
  const handleShow = () => {
    if (!user) {
      document.getElementsByClassName("App")[0].style.marginLeft = "0px";
    } else {
      if (window.innerWidth <= 768 && window.innerWidth >= 0) {
        setShow(false);
        document.getElementsByClassName("App")[0].style.marginLeft = "50px";
        document.getElementsByClassName("navbar-toggle")[0].style.display =
          "block";
      } else if (window.innerWidth > 768) {
        setShow(true);
        document.getElementsByClassName("App")[0].style.marginLeft = "250px";
        document.getElementsByClassName("navbar-toggle")[0].style.display =
          "none";
      }
    }
  };
  const handleToggle = () => {
    if (window.innerWidth <= 768 && window.innerWidth >= 0) {
      if (show) {
        document.getElementsByClassName("App")[0].style.marginLeft = "50px";
        setShow(false);
      } else if (!show) {
        document.getElementsByClassName("App")[0].style.marginLeft = "0px";
        setShow(true);
      }
    } else if (window.innerWidth > 768) {
      if (show) {
        document.getElementsByClassName("App")[0].style.marginLeft = "50px";
        setShow(false);
      } else if (!show) {
        document.getElementsByClassName("App")[0].style.marginLeft = "250px";
        setShow(true);
      }
    }
  };
  window.addEventListener("resize", handleShow);

  //clicling a link will hide the navbar
  window.addEventListener("click", (e) => {
    if (e.target.className === "navbar-link-name" && window.innerWidth <= 768) {
      setShow(false);
      document.getElementsByClassName("App")[0].style.marginLeft = "50px";
    }
  });

  return (
    <div className={show ? "navbar-container" : "navbar-container hide"}>
      <div className="navbar-toggle">
        {show ? (
          <AiOutlineMenuFold onClick={() => handleToggle()} />
        ) : (
          <AiOutlineMenuUnfold onClick={() => handleToggle()} />
        )}
      </div>
      <div className="navbar-header">
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
          alt="spotify-logo"
        />

        <h4>WriteStack</h4>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link">
          <h4 className="navbar-link-name">Homepage</h4>
        </NavLink>
        <NavLink to="/blogs" className="navbar-link">
          <h4 className="navbar-link-name">Blogs</h4>
        </NavLink>
        <NavLink to="/post" className="navbar-link">
          <h4 className="navbar-link-name">Post</h4>
        </NavLink>
      </div>
      <div className="navbar-footer">
        <p>@{user.username}</p>
        <button className="navbar-link-name" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
