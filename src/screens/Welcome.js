import React, { useState, useEffect } from "react";
import "./style.css";
import "animate.css";
import { MdElectricBolt } from "react-icons/md";
import Header from "../components/header/Header";

function Welcome() {
  const [userinfo, setuserinfo] = useState([]);
  return (
    <>
      <div className="mainDashView">
        <Header />

        <div className="dashPanel mainDashPanel">
          <div className="mainContent animate__animated animate__zoomIn">
            <div className="md_graph">
              <span className="welcome_text">Welcome to Bisma Rana CMS</span>
              <span className="owner_text">Powered by Wings Tech</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
