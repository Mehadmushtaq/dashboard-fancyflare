import { React, useEffect, useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {
  ContactIcon,
  CustomerIcon,
  DashbboardIcon,
  EmployeeIcon,
  FaqIcon,
  InventoryIcon,
  OrdersIcon,
  PaperIcon,
} from "../../SVGS";
import { PRIMARY } from "../../constants/Colors";

function Sidebar() {
  let height = "24"; // these are the sizes of icons
  let width = "22";
  let size = "22";

  const navigate = useNavigate();
  // useEffect(() => {
  //   let user = JSON.parse(localStorage.getItem("adminUser"));
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);

  const ActiveStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "white" : "",
      color: isActive ? PRIMARY : "",
      textDecoration: "none",
      border: "none",
      borderRadius: "7px",
    };
  };

  return (
    <nav className="">
      <div className="sidebar_main">
        <div className="logo">
          <img style={{ height: "67px", width: "73%" }} src={Logo} alt="logo" />
        </div>

        <div className="catageory">
          <div className="subCatBox">
            <NavLink
              to="/dashboard/main"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <DashbboardIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/order"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <OrdersIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Orders
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/speciality"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <ContactIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Speciality Cards
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/service-cards"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <ContactIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Service Cards
              </span>
            </NavLink>

            <NavLink to="/dashboard/faq" className="subCat" style={ActiveStyle}>
              <span className="subCatsvgs">
                <FaqIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                FAQ's
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/reviews"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <PaperIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Reviews
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/contacts"
              className="subCat"
              style={ActiveStyle}
            >
              <span className="subCatsvgs">
                <EmployeeIcon
                  fill="currentColor"
                  stroke="currentColor"
                  height={height}
                  width={width}
                  size={size}
                />
              </span>
              <span
                className="subCatText"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "27px",
                }}
              >
                Clients
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
