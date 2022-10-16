import "./styles.scss";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderWithPartner from "src/components/HeaderWithPartner";

const PartnerLayout = () => {

  return (
    <div className="main__layout">
      <HeaderWithPartner id={4} partner />
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerLayout;
