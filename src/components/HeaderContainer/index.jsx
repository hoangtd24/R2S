import { Fragment } from "react";
import { useSelector } from "react-redux";
import HeaderWithCandidate from "src/components/HeaderWithCandidate";
import HeaderWithHR from "src/components/HeaderWithHR";
import HeaderWithPartner from "src/components/HeaderWithPartner";
import Login from "../Login";
import Logo from "../Logo";
import "./styles.scss";

export default function HeaderContainer() {
  const { role } = useSelector((state) => state.profile);

  const renderLayout = () => {
    switch (role) {
      case "Role_HR": {
        return <HeaderWithHR />;
      }
      case "Role_Partner": {
        return <HeaderWithPartner />;
      }
      case "Role_Candidate": {
        return <HeaderWithCandidate />;
      }
      default: {
        return <Fragment />;
      }
    }
  };
  
  return (
    <div className="container-header__hr header__hr config">
      <Logo />
      {renderLayout()}
      <div className="header__hr-icon">
        <Login />
      </div>
    </div>
  );
}
