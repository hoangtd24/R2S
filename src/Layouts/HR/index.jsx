import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "../../components/HeaderWithHR";
import Footer from "../../components/Footer";

const HRLayOut = () => {
  return (
    <div className="main__layout">
      <HeaderWithHR idMark={5} idNoti={5} hr />
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HRLayOut;
