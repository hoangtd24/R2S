import React, { useEffect, useState} from 'react'
import LoginAdminContainer from "../../containers/LoginAdminContainer";
import "./styles.scss";
import { useSelector } from "react-redux";
import Modal from "./../../components/Modal/index";
import "./styles.scss";

const LoginAdminLayout = () => {
  const { status } = useSelector((state) => state.register);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);

  return (
    <div className="login-admin-layout">

      <div className="login-admin-container-wrapper">
        <LoginAdminContainer />
        <div className="login-container__modal">
          <Modal
            modalTitle="Thông báo"
            open={open}
            setOpen={setOpen}

          />
        </div>
      </div>

    </div>
  );
}

export default LoginAdminLayout