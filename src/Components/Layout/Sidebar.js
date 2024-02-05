import { Link } from "react-router-dom";

// import SidebarContent from "./SidebarContent";

import logoSm from "../Assets/images/logo-sm.png";
import paradiseLogo from "../Assets/images/paradise-logo.png";
import React, { useCallback, useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";

const Sidebar = () => {
  const USERS = 1;
  const DEPARTMENTS = 2;
  const ROLES = 3;
  const WEBSITES = 4;
  const TOUR_TYPES = 5;
  const CATEGORIES = 6;
  const LOCATIONS = 7;
  const OPERATORS = 8;
  const SHOPPING_CARTS = 12;
  const PAYMENT_TYPES = 13;
  const PROVIDERS = 14;
  const TOURS = 15;

  let userInfo = localStorage.getItem("token");
  userInfo = JSON.parse(userInfo)

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }
  const ref = useRef();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  useEffect(() => {
    // const pathName = props.location.pathname
    const pathName = window.location.pathname
    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <>
      <div className="vertical-menu" style={{ backgroundColor: "#3DC7F4" }}>
        <div
          className="navbar-brand-box"
          style={{ backgroundColor: "#3DC7F4" }}
        >
          <Link to="/tours/new" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="42" />
            </span>
            <span className="logo-lg">
              <img src={paradiseLogo} alt="" height="70" style={{ marginLeft: '50px', marginTop: '5px' }} />
            </span>
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle();
          }}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars text-white"></i>
        </button>
        <div className="sidebar-menu-scroll">
          <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title" style={{ borderBottom: "solid 1px white", margin: "0 10px 15px 10px", width: "auto" }}>{"Menu"} </li>
                <li style={{ borderBottom: "solid 1px white", margin: "0 10px 15px 10px", width: "auto", paddingBottom: "5px" }}>
                  <Link to="/tours/new" className="waves-effect">
                    <i className="uil-home-alt"></i>
                    {/* <span className="badge rounded-pill bg-primary float-end">
                      01
                    </span> */}
                    <span>{"Dashboard"}</span>
                  </Link>
                </li>
                <li className="mm-active">
                  <Link to="/#" className="has-arrow waves-effect" >
                    <span>{"MANAGE"}</span>
                  </Link>
                  <ul className="sub-menu">
                    {
                      userInfo.modules.filter(x => x.module_id === CATEGORIES).length > 0 ?
                        <li>
                          <Link to="/categories" className=" waves-effect">
                            <i className="uil uil-apps"></i>
                            <span>{"Categories"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === DEPARTMENTS).length > 0 ?
                        <li>
                          <Link to="/departments" className=" waves-effect">
                            <i className="uil uil-bag"></i>
                            <span>{"Departments"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === LOCATIONS).length > 0 ?
                        <li>
                          <Link to="/locations" className=" waves-effect">
                            <i className="uil uil-location-point"></i>
                            <span>{"Locations"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === OPERATORS).length > 0 ?
                        <li>
                          <Link to="/operators" className=" waves-effect">
                            <i className="uil uil-users-alt"></i>
                            <span>{"Operators"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === PAYMENT_TYPES).length > 0 ?
                        <li>
                          <Link to="/payment-types" className=" waves-effect">
                            <i className="uil-receipt"></i>
                            <span>{"Payment Types"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === PROVIDERS).length > 0 ?
                        <li>
                          <Link to="/providers" className=" waves-effect">
                            <i className="uil-bus-school"></i>
                            <span>{"Providers"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === ROLES).length > 0 ?
                        <li>
                          <Link to="/roles" className=" waves-effect">
                            <i className="bx bx-check-shield"></i>
                            <span>{"Roles"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === SHOPPING_CARTS).length > 0 ?
                        <li>
                          <Link to="/shopping-carts" className=" waves-effect">
                            <i className="uil-shopping-cart-alt"></i>
                            <span>{"Shopping Carts"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === TOURS).length > 0 ?
                        <li>
                          <Link to="/tours" className=" waves-effect">
                            <i className="uil-image"></i>
                            <span>{"Tours"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === TOUR_TYPES).length > 0 ?
                        <li>
                          <Link to="/tour-types" className=" waves-effect">
                            <i className="uil uil-list-ul"></i>
                            <span>{"Tour Types"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === USERS).length > 0 ?
                        <li>
                          <Link to="/users" className="waves-effect">
                            <i className="uil-user"></i>
                            <span>{"Users"}</span>
                          </Link>
                        </li> : (null)
                    }
                    {
                      userInfo.modules.filter(x => x.module_id === WEBSITES).length > 0 ?
                        <li>
                          <Link to="/websites" className=" waves-effect">
                            <i className="uil uil-globe"></i>
                            <span>{"Websites"}</span>
                          </Link>
                        </li> : (null)
                    }
                  </ul>
                </li>
              </ul>
            </div>
          </SimpleBar>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
