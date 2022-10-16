import React from "react";
import Button from "./../../components/Button/index";
import "./styles.scss";

export const ModalContent = ({ onClick, nameButton, className }) => {
  return (
    <>
      <p style={{ textAlign: "justify" }}>
        Bạn đã đăng ký tài khoản thành công, vui lòng chờ xác nhận !
      </p>
      <div className={className}>
        <Button name={nameButton} onClick={onClick} />
      </div>
    </>
  );
};
