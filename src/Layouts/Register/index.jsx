import React, { useEffect } from "react";
import RegisterContainer from "../../containers/RegisterContainer/index";
import "./styles.scss";
import "./responsive.scss";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import HeaderContainer from "src/components/HeaderContainer";

export default function RegisterLayout() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className="register-layout">
      <HeaderContainer />
      <div className="register-container-wrapper">
        <RegisterContainer Outlet={Outlet} />
      </div>
      <Footer />
    </div>
  );
}
