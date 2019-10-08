import React, { createRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import OBLogo from "../../assets/OB_logo_horizontal.png";

const Header = () => {
  let menu = createRef();
  let showMobile = "";

  const toggleMobileMenu = event => {
    if (menu.style.display !== "block") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  };

  return (
    <div className="header-container">
      <div className="nav-bar-top">
        <div className="nav-bar-top-logo">
          <img src={OBLogo} alt="One Bite - Barstool" />
        </div>
        <div className="nav-bar-top-list">
          <ul>
            <div
              className={`nav-bar-top-links ${showMobile}`}
              ref={ele => (menu = ele)}
            >
              <li className="nav-bar-top-button" onClick={toggleMobileMenu}>
                <button className="mobile-menu-button mobile-close">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </li>
              <NavLink
                to="/reviews/dave"
                className="nav-bar-top-link"
                activeClassName="selected"
              >
                <li>Dave's Reviews</li>
              </NavLink>
              <NavLink
                to="/restaurants"
                className="nav-bar-top-link"
                activeClassName="selected"
              >
                <li>Restaurants</li>
              </NavLink>
              <NavLink
                to="/celebrities"
                className="nav-bar-top-link"
                activeClassName="selected"
              >
                <li>Celebrities</li>
              </NavLink>
              <NavLink
                to="/reviews/fans"
                className="nav-bar-top-link"
                activeClassName="selected"
              >
                <li>Fan Reviews</li>
              </NavLink>
              <NavLink
                to="/cities"
                className="nav-bar-top-link"
                activeClassName="selected"
              >
                <li>Pizza Cities</li>
              </NavLink>
            </div>
            <li className="nav-bar-top-button">
              <button className="download-button">Download</button>
            </li>
            <li className="nav-bar-top-button" onClick={toggleMobileMenu}>
              <button className="mobile-menu-button">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
