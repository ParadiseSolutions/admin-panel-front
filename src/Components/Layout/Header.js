import React, { useState, useEffect } from "react";
import MyProfileModal from "../Common/Modals/ProfileModal";
import { getStorageSync } from "../../Utils/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logoSm from "../Assets/images/logo-sm.png";
import logoDark from "../Assets/images/logo-dark.png";
import logoLight from "../Assets/images/logo-light.png";

const Header = () => {
  const [profileModal, setProfileModal] = useState(false);
  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  const token = JSON.parse(getStorageSync("token"));
  const [menu, setMenu] = useState(false);
  const [username, setusername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    setusername(token.user.first_name);
    setProfilePicture(token.user.picture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //logOut
  const history = useHistory();
  const onLogOut = () => {
    localStorage.removeItem("token");
    history.push("/home");
  };
  return (
    <>
      <header id="page-topbar">
        <div
          className="navbar-header"
          // // style={{ backgroundColor: "#3DC7F4", width: "100%" }}
        >
          <div className="d-flex">
            <div className="navbar-brand-box" style={{backgroundColor:"#3DC7F4"}}>
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="20" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="20" />
                </span>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>

          <div className="d-flex">
            <Dropdown
              isOpen={menu}
              toggle={() => setMenu(!menu)}
              className="d-inline-block"
            >
              <DropdownToggle
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                tag="button"
              >
                <img
                  className="rounded-circle header-profile-user"
                  src={profilePicture ? profilePicture : "https://jstourandtravel.com/js-websites/global-resources/adminpanel/undefined.png"}
                  alt="Header Avatar"
                />
                <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                  {username}
                </span>{" "}
                <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    setProfileModal(true)
                  }}
                >
                  {" "}
                  <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
                  {"View Profile"}
                </DropdownItem>
                {/*
                <DropdownItem tag="a" href="/">
                  <i className="uil uil-wallet font-size-18 align-middle me-1 text-muted"></i>
                  {"My Wallet"}
                </DropdownItem>
                <DropdownItem tag="a" href="#">
                  <i className="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
                  {"Settings"}
                  <span className="badge bg-soft-success rounded-pill mt-1 ms-2">
                    03
                  </span>
                </DropdownItem>
                <DropdownItem tag="a" href="auth-lock-screen">
                  <i className="uil uil-lock-alt font-size-18 align-middle me-1 text-muted"></i>
                  {"Lock screen"}
                </DropdownItem> */}
                <div className="dropdown-divider" />
                <div
                  onClick={() => onLogOut()}
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                >
                  <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
                  <span>Logout</span>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <MyProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          token={token}
        />
      </header>
    </>
  );
};

export default Header;
