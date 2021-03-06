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
          <Link to="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={paradiseLogo} alt="" height="70" style={{marginLeft: '50px', marginTop: '5px'}} />
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
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll">
          <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">{"Menu"} </li>
                <li>
                  <Link to="/dashboard" className="waves-effect">
                    <i className="uil-home-alt"></i>
                    {/* <span className="badge rounded-pill bg-primary float-end">
                      01
                    </span> */}
                    <span>{"Dashboard"}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/users" className=" waves-effect">
                    <i className="uil-user"></i>
                    <span>{"Users"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/departments" className=" waves-effect">
                    <i className="uil uil-bag"></i>
                    
                    <span>{"Departments"}</span>
                  </Link>
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
