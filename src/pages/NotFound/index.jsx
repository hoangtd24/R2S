import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import { TabTitle } from "src/utils/GeneralFunctions";
import imgError403 from "../../assets/img/error-403.png";
import "./styles.scss";

export default function NotFound() {
  TabTitle("NotFound");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <div className="not-found__wrapper">
      <div className="not-found__container">
        <img className="img" src={imgError403} alt="Not Found" />
        <h1 className="title">403 Error</h1>
        <p className="description">Bạn không có quyền truy cập trang này</p>
        <Button className="btn-back" bheight="40px" onClick={handleGoBack}>
          Quay lại
        </Button>
      </div>
    </div>
  );
}
